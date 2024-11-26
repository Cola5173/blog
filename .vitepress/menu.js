/**
 * 左侧菜单栏
 * -------------------------------------------------------------------------- */
export function sidebar() {
    return {
        // 后端开发
        "/backend/": [
            {
                text: "javaSE",
                base: "/backend/javaSE/",
                items: [
                    {text: "JavaSE（一）走进Java语言", link: "JavaSE01.md"},
                    {text: "JavaSE（二）面向过程编程", link: "JavaSE02.md"},
                    {text: "JavaSE（三）面向对象基础篇", link: "JavaSE03.md"},
                ],
                collapsed: false,
            },
            {
                text: "SSM",
                base: "/backend/SSM/",
                items: [
                    {text: "Spring", link: "Spring.md"},
                    {text: "MyBatisPlus", link: "MyBatisPlus.md"},
                ],
                collapsed: true,
            },
            {
                text: "工具类",
                base: "/backend/tools/",
                items: [
                    {text: "lombok", link: "Lombok.md"},
                    {text: "Git", link: "Git.md"},
                    {text: "EasyExcel", link: "EasyExcel.md"},
                    {text: "Linux", link: "Linux.md"},
                ],
                collapsed: true,
            },
            {
                text: "数据库",
                base: "/backend/database/",
                items: [
                    // {text: "MyBatisPlus", link: "MyBatisPlus.md"}
                ],
                collapsed: true,
            },
            {
                text: "消息队列",
                base: "/backend/mq/",
                items: [
                    {text: "消息队列", link: "MQ.md"},
                    {text: "Kafka", link: "Kafka.md"},
                ],
                collapsed: true,
            },
            {
                text: "并发编程",
                base: "/backend/concurrent/",
                items: [
                    {text: "JUC", link: "JUC.md"},
                    {text: "CompletableFuture", link: "CompletableFuture.md"},
                ],
                collapsed: true,
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
                text: "前端学习",
                base: "/work/frontend/",
                items: [
                    {text: "Dart", link: "Dart.md"},
                ],
                collapsed: false,
            },
            {
                text: "2024",
                base: "/work/2024/",
                items: [
                    {text: "问题修复记录", link: "bugs.md"},
                    {text: "可观测", link: "observability.md"},
                ],
                collapsed: true,
            },
            {
                text: "软考",
                base: "/work/CSC/",
                items: [
                    {text: "软考初级-程序员", link: "Programmer.md"},
                ],
                collapsed: true,
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
                base: "/other/mixed/",
                items: [
                    {text: "关于我", link: "aboutMe.md"},
                    {text: "文档小工具", link: "icons.md"},
                    {text: "收藏网址", link: "myCollections.md"},
                ],
                collapsed: false,
            },
            {
                text: "博客搭建流程",
                base: "/other/blog/",
                items: [
                    {text: "Vitepress搭建博客", link: "Vitepress搭建博客.md"},
                    {text: "Github托管博客", link: "Github托管博客.md"},
                    {text: "Vercel部署博客", link: "Vercel部署博客.md"},
                    {text: "引入gittalk", link: "引入gittalk.md"},
                ],
                collapsed: true,
            },
            {
                text: "股票",
                base: "/other/stock/",
                items: [
                    {text: "股票基础常识", link: "Basics.md"},
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
            link: `/life/Life.md`,
            activeMatch: "/life/",
        },
        {
            text: "🤖其它",
            link: "/other/mixed/aboutMe.md",
            activeMatch: "/other/",
        }
    ];
}
