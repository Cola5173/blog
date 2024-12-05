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
                    {text: "JavaSE（四）面向对象高级篇", link: "JavaSE04.md"},
                    {text: "JavaSE（五）泛型程序设计", link: "JavaSE05.md"},
                    {text: "JavaSE（六）集合类与IO", link: "JavaSE06.md"},
                    {text: "JavaSE（七）多线程与反射", link: "JavaSE07.md"},
                ],
                collapsed: true,
            },
            {
                text: "javaWeb",
                base: "/backend/javaWeb/",
                items: [
                    {text: "JavaWeb（一）计算机网络基础", link: "javaWeb01.md"},
                ],
                collapsed: true,
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
                    {text: "Lombok", link: "Lombok.md"},
                    {text: "Git", link: "Git.md"},
                    {text: "EasyExcel", link: "EasyExcel.md"},
                    {text: "Linux", link: "Linux.md"},
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
                text: "SpringCloudAlibaba",
                base: "/backend/springcloudAlibaba/",
                items: [
                    {text: "SpringCloudAlibaba", link: "01_springcloudAlibaba.md"},
                    {text: "Nacos", link: "02_Nacos.md"},
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
                collapsed: true,
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
                collapsed: true,
            },
            {
                text: "2024",
                base: "/work/2024/",
                items: [
                    {text: "Vector", link: "Vector.md"},
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
                collapsed: true,
            }
        ],
        // 其它
        "/other/": [
            {
                text: "收藏",
                base: "/other/mixed/",
                items: [
                    {text: "文档小工具", link: "icons.md"},
                    {text: "收藏网址", link: "myCollections.md"},
                ],
                collapsed: true,
            },
            {
                text: "博客搭建流程",
                base: "/other/blog/",
                items: [
                    {text: "1-VitepressStart", link: "01_VitepressStart.md"},
                    {text: "2-Github", link: "02_Github.md"},
                    {text: "3-Vercel", link: "03_Vercel.md"},
                    {text: "4-gittalk", link: "04_gittalk.md"},
                    {text: "5-增加文字总数和阅读时间组件", link: "05_ReadingStats.md"},
                ],
                collapsed: true,
            },
            {
                text: "股票",
                base: "/other/stock/",
                items: [
                    {text: "趋势交易", link: "TrendTrading.md"},
                    {text: "股票基础常识", link: "Basics.md"},
                ],
                collapsed: true,
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
            link: "/backend/backendIndex.md",
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
            link: "/other/aboutMe.md",
            activeMatch: "/other/",
        }
    ];
}
