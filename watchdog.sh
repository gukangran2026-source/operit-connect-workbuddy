#!/bin/bash
# WorkBuddy 接入服务守护进程
#
# 每 60 秒检查一次接入服务，无响应则拉起；随 wb_service 一起启停。
# 启动：cd /root/workbuddy-bridge && nohup bash watchdog.sh >/dev/null 2>&1 &
# 停止：kill "$(cat /root/workbuddy-bridge/watchdog.pid)"（先核对 cmdline 归属再发信号，
#       不要用 pkill -f 按进程名批量匹配，那会命中其它目录下的同名脚本）
#
# 可用环境变量：
#   WORKBUDDY_BRIDGE_DIR  服务目录，默认 /root/workbuddy-bridge
#   WORKBUDDY_BRIDGE_URL  服务地址，默认 http://127.0.0.1:8787

SERVICE_DIR="${WORKBUDDY_BRIDGE_DIR:-/root/workbuddy-bridge}"
BASE_URL="${WORKBUDDY_BRIDGE_URL:-http://127.0.0.1:8787}"
INTERVAL=60
PID_FILE="$SERVICE_DIR/watchdog.pid"
LOG_FILE="$SERVICE_DIR/watchdog.log"
BRIDGE_PATH="$SERVICE_DIR/server.mjs"
BRIDGE_PID_FILE="$SERVICE_DIR/bridge.pid"

log_line() {
    echo "[$(date '+%F %T')] $1" >> "$LOG_FILE"
}

is_up() {
    curl -sS -m 5 "$BASE_URL/healthz" >/dev/null 2>&1
}

# 进程归属校验：PID 存在 + UID 相同 + cmdline 含本目录下的绝对路径。
# 三条同时成立才算本服务的进程，才允许发信号。
pid_is_ours() {
    [ -n "$1" ] || return 1
    [ -r "/proc/$1/cmdline" ] || return 1
    [ "$(stat -c %u "/proc/$1" 2>/dev/null)" = "$(id -u)" ] || return 1
    case "$(tr '\0' ' ' < "/proc/$1/cmdline" 2>/dev/null)" in
        *"$2"*) return 0 ;;
    esac
    return 1
}

# 只按 bridge.pid 定向终止，绝不按进程名批量 kill——
# 那会命中其它目录下同名的 server.mjs，误停别人的服务。
stop_bridge_scoped() {
    local pid
    pid=$(head -n1 "$BRIDGE_PID_FILE" 2>/dev/null | tr -dc '0-9')
    if [ -z "$pid" ]; then
        rm -f "$BRIDGE_PID_FILE"
        return 0
    fi
    if ! pid_is_ours "$pid" "$BRIDGE_PATH"; then
        log_line "bridge.pid 指向 $pid，但不是本目录的进程，跳过终止"
        rm -f "$BRIDGE_PID_FILE"
        return 0
    fi
    kill -TERM "$pid" 2>/dev/null
    local n=0
    while [ "$n" -lt 25 ]; do
        kill -0 "$pid" 2>/dev/null || break
        sleep 0.2
        n=$((n + 1))
    done
    if kill -0 "$pid" 2>/dev/null && pid_is_ours "$pid" "$BRIDGE_PATH"; then
        kill -KILL "$pid" 2>/dev/null
    fi
    rm -f "$BRIDGE_PID_FILE"
    log_line "已终止旧接入服务：PID $pid"
}

# 防重入：用目录做原子锁，避免两个实例同时通过检查后并存
LOCK_DIR="$SERVICE_DIR/watchdog.lock"
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
    HOLDER=$(cat "$LOCK_DIR/pid" 2>/dev/null)
    if [ -n "$HOLDER" ] && kill -0 "$HOLDER" 2>/dev/null; then
        log_line "守护进程已在运行：PID $HOLDER"
        exit 0
    fi
    rm -rf "$LOCK_DIR"
    if ! mkdir "$LOCK_DIR" 2>/dev/null; then
        exit 0
    fi
fi
echo $$ > "$LOCK_DIR/pid"
echo $$ > "$PID_FILE"
trap 'rm -rf "$LOCK_DIR"' EXIT

log_line "守护进程启动：PID $$，检查间隔 ${INTERVAL}s，服务目录 $SERVICE_DIR"

while true; do
    if ! is_up; then
        # 二次确认，排除瞬时抖动导致的误判
        sleep 5
        if ! is_up; then
            log_line "接入服务无响应，执行拉起"
            stop_bridge_scoped
            if cd "$SERVICE_DIR" 2>/dev/null; then
                nohup node "$BRIDGE_PATH" >> bridge.log 2>&1 &
                sleep 3
                if is_up; then
                    log_line "接入服务已恢复"
                else
                    log_line "拉起失败，等待下一轮重试"
                fi
            else
                log_line "服务目录不可用：$SERVICE_DIR"
            fi
        fi
    fi
    sleep "$INTERVAL"
done
