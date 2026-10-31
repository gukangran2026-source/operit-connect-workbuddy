/* METADATA
{
    "name": "connect_workbuddy",
    "version": "4.8.2",
    "author": ["gukangran2026-source"],
    "display_name": {
        "zh": "operit-connect-workbuddy",
        "en": "operit-connect-workbuddy"
    },
    "description": {
        "zh": "把 WorkBuddy 模型接入 Operit，并提供账号、积分与模型概览。国内版与国际版两个区域可并行使用。需先在本机部署反代服务。本项目按 MIT 授权提供，改编自 dingminhua/dsh-connect-workbuddy。",
        "en": "Connect WorkBuddy models to Operit, with account, credits and model overview. Both regions run in parallel. Requires a locally deployed bridge service. Adapted from dingminhua/dsh-connect-workbuddy (MIT)."
    },
    "enabledByDefault": true,
    "category": "Network",
    "env": [
        {
            "name": "WORKBUDDY_BRIDGE_URL",
            "description": {
                "zh": "接入服务地址，默认 http://127.0.0.1:8787",
                "en": "Bridge base URL, default http://127.0.0.1:8787"
            },
            "required": false
        },
        {
            "name": "WORKBUDDY_BRIDGE_KEY",
            "description": {
                "zh": "接入服务 API Key，留空自动从服务端 config.json 读取",
                "en": "Bridge API key; empty reads it from the server config.json automatically"
            },
            "required": false
        },
        {
            "name": "WORKBUDDY_BRIDGE_DIR",
            "description": {
                "zh": "接入服务目录，默认 /root/workbuddy-bridge",
                "en": "Bridge service directory, default /root/workbuddy-bridge"
            },
            "required": false
        }
    ],
    "tools": [
        {
            "name": "wb_status",
            "description": {
                "zh": "查看 WorkBuddy 接入服务运行状态，以及国内版与国际版的登录情况。",
                "en": "Show bridge service status and sign-in state for both regions."
            },
            "parameters": []
        },
        {
            "name": "wb_login",
            "description": {
                "zh": "发起指定区域的账号登录，返回浏览器授权链接。",
                "en": "Start sign-in for a region and return the authorization link."
            },
            "parameters": [
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                }
            ]
        },
        {
            "name": "wb_login_poll",
            "description": {
                "zh": "查询登录会话是否完成。完成后凭据自动保存。",
                "en": "Poll a sign-in session; credentials are saved on completion."
            },
            "parameters": [
                {
                    "name": "login_id",
                    "description": { "zh": "登录会话 ID", "en": "Sign-in session ID" },
                    "type": "string",
                    "required": true
                }
            ]
        },
        {
            "name": "wb_models",
            "description": {
                "zh": "列出指定区域账号可用的模型清单。",
                "en": "List models available to the account of a region."
            },
            "parameters": [
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                },
                {
                    "name": "refresh",
                    "description": { "zh": "是否强制重新拉取上游模型目录", "en": "Force refresh the upstream catalog" },
                    "type": "boolean",
                    "required": false
                },
                {
                    "name": "cached",
                    "description": { "zh": "只读本地缓存，不请求上游，用于先秒显旧数据", "en": "Read local cache only, no upstream request" },
                    "type": "boolean",
                    "required": false
                }
            ]
        },
        {
            "name": "wb_chat",
            "description": {
                "zh": "直接调用指定区域的 WorkBuddy 模型完成一次对话。",
                "en": "Send one chat turn to a WorkBuddy model of the given region."
            },
            "parameters": [
                {
                    "name": "prompt",
                    "description": { "zh": "提问内容", "en": "Prompt" },
                    "type": "string",
                    "required": true
                },
                {
                    "name": "model",
                    "description": { "zh": "模型 ID，留空由上游决定", "en": "Model ID; empty lets upstream decide" },
                    "type": "string",
                    "required": false
                },
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                }
            ]
        },
        {
            "name": "wb_credits",
            "description": {
                "zh": "查询指定区域账号的剩余积分。只读，不消耗积分。",
                "en": "Query remaining credits for one region. Read-only."
            },
            "parameters": [
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                },
                {
                    "name": "cached",
                    "description": { "zh": "只读本地缓存，不请求上游，用于先秒显旧数据", "en": "Read local cache only, no upstream request" },
                    "type": "boolean",
                    "required": false
                }
            ]
        },
        {
            "name": "wb_activity",
            "description": {
                "zh": "查询指定区域的限时活动信息：活动名称、赛季、起止时间、剩余天数、活动介绍、规则与奖励明细。只读。",
                "en": "Query the limited-time activity of a region: name, season, period, days left, intro, rules and rewards. Read-only."
            },
            "parameters": [
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                },
                {
                    "name": "cached",
                    "description": { "zh": "只读本地缓存，不请求上游，用于先秒显旧数据", "en": "Read local cache only, no upstream request" },
                    "type": "boolean",
                    "required": false
                }
            ]
        },
        {
            "name": "wb_checkin",
            "description": {
                "zh": "手动领取指定区域的每日活动奖励。已领取时返回已领取状态，不视为失败。",
                "en": "Manually claim the daily activity reward for a region. Already-claimed is reported as such, not as a failure."
            },
            "parameters": [
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                }
            ]
        },
        {
            "name": "wb_service",
            "description": {
                "zh": "查看、启动、停止或重启本机接入服务与守护进程。",
                "en": "Check, start, stop or restart the local bridge service and its watchdog."
            },
            "parameters": [
                {
                    "name": "action",
                    "description": { "zh": "操作：status 查看，start 启动，stop 停止，restart 重启", "en": "Action: status, start, stop or restart" },
                    "type": "string",
                    "required": true
                }
            ]
        },
        {
            "name": "wb_copy",
            "description": {
                "zh": "把文本写入系统剪贴板。",
                "en": "Copy text to the system clipboard."
            },
            "parameters": [
                {
                    "name": "text",
                    "description": { "zh": "要复制的文本", "en": "Text to copy" },
                    "type": "string",
                    "required": true
                }
            ]
        },
        {
            "name": "wb_open",
            "description": {
                "zh": "用系统浏览器打开一个网址。",
                "en": "Open a URL in the system browser."
            },
            "parameters": [
                {
                    "name": "url",
                    "description": { "zh": "要打开的网址", "en": "URL to open" },
                    "type": "string",
                    "required": true
                }
            ]
        },
        {
            "name": "wb_sync_config",
            "description": {
                "zh": "把指定区域的模型清单同步为 Operit 模型配置，免手动填写。已存在同名配置时更新。",
                "en": "Sync a region's model list into an Operit model config; update the same-named config when present."
            },
            "parameters": [
                {
                    "name": "region",
                    "description": { "zh": "区域：cn 国内版，global 国际版，默认 cn", "en": "Region: cn or global, default cn" },
                    "type": "string",
                    "required": false
                }
            ]
        }
    ]
}*/
const WorkBuddyConnect = (function () {
    const DEFAULT_BASE = "http://127.0.0.1:8787";
    const DEFAULT_DIR = "/root/workbuddy-bridge";
    const REGION_LABELS = { cn: "国内版", global: "国际版" };

    function readEnv(key) {
        if (typeof getEnv !== "function") return undefined;
        try {
            const value = getEnv(key);
            return value === undefined || value === null ? undefined : String(value);
        } catch (error) {
            return undefined;
        }
    }

    function baseUrl() {
        const raw = readEnv("WORKBUDDY_BRIDGE_URL");
        const value = raw !== undefined && raw.trim() !== "" ? raw.trim() : DEFAULT_BASE;
        return value.replace(/\/+$/, "");
    }

    function serviceDir() {
        const raw = readEnv("WORKBUDDY_BRIDGE_DIR");
        return raw !== undefined && raw.trim() !== "" ? raw.trim().replace(/\/+$/, "") : DEFAULT_DIR;
    }

    let cachedKey;

    /**
     * 解析接入服务 API Key。优先级：
     *   1) 环境变量 WORKBUDDY_BRIDGE_KEY
     *   2) 服务端 config.json 中的 apiKey（自动读取，用户无需手填）
     * 结果会缓存；force=true 时强制重读（用于服务端换 key 后的重试）。
     */
    async function resolveApiKey(force) {
        const raw = readEnv("WORKBUDDY_BRIDGE_KEY");
        if (raw !== undefined && raw.trim() !== "") return raw.trim();
        if (force !== true && cachedKey !== undefined) return cachedKey;
        let key = "";
        try {
            const session = await Tools.System.terminal.create("workbuddy_bridge_key");
            const result = await Tools.System.terminal.exec(session.sessionId, `cat ${serviceDir()}/config.json`, 15000);
            const text = String(result.output === undefined || result.output === null ? "" : result.output);
            const parsed = JSON.parse(text);
            if (parsed !== null && typeof parsed === "object" && typeof parsed.apiKey === "string") {
                key = parsed.apiKey;
            }
        } catch (error) {
            key = "";
        }
        cachedKey = key;
        return key;
    }

    function normalizeRegion(value) {
        return String(value === undefined || value === null ? "" : value).trim().toLowerCase() === "global" ? "global" : "cn";
    }

    /** 积分与余额是浮点数，去掉二进制浮点误差留下的长尾。 */
    function formatNumber(value) {
        const numeric = typeof value === "number" ? value : Number(value);
        if (Number.isFinite(numeric) !== true) {
            return String(value);
        }
        const rounded = Math.round(numeric * 100) / 100;
        return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
    }

    /** 把原始异常附在消息后，便于排查；连接类失败由 failWithHint 覆盖。 */
    function fail(prefix, error) {
        return { success: false, message: `${prefix}：${String(error)}` };
    }
    /** 连接类失败换成环境自检文案；上游业务错误保留原前缀，避免掩盖真实原因。 */
    async function failWithHint(prefix, error) {
        const text = String(error === undefined || error === null ? "" : error);
        if (/connect|ECONNREFUSED|ETIMEDOUT|timed out/i.test(text)) {
            const setup = await readSetupDiagnosis();
            return {
                success: false,
                message: bridgeDownMessage(setup),
                data: { setup: setup, rawError: text }
            };
        }
        return fail(prefix, error);
    }

    /** 写入系统剪贴板；不可用时返回 false，不抛异常。 */
    function copyToClipboard(text) {
        try {
            const ActivityThread = Java.type("android.app.ActivityThread");
            const application = ActivityThread.currentApplication();
            const appContext = application.getApplicationContext();
            const clipboard = appContext.getSystemService("clipboard");
            const ClipData = Java.type("android.content.ClipData");
            clipboard.setPrimaryClip(ClipData.newPlainText("workbuddy", text));
            return true;
        } catch (error) {
            return false;
        }
    }

    /** 用系统浏览器打开网址；失败返回 false，不抛异常。 */
    function openUrl(url) {
        try {
            const ActivityThread = Java.type("android.app.ActivityThread");
            const application = ActivityThread.currentApplication();
            const IntentClass = Java.type("android.content.Intent");
            const UriClass = Java.type("android.net.Uri");
            const intent = IntentClass.newInstance();
            intent.setAction(IntentClass.ACTION_VIEW);
            intent.setData(UriClass.parse(url));
            intent.addFlags(IntentClass.FLAG_ACTIVITY_NEW_TASK);
            application.startActivity(intent);
            return true;
        } catch (error) {
            return false;
        }
    }

    async function call(method, path, options) {
        const opts = options === undefined ? {} : options;
        const send = async (key) => {
            const headers = {};
            if (opts.auth === true && key !== "") headers.Authorization = `Bearer ${key}`;
            const request = {
                url: `${baseUrl()}${path}`,
                method: method,
                headers: headers,
                responseType: "text",
                connect_timeout: 8000,
                read_timeout: opts.readTimeout === undefined ? 60000 : opts.readTimeout
            };
            if (opts.body !== undefined) request.body = opts.body;
            const result = await Tools.Net.http(request);
            let json;
            try {
                json = JSON.parse(result.content);
            } catch (error) {
                json = undefined;
            }
            return {
                statusCode: result.statusCode,
                text: result.content === undefined || result.content === null ? "" : String(result.content),
                json: json
            };
        };
        let key = "";
        if (opts.auth === true) key = await resolveApiKey(false);
        let response = await send(key);
        /* 服务端 key 变更后自愈：401 时强制重读一次 config.json 再试 */
        if (opts.auth === true && response.statusCode === 401) {
            key = await resolveApiKey(true);
            response = await send(key);
        }
        return response;
    }

    async function wb_status() {
        let response;
        try {
            response = await call("GET", "/healthz");
        } catch (error) {
            /* 连接失败分三种成因，逐级判断后给出可执行指引，不再直接抛宿主原始异常。 */
            const setup = await readSetupDiagnosis();
            return {
                success: false,
                message: bridgeDownMessage(setup),
                data: {
                    online: false,
                    setup: setup,
                    rawError: String(error)
                }
            };
        }
        if (response.statusCode !== 200 || response.json === undefined) {
            return { success: false, message: `接入服务响应异常：HTTP ${response.statusCode}` };
        }
        const regions = response.json.regions === undefined ? {} : response.json.regions;
        const lines = [];
        for (const region of ["cn", "global"]) {
            const info = regions[region] === undefined ? {} : regions[region];
            if (info.signedIn === true) {
                lines.push(`${REGION_LABELS[region]}：已登录，账号 ${info.account === undefined || info.account === null ? "未知" : info.account}，凭据域 ${info.domain === undefined || info.domain === null ? "未知" : info.domain}`);
            } else {
                lines.push(`${REGION_LABELS[region]}：未登录`);
            }
        }
        return { success: true, message: `接入服务正常。\n${lines.join("\n")}`, data: response.json };
    }

    async function wb_login(params) {
        const region = normalizeRegion(params === undefined ? undefined : params.region);
        let response;
        try {
            response = await call("POST", "/admin/login", { body: { region: region } });
        } catch (error) {
            return failWithHint("发起登录失败", error);
        }
        if (response.json === undefined || response.json.verificationUri === undefined) {
            const reason = response.json !== undefined && response.json.error !== undefined ? response.json.error : `HTTP ${response.statusCode}`;
            return { success: false, message: `发起登录失败：${reason}` };
        }
        const copied = copyToClipboard(response.json.verificationUri);
        return {
            success: true,
            message: `${REGION_LABELS[region]}登录已发起，授权链接${copied ? "已写入剪贴板" : "如下"}：\n${response.json.verificationUri}\n会话 ID ${response.json.loginId}，有效期 ${response.json.expiresIn} 秒`,
            data: { ...response.json, copiedToClipboard: copied }
        };
    }

    async function wb_login_poll(params) {
        const loginId = String(params === undefined || params.login_id === undefined ? "" : params.login_id).trim();
        if (loginId === "") return { success: false, message: "缺少参数：login_id" };
        let response;
        try {
            response = await call("GET", `/admin/login/poll?id=${encodeURIComponent(loginId)}`);
        } catch (error) {
            return failWithHint("查询登录状态失败", error);
        }
        if (response.json === undefined) return { success: false, message: `查询登录状态失败：HTTP ${response.statusCode}` };
        if (response.json.done !== true) return { success: true, message: "登录尚未完成，稍后再查", data: response.json };
        if (response.json.error !== undefined) return { success: false, message: `登录失败：${response.json.error}`, data: response.json };
        const account = response.json.account === undefined ? {} : response.json.account;
        const name = account.nickname !== undefined && account.nickname !== "" ? account.nickname : account.uid;
        return {
            success: true,
            message: `登录成功，账号 ${name === undefined || name === null || name === "" ? "未知" : name}，凭据域 ${account.domain === undefined ? "未知" : account.domain}`,
            data: response.json
        };
    }

    async function wb_models(params) {
        const region = normalizeRegion(params === undefined ? undefined : params.region);
        const force = params !== undefined && params.refresh === true;
        const cachedOnly = params !== undefined && params.cached === true;
        const path = cachedOnly
            ? `/${region}/admin/catalog?cached=1`
            : force
                ? `/${region}/admin/catalog?refresh=1`
                : `/${region}/admin/catalog`;
        let response;
        try {
            response = await call("GET", path, { auth: true });
        } catch (error) {
            return failWithHint("读取模型目录失败", error);
        }
        if (response.json === undefined || Array.isArray(response.json.models) !== true) {
            const reason = response.json !== undefined && response.json.error !== undefined ? response.json.error.message : `HTTP ${response.statusCode}`;
            return { success: false, message: `读取模型目录失败：${reason}` };
        }
        const models = response.json.models;
        if (models.length === 0) return { success: true, message: `${REGION_LABELS[region]}没有可用模型`, data: response.json };
        const lines = models.map((model) => {
            const context = model.contextWindow === undefined ? "未知" : model.contextWindow;
            const credits = model.credits === undefined || model.credits === null ? "" : `  倍率 ${model.credits}`;
            const promo = model.promotion === undefined || model.promotion === null ? "" : `  ${model.promotion.label}`;
            const tier = model.restricted === true ? "（账号等级不够）" : "";
            return `${model.id}${tier}  上下文 ${context}${credits}${promo}`;
        });
        return {
            success: true,
            message: `${REGION_LABELS[region]}可用模型 ${models.length} 个：\n${lines.join("\n")}`,
            data: response.json
        };
    }

    async function wb_chat(params) {
        const prompt = String(params === undefined || params.prompt === undefined ? "" : params.prompt).trim();
        if (prompt === "") return { success: false, message: "缺少参数：prompt" };
        const region = normalizeRegion(params.region);
        const body = {
            messages: [{ role: "user", content: prompt }],
            stream: false
        };
        const model = params.model === undefined ? "" : String(params.model).trim();
        if (model !== "") body.model = model;
        let response;
        try {
            response = await call("POST", `/${region}/v1/chat/completions`, { auth: true, body: body, readTimeout: 180000 });
        } catch (error) {
            return failWithHint("调用模型失败", error);
        }
        if (response.json === undefined || Array.isArray(response.json.choices) !== true) {
            let reason = `HTTP ${response.statusCode}`;
            if (response.json !== undefined && response.json.error !== undefined && response.json.error.message !== undefined) {
                reason = response.json.error.message;
            }
            return { success: false, message: `调用模型失败：${reason}` };
        }
        const choice = response.json.choices[0] === undefined ? {} : response.json.choices[0];
        const message = choice.message === undefined ? {} : choice.message;
        const content = message.content === undefined ? "" : String(message.content);
        if (content === "") return { success: false, message: "调用模型失败：上游返回空内容" };
        return { success: true, message: content, data: response.json };
    }

    async function wb_credits(params) {
        const region = normalizeRegion(params === undefined ? undefined : params.region);
        const cachedOnly = params !== undefined && params.cached === true;
        const path = cachedOnly ? `/${region}/admin/credits?cached=1` : `/${region}/admin/credits`;
        let response;
        try {
            response = await call("GET", path, { auth: true });
        } catch (error) {
            return failWithHint("查询积分失败", error);
        }
        if (response.json === undefined || typeof response.json.total !== "number") {
            const reason = response.json !== undefined && response.json.error !== undefined ? response.json.error.message : `HTTP ${response.statusCode}`;
            return { success: false, message: `查询积分失败：${reason}` };
        }
        const data = response.json;
        const packages = Array.isArray(data.packages) ? data.packages : [];
        const lines = packages.map((item) => {
            const expiry = typeof item.expiresAt === "string" ? `，到期 ${item.expiresAt.slice(0, 10)}` : "";
            return `${item.packageName}：剩余 ${formatNumber(item.remain)}${expiry}`;
        });
        const who = data.account === undefined || data.account === null ? "" : data.account;
        const head = `${REGION_LABELS[region]}账号 ${who} 剩余积分合计 ${formatNumber(data.total)}`;
        return { success: true, message: lines.length > 0 ? `${head}\n${lines.join("\n")}` : head, data: data };
    }

    /** 查询限时活动。数值来自上游实时接口，活动文案来自接入服务的 activities.json。 */
    async function wb_activity(params) {
        const region = normalizeRegion(params === undefined ? undefined : params.region);
        const cachedOnly = params !== undefined && params.cached === true;
        const path = cachedOnly ? `/${region}/admin/activity?cached=1` : `/${region}/admin/activity`;
        let response;
        try {
            response = await call("GET", path, { auth: true });
        } catch (error) {
            return failWithHint("查询活动失败", error);
        }
        const data = response.json;
        if (data === undefined || data === null || typeof data !== "object") {
            return { success: false, message: `查询活动失败：HTTP ${response.statusCode}` };
        }
        if (typeof data.error === "string" && data.error !== "") {
            return { success: false, message: `查询活动失败：${data.error}`, data: data };
        }
        if (data.active !== true) {
            return {
                success: true,
                message: `${REGION_LABELS[region]}当前没有进行中的限时活动`,
                data: data
            };
        }
        const season = typeof data.season === "number" && data.season > 0 ? `（第 ${data.season} 季）` : "";
        const lines = [
            `活动：${data.name}${season}`,
            `时间：${data.startTime} ~ ${data.endTime}` +
                (typeof data.daysLeft === "number" ? `，剩余 ${data.daysLeft} 天` : ""),
            `今日：${data.todayCheckedIn === true ? "已签到" : "未签到"}，连签 ${data.streakDays} 天`
        ];
        const rewards = Array.isArray(data.rewards) ? data.rewards : [];
        if (rewards.length > 0) {
            lines.push("奖励：");
            for (const item of rewards) {
                const note = typeof item.note === "string" && item.note !== "" ? `（${item.note}）` : "";
                lines.push(`  · ${item.label}：${item.value}${note}`);
            }
        }
        return { success: true, message: lines.join("\n"), data: data };
    }

    /** 手动领取每日奖励。已领取不算失败，返回 success=true 并带 alreadyClaimed 标记。 */
    async function wb_checkin(params) {
        const region = normalizeRegion(params === undefined ? undefined : params.region);
        let response;
        try {
            response = await call("POST", `/${region}/admin/checkin`, { auth: true, body: {}, readTimeout: 60000 });
        } catch (error) {
            return failWithHint("领取失败", error);
        }
        const data = response.json;
        if (data === undefined || data === null || typeof data !== "object") {
            return { success: false, message: `领取失败：HTTP ${response.statusCode}` };
        }
        if (data.ok !== true) {
            const reason = typeof data.message === "string" && data.message !== "" ? data.message : "上游未返回原因";
            return { success: false, message: `领取失败：${reason}`, data: data };
        }
        if (data.alreadyClaimed === true) {
            const reason = typeof data.message === "string" && data.message !== "" ? data.message : "今日已领取";
            return { success: true, message: `${REGION_LABELS[region]}：${reason}`, data: data };
        }
        const credit = typeof data.credit === "number" && data.credit > 0 ? `，获得 ${data.credit} 积分` : "";
        const streak =
            typeof data.streakDays === "number" && data.streakDays > 0 ? `，连签 ${data.streakDays} 天` : "";
        return { success: true, message: `${REGION_LABELS[region]}：领取成功${credit}${streak}`, data: data };
    }

    /** 把模型清单同步为 Operit 模型配置，免手动填写。同名配置存在时更新。 */
    async function wb_sync_config(params) {
        const region = normalizeRegion(params === undefined ? undefined : params.region);
        if (typeof toolCall !== "function") {
            return { success: false, message: "同步模型配置失败：当前运行时不支持调用宿主工具" };
        }
        let response;
        try {
            response = await call("GET", `/${region}/admin/catalog?refresh=1`, { auth: true });
        } catch (error) {
            return failWithHint("同步模型配置失败", error);
        }
        if (response.json === undefined || Array.isArray(response.json.models) !== true) {
            const reason = response.json !== undefined && response.json.error !== undefined ? response.json.error.message : `HTTP ${response.statusCode}`;
            return { success: false, message: `同步模型配置失败：${reason}` };
        }
        const models = response.json.models;
        if (models.length === 0) {
            return { success: false, message: `同步模型配置失败：${REGION_LABELS[region]}没有可用模型` };
        }
        const modelIds = models.map((model) => model.id);
        /* Operit 的 context_length 是倍率，实际 token = 倍率 × 1024；按该区域模型的最大窗口写入。 */
        const windows = models
            .map((model) => (typeof model.contextWindow === "number" && model.contextWindow > 0 ? model.contextWindow : 0))
            .filter((value) => value > 0);
        const maxWindow = windows.length > 0 ? Math.max.apply(null, windows) : 0;
        const contextMultiplier = maxWindow > 0 ? Math.floor(maxWindow / 1024) : 0;
        const targetName = `WorkBuddy ${REGION_LABELS[region]}`;
        let existing;
        try {
            const listed = await toolCall("list_model_configs", {});
            const configs = listed !== null && typeof listed === "object" && Array.isArray(listed.configs) ? listed.configs : [];
            existing = configs.find((item) => item !== null && typeof item === "object" && item.name === targetName);
        } catch (error) {
            return failWithHint("同步模型配置失败：读取现有配置出错", error);
        }
        const payload = {
            name: targetName,
            api_provider_type: "OPENAI_GENERIC",
            api_endpoint: `${baseUrl()}/${region}/v1`,
            api_key: await resolveApiKey(false),
            model_name: modelIds.join(","),
            max_tokens_enabled: true,
            max_tokens: 64000,
            enable_tool_call: true
        };
        if (contextMultiplier > 0) {
            payload.context_length = contextMultiplier;
            payload.max_context_length = contextMultiplier;
        }
        try {
            if (existing !== undefined) {
                payload.config_id = existing.id;
                await toolCall("update_model_config", payload);
                return {
                    success: true,
                    message: `已更新模型配置 ${targetName}，共 ${modelIds.length} 个模型，上下文倍率 ${contextMultiplier}`,
                    data: { action: "updated", configId: existing.id, modelCount: modelIds.length }
                };
            }
            const created = await toolCall("create_model_config", payload);
            const configId = created !== null && typeof created === "object" && created.data !== undefined && created.data.config !== undefined ? created.data.config.id : "";
            return {
                success: true,
                message: `已创建模型配置 ${targetName}，共 ${modelIds.length} 个模型，上下文倍率 ${contextMultiplier}`,
                data: { action: "created", configId: configId, modelCount: modelIds.length }
            };
        } catch (error) {
            return failWithHint("同步模型配置失败：写入配置出错", error);
        }
    }

    /** 在接入服务终端会话中执行一条命令并返回输出。 */
    async function runServiceCommand(command, timeoutMs) {
        const session = await Tools.System.terminal.create("connect_workbuddy");
        const result = await Tools.System.terminal.exec(session.sessionId, command, timeoutMs === undefined ? 45000 : timeoutMs);
        return typeof result.output === "string"
            ? result.output
            : String(result.output === undefined || result.output === null ? "" : result.output);
    }

    /* ------------------------------------------------------------------ *
     * 服务进程管理
     *
     * 市场审核要求：不得用 pkill / pgrep 按通用进程名批量终止——进程名会命中
     * 其它目录下的同名进程，误停无关插件或用户服务。这里改为：
     *   1) 每个服务只用自己 pidfile 里的 PID；
     *   2) 发信号前做归属校验：PID 存在 + UID 相同 + cmdline 含本服务目录下
     *      的绝对路径，三条同时成立才动手；
     *   3) 校验不通过只清 pidfile，不发任何信号；
     *   4) 探活与启停全部限定在配置的服务目录。
     * ------------------------------------------------------------------ */

    const BRIDGE_PID_FILE_NAME = "bridge.pid";
    const WATCHDOG_PID_FILE_NAME = "watchdog.pid";

    /** 单引号安全转义：路径含空格或引号时不会被 shell 拆开。 */
    function shq(value) {
        const text = String(value === undefined || value === null ? "" : value);
        return "'" + text.replace(/'/g, "'\\''") + "'";
    }

    /** 解析 probe_all 的输出，拿到带归属校验的 PID。 */
    function parseServiceProbe(output) {
        const text = String(output === undefined || output === null ? "" : output);
        const bridge = /BRIDGE_UP\s+(\d+)/.exec(text);
        const watchdog = /WATCHDOG_UP\s+(\d+)/.exec(text);
        return {
            bridgeUp: bridge !== null,
            bridgePid: bridge === null ? 0 : Number(bridge[1]),
            watchdogUp: watchdog !== null,
            watchdogPid: watchdog === null ? 0 : Number(watchdog[1])
        };
    }

    /* ------------------------------------------------------------------ *
     * 环境自检
     *
     * 从市场安装的用户拿不到 server.mjs，也未必装了 Node，连 127.0.0.1 只会
     * 得到宿主网络层的一条原始异常。这里把失败拆成四种可操作的场景：
     * 目录不存在 / 缺服务文件 / 缺 Node / 文件齐全但没启动。
     * ------------------------------------------------------------------ */
    let setupCache = { at: 0, value: undefined };

    /** 一条命令查清五件事：服务目录、server.mjs、Node、config.json、package.json。 */
    function diagnoseSetupCommand() {
        const dir = serviceDir();
        return [
            `if [ -d ${shq(dir)} ]; then echo DIR=1; else echo DIR=0; fi`,
            `if [ -f ${shq(dir + "/server.mjs")} ]; then echo SERVER_MJS=1; else echo SERVER_MJS=0; fi`,
            `if command -v node >/dev/null 2>&1; then echo NODE=1; echo "NODE_VERSION=$(node -v 2>/dev/null)"; else echo NODE=0; echo NODE_VERSION=; fi`,
            `if [ -f ${shq(dir + "/config.json")} ]; then echo CONFIG=1; else echo CONFIG=0; fi`,
            `if [ -f ${shq(dir + "/package.json")} ]; then echo DEPENDENCIES=1; else echo DEPENDENCIES=0; fi`
        ].join("; ");
    }

    /** 解析自检输出。终端不可用或输出不完整时返回 undefined，由调用方按未知处理。 */
    function parseSetup(output) {
        const text = String(output === undefined || output === null ? "" : output);
        if (text.indexOf("SERVER_MJS=") < 0) {
            return undefined;
        }
        const pick = (key) => {
            const matched = new RegExp(key + "=(\\S*)").exec(text);
            return matched === null ? "" : matched[1];
        };
        return {
            dir: serviceDir(),
            dirExists: pick("DIR") === "1",
            serverMjs: pick("SERVER_MJS") === "1",
            node: pick("NODE") === "1",
            nodeVersion: pick("NODE_VERSION"),
            config: pick("CONFIG") === "1",
            dependencies: pick("DEPENDENCIES") === "1"
        };
    }

    /** 读自检结果，60 秒内复用，避免每次失败都新开一个终端会话。 */
    async function readSetupDiagnosis() {
        const now = Date.now();
        if (setupCache.value !== undefined && now - setupCache.at < 60000) {
            return setupCache.value;
        }
        let value;
        try {
            value = parseSetup(await runServiceCommand(diagnoseSetupCommand(), 15000));
        } catch (error) {
            value = undefined;
        }
        setupCache = { at: now, value: value };
        return value;
    }

    /** 把连接失败翻译成能照着做的一句话。三级判断：没目录 → 没文件 → 没 Node。 */
    function bridgeDownMessage(setup) {
        if (setup === undefined) {
            return "接入服务未运行：无法读取服务目录，终端不可用或服务目录未配置。部署步骤见项目主页「安装」第一章。";
        }
        if (setup.dirExists !== true) {
            return `接入服务尚未部署：服务目录 ${setup.dir} 不存在。部署步骤见项目主页「安装」第一章。`;
        }
        if (setup.serverMjs !== true) {
            return `接入服务尚未部署：${setup.dir} 下缺少 server.mjs。部署步骤见项目主页「安装」第一章。`;
        }
        if (setup.node !== true) {
            return `接入服务无法启动：${setup.dir} 下已有服务文件，但本机未找到 Node.js。安装 Node.js 后执行 node ${setup.dir}/server.mjs。`;
        }
        return `接入服务未启动：服务文件与 Node.js 均已就绪。执行 node ${setup.dir}/server.mjs，或在面板点「启动服务」。`;
    }

    /** 探活：只认 pidfile + cmdline 里本目录的绝对路径，不按进程名扫。 */
    function probeCommand() {
        const dir = serviceDir();
        const bridgePid = shq(dir + "/" + BRIDGE_PID_FILE_NAME);
        const watchdogPid = shq(dir + "/" + WATCHDOG_PID_FILE_NAME);
        const bridgePath = shq(dir + "/server.mjs");
        const watchdogPath = shq(dir + "/watchdog.sh");
        return [
            `bp=$(cat ${bridgePid} 2>/dev/null)`,
            `if [ -n "$bp" ] && tr '\\0' ' ' < /proc/$bp/cmdline 2>/dev/null | grep -qF ${bridgePath}; then echo "BRIDGE_UP $bp"; else echo BRIDGE_DOWN; fi`,
            `wp=$(cat ${watchdogPid} 2>/dev/null)`,
            `if [ -n "$wp" ] && tr '\\0' ' ' < /proc/$wp/cmdline 2>/dev/null | grep -qF ${watchdogPath}; then echo "WATCHDOG_UP $wp"; else echo WATCHDOG_DOWN; fi`
        ].join("; ");
    }

    /** 定向终止单个服务：pidfile → 归属校验 → TERM，超时再 KILL。校验不过只清 pidfile，不发信号。 */
    function stopCommandFor(pidFileName, scriptFileName) {
        const dir = serviceDir();
        const pidFile = shq(dir + "/" + pidFileName);
        const scriptPath = shq(dir + "/" + scriptFileName);
        return [
            `sp=$(cat ${pidFile} 2>/dev/null)`,
            `if [ -z "$sp" ]; then echo SKIP_NO_PID; elif tr '\\0' ' ' < /proc/$sp/cmdline 2>/dev/null | grep -qF ${scriptPath}; then kill -TERM $sp 2>/dev/null; n=0; while [ $n -lt 20 ] && kill -0 $sp 2>/dev/null; do sleep 0.2; n=$((n+1)); done; kill -0 $sp 2>/dev/null && kill -KILL $sp 2>/dev/null; echo "KILLED $sp"; else echo "SKIP_NOT_OURS $sp"; fi`,
            `rm -f ${pidFile}`
        ].join("; ");
    }

    /** 启动接入服务：已在运行则复用；否则绝对路径启动，PID 由服务自己写入 bridge.pid。 */
    function startBridgeCommand() {
        const dir = serviceDir();
        const serverPath = shq(dir + "/server.mjs");
        const logPath = shq(dir + "/bridge.log");
        const pidFile = shq(dir + "/" + BRIDGE_PID_FILE_NAME);
        return `pb=$(cat ${pidFile} 2>/dev/null); if [ -n "$pb" ] && tr '\\0' ' ' < /proc/$pb/cmdline 2>/dev/null | grep -qF ${serverPath}; then echo "BRIDGE_PID=$pb"; else cd ${shq(dir)} && nohup node ${serverPath} >> ${logPath} 2>&1 & sleep 3; echo "BRIDGE_PID=$(cat ${pidFile} 2>/dev/null)"; fi`;
    }

    /** 启动守护：已在运行则复用；watchdog.sh 自己写 watchdog.pid。 */
    function startWatchdogCommand() {
        const dir = serviceDir();
        const watchdogPath = shq(dir + "/watchdog.sh");
        const pidFile = shq(dir + "/" + WATCHDOG_PID_FILE_NAME);
        return `pw=$(cat ${pidFile} 2>/dev/null); if [ -n "$pw" ] && tr '\\0' ' ' < /proc/$pw/cmdline 2>/dev/null | grep -qF ${watchdogPath}; then echo "WATCHDOG_PID=$pw"; else rm -f ${pidFile}; cd ${shq(dir)} && nohup bash ${watchdogPath} >/dev/null 2>&1 & sleep 2; echo "WATCHDOG_PID=$(cat ${pidFile} 2>/dev/null)"; fi`;
    }

    async function wb_service(params) {
        const action = String(params === undefined || params.action === undefined ? "" : params.action).trim().toLowerCase();
        const dir = serviceDir();
        /* 停止顺序：先停守护（否则它下一轮巡检会把服务又拉回来），再停接入服务。
           两个动作都只认自己的 pidfile，且发信号前校验进程归属。 */
        const stopCommand = stopCommandFor(WATCHDOG_PID_FILE_NAME, "watchdog.sh") + "; " + stopCommandFor(BRIDGE_PID_FILE_NAME, "server.mjs");
        /* 启动顺序：先起接入服务，再起守护，最后统一探活。 */
        const startCommand = startBridgeCommand() + "; " + startWatchdogCommand();
        if (action === "status") {
            let serviceUp = false;
            let serviceData;
            try {
                const response = await call("GET", "/healthz");
                if (response.statusCode === 200) {
                    serviceUp = true;
                    serviceData = response.json;
                }
            } catch (error) {
                /* 服务未运行，走下面的失败分支 */
            }
            let watchdogUp = false;
            let bridgePid = 0;
            let watchdogPid = 0;
            try {
                const probed = parseServiceProbe(
                    await runServiceCommand(probeCommand(), 15000)
                );
                watchdogUp = probed.watchdogUp;
                bridgePid = probed.bridgePid;
                watchdogPid = probed.watchdogPid;
            } catch (error) {
                /* 终端不可用时只报告服务状态 */
            }
            const setup = serviceUp ? undefined : await readSetupDiagnosis();
            if (serviceData === undefined) {
                serviceData = { online: false, setup: setup };
            } else {
                serviceData.online = true;
                serviceData.setup = setup;
            }
            return {
                success: serviceUp,
                message: serviceUp
                    ? `接入服务运行中（PID ${bridgePid}），健康检查正常。守护进程${watchdogUp ? `运行中（PID ${watchdogPid}）` : "未运行"}。`
                    : bridgeDownMessage(setup),
                data: serviceData
            };
        }
        if (action !== "start" && action !== "stop" && action !== "restart") {
            return { success: false, message: "action 必须是 status、start、stop 或 restart" };
        }
        const command = action === "stop" ? stopCommand : action === "start" ? startCommand : `${stopCommand} ; ${startCommand}`;
        let output = "";
        try {
            output = await runServiceCommand(command, 45000);
        } catch (error) {
            return failWithHint("服务操作失败", error);
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
        let probed = { bridgeUp: false, bridgePid: 0, watchdogUp: false, watchdogPid: 0 };
        try {
            probed = parseServiceProbe(await runServiceCommand(probeCommand(), 15000));
        } catch (error) {
            /* 探活失败按未运行处理，不阻断操作结果 */
        }
        const watchdogUp = probed.watchdogUp;
        const bridgePid = probed.bridgePid;
        if (action === "stop") {
            let stopped = false;
            try {
                const response = await call("GET", "/healthz");
                stopped = response.statusCode !== 200;
            } catch (error) {
                stopped = true;
            }
            const ok = stopped && !watchdogUp;
            return {
                success: ok,
                message: ok
                    ? "接入服务与守护进程已停止。"
                    : `停止命令已执行，接入服务${stopped ? "已停止" : "仍在响应"}，守护进程${watchdogUp ? "仍在运行" : "已停止"}。`,
                data: { output: output.slice(0, 300) }
            };
        }
        let response;
        try {
            response = await call("GET", "/healthz");
        } catch (error) {
            return { success: false, message: `服务启动失败：${output.slice(0, 400)}` };
        }
        if (response.statusCode !== 200) return { success: false, message: `服务启动失败：${output.slice(0, 400)}` };
        return {
            success: true,
            message:
                `接入服务已${action === "restart" ? "重启" : "启动"}（PID ${bridgePid}），` +
                `守护进程${watchdogUp ? `运行中（PID ${probed.watchdogPid}）` : "未运行"}。`,
            data: response.json
        };
    }

    async function wb_copy(params) {
        const text = String(params === undefined || params.text === undefined ? "" : params.text).trim();
        if (text === "") {
            return { success: false, message: "缺少参数：text" };
        }
        if (copyToClipboard(text) !== true) {
            return { success: false, message: "复制失败：剪贴板不可用" };
        }
        return { success: true, message: "已写入剪贴板。" };
    }

    async function wb_open(params) {
        const url = String(params === undefined || params.url === undefined ? "" : params.url).trim();
        if (url === "") {
            return { success: false, message: "缺少参数：url" };
        }
        if (openUrl(url) !== true) {
            return { success: false, message: "打开失败：没有可处理该链接的应用" };
        }
        return { success: true, message: "已用系统浏览器打开。" };
    }

    async function main() {
        return await wb_status();
    }

    function wrap(func) {
        return async function (params) {
            try {
                return await func(params === undefined ? {} : params);
            } catch (error) {
                return { success: false, message: `工具执行失败：${error && error.message !== undefined ? error.message : String(error)}` };
            }
        };
    }

    return {
        wb_status: wrap(wb_status),
        wb_login: wrap(wb_login),
        wb_login_poll: wrap(wb_login_poll),
        wb_models: wrap(wb_models),
        wb_chat: wrap(wb_chat),
        wb_credits: wrap(wb_credits),
        wb_activity: wrap(wb_activity),
        wb_checkin: wrap(wb_checkin),
        wb_service: wrap(wb_service),
        wb_copy: wrap(wb_copy),
        wb_open: wrap(wb_open),
        wb_sync_config: wrap(wb_sync_config),
        main: main
    };
})();
exports.wb_status = WorkBuddyConnect.wb_status;
exports.wb_login = WorkBuddyConnect.wb_login;
exports.wb_login_poll = WorkBuddyConnect.wb_login_poll;
exports.wb_models = WorkBuddyConnect.wb_models;
exports.wb_chat = WorkBuddyConnect.wb_chat;
exports.wb_credits = WorkBuddyConnect.wb_credits;
exports.wb_activity = WorkBuddyConnect.wb_activity;
exports.wb_checkin = WorkBuddyConnect.wb_checkin;
exports.wb_service = WorkBuddyConnect.wb_service;
exports.wb_copy = WorkBuddyConnect.wb_copy;
exports.wb_open = WorkBuddyConnect.wb_open;
exports.wb_sync_config = WorkBuddyConnect.wb_sync_config;
exports.main = WorkBuddyConnect.main;