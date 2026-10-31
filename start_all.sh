#!/bin/bash
# WorkBuddy 全套服务幂等启动。
#
# 已在跑的不动，缺哪个补哪个。可以反复执行，不会产生重复实例。
# 供 profile.d / bashrc 钩子调用，也可手动执行。
#
# 判定规则与包内 wb_service 一致：只认自己的 pidfile，且 PID 存活、
# cmdline 含本服务目录下的绝对路径，才算在运行。不使用通用进程名匹配，
# 避免误判或误停其它目录下的同名进程。
#
# 用法：
#   bash start_all.sh          # 启动全部
#   bash start_all.sh --status # 只查看状态

BRIDGE_DIR="/root/workbuddy-bridge"
CHECKIN_DIR="/root/workbuddy-checkin"
BRIDGE_URL="http://127.0.0.1:8787"

# pid_of <pidfile> <目标绝对路径>：归属校验通过则输出 PID，否则输出空。
pid_of() {
    local pid
    pid=$(cat "$1" 2>/dev/null)
    if [ -n "$pid" ] && [ -r "/proc/$pid/cmdline" ] && tr '\0' ' ' < "/proc/$pid/cmdline" 2>/dev/null | grep -qF "$2"; then
        printf '%s' "$pid"
    fi
}

status() {
    echo "=== WorkBuddy 服务状态 ==="
    local bp wp cp
    bp=$(pid_of "$BRIDGE_DIR/bridge.pid" "$BRIDGE_DIR/server.mjs")
    if [ -n "$bp" ]; then
        echo "接入服务  : 运行中 (PID $bp)"
        if curl -sS -m 5 "$BRIDGE_URL/healthz" >/dev/null 2>&1; then
            echo "  健康检查: OK"
        else
            echo "  健康检查: 无响应"
        fi
    else
        echo "接入服务  : 未运行"
    fi
    wp=$(pid_of "$BRIDGE_DIR/watchdog.pid" "$BRIDGE_DIR/watchdog.sh")
    if [ -n "$wp" ]; then
        echo "服务守护  : 运行中 (PID $wp)"
    else
        echo "服务守护  : 未运行"
    fi
    cp=$(pid_of "$CHECKIN_DIR/checkin_daily.pid" "$CHECKIN_DIR/checkin_daily.sh")
    if [ -n "$cp" ]; then
        echo "签到守护  : 运行中 (PID $cp)"
    else
        echo "签到守护  : 未运行"
    fi
}

if [ "${1:-}" = "--status" ]; then
    status
    exit 0
fi

# 1) 接入服务
if [ -z "$(pid_of "$BRIDGE_DIR/bridge.pid" "$BRIDGE_DIR/server.mjs")" ]; then
    if [ -f "$BRIDGE_DIR/server.mjs" ]; then
        rm -f "$BRIDGE_DIR/bridge.pid"
        cd "$BRIDGE_DIR" 2>/dev/null && {
            (nohup node "$BRIDGE_DIR/server.mjs" >> "$BRIDGE_DIR/bridge.log" 2>&1 &)
            sleep 2
        }
    fi
fi

# 2) 服务守护（它同时巡检签到守护，所以必须先于签到守护拉起）
if [ -z "$(pid_of "$BRIDGE_DIR/watchdog.pid" "$BRIDGE_DIR/watchdog.sh")" ]; then
    if [ -f "$BRIDGE_DIR/watchdog.sh" ]; then
        rm -rf "$BRIDGE_DIR/watchdog.lock"
        rm -f "$BRIDGE_DIR/watchdog.pid"
        cd "$BRIDGE_DIR" 2>/dev/null && {
            (nohup bash "$BRIDGE_DIR/watchdog.sh" >> "$BRIDGE_DIR/watchdog.out" 2>&1 &)
            sleep 2
        }
    fi
fi

# 3) 签到守护。watchdog 也会补，这里补一次是为了不必等它下一个巡检周期。
if [ -z "$(pid_of "$CHECKIN_DIR/checkin_daily.pid" "$CHECKIN_DIR/checkin_daily.sh")" ]; then
    if [ -f "$CHECKIN_DIR/checkin_daily.sh" ]; then
        rm -rf "$CHECKIN_DIR/checkin.lock"
        cd "$CHECKIN_DIR" 2>/dev/null && {
            (nohup bash "$CHECKIN_DIR/checkin_daily.sh" >> "$CHECKIN_DIR/daemon.out" 2>&1 &)
            sleep 1
        }
    fi
fi

if [ "${1:-}" = "--verbose" ]; then
    status
fi

exit 0