/**
 * 左侧菜单栏
 * -------------------------------------------------------------------------- */
export function sidebar() {
    return {
        // 后端开发
        "/backend/": [
            {
                text: "基本概念",
                base: "/backend/concept/",
                items: [
                    {text: "消息队列", link: "MQ.md"}
                ],
                collapsed: false,
            },
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
        // 工作
        "/work/": [
            {
                text: "可观测",
                base: "/work/observability/",
                items: [
                    {text: "可观测", link: "可观测.md"}
                ],
                collapsed: false,
            },
            {
                text: "日志",
                base: "/work/logs/",
                items: [
                    {text: "Kafka", link: "Kafka.md"}
                ],
                collapsed: false,
            },
        ],
        // 生活随记
        "/life/": [
            {
                text: "2024",
                base: "/life/2024",
                items: [
                    {text: "还没写", link: "还没写.md"}
                ],
                collapsed: false,
            }
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
            text: "👩🏻‍💻工作",
            link: "/work/工作首页.md",
            activeMatch: "/work/",
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
