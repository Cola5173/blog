/**
 * 左侧菜单栏
 * -------------------------------------------------------------------------- */
export function sidebar() {
    return {
        // 后端开发
        "/backend/": [
            {
                text: "中间件",
                base: "/backend/middleware/",
                items: [
                    {text: "Kafka", link: "Kafka.md"}
                ],
                collapsed: false,
            },
            {
                text: "工具类",
                base: "/backend/tools/",
                items: [
                    {text: "lombok", link: "Lombok.md"},
                    {text: "Git", link: "Git.md"},
                ],
                collapsed: false,
            },
        ],
        // 力扣
        "/leetcode/": [
            {
                text: "前100道",
                base: "/leetcode/100",
                items: [
                    {text: "还没写", link: "还没写.md"}
                ],
                collapsed: false,
            }
        ],
        // 可观测
        "/observability/": [
            {text: "部署资源参考", link: "/deploy/部署资源参考.md"},
            {text: "中间件部署", link: "/deploy/中间件部署.md"},
            {text: "调用链系统部署", link: "/deploy/调用链系统部署.md"},
            {text: "日志系统部署", link: "/deploy/日志系统部署.md"},
            {text: "监控系统部署", link: "/deploy/监控系统部署.md"},
            {text: "告警系统部署", link: "/deploy/告警系统部署.md"},
            {text: "权限系统部署", link: "/deploy/权限系统部署.md"},
            {text: "前端部署", link: "/deploy/前端部署.md"},
            {text: "采控系统部署", link: "/deploy/采控系统部署.md"},
            {text: "服务自动拉起", link: '/deploy/服务自动拉起.md'},
        ],
        // 生活随记
        "/life/": [
            {text: "升级V4.0.8到V4.0.9", link: "/upgrade/升级V4.0.8到V4.0.9.md"},
            {text: "升级V4.0.7到V4.0.8", link: "/upgrade/升级V4.0.7到V4.0.8.md"},
            {text: "升级V4.0.6到V4.0.7", link: "/upgrade/升级V4.0.6到V4.0.7.md"},
            {text: "升级V4.0.4到V4.0.6", link: "/upgrade/升级V4.0.4到V4.0.6.md"},
            {text: "升级V4.0.3到V4.0.4", link: "/upgrade/升级V4.0.3到V4.0.4.md"},
            {text: "升级V4.0.2到V4.0.3", link: "/upgrade/升级V4.0.2到V4.0.3.md"},
            {text: "升级V4.0.0到V4.0.2", link: "/upgrade/升级V4.0.0到V4.0.2.md"},
        ],
        // 其它
        "/other/": [
            {
                text: "其它",
                base: "/other/",
                items: [
                    {text: "关于我", link: "aboutMe.md"},
                    {text: "文档图标大全", link: "icons.md"},
                ],
                collapsed: false,
            },
            {
                text: "博客",
                base: "/other/blog/",
                items: [
                    {text: "Vitepress搭建博客", link: "Vitepress搭建博客.md"},
                    {text: "Github托管博客", link: "Github托管博客.md"},
                    {text: "Vercel部署博客", link: "Vercel部署博客.md"},
                ],
                collapsed: false,
            },
        ],
    };
}

/**
 * 顶部导航栏
 * -------------------------------------------------------------------------- */
export function nav() {
    return [
        {text: "首页", link: "/"},
        {
            text: "⌨️后端开发",
            link: "/backend/后端开发首页.md",
            activeMatch: "/backend/"
        },
        {
            text: "🔢力扣",
            link: "/leetcode/力扣.md",
            activeMatch: "/leetcode/",
        },
        {
            text: "👁️可观测",
            link: "/observability/可观测首页.md",
            activeMatch: "/observability/",
        },
        {
            text: "🍵生活随记",
            link: `/life/生活.md`,
            activeMatch: "/life/",
        },
        {
            text: "🤖其它",
            link: "/other/aboutMe.md",
            activeMatch: "/other/",
        }
    ];
}
