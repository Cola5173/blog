/**
 * 左侧菜单栏
 * -------------------------------------------------------------------------- */
export function sidebar() {
    return {
        // Java
        "/java/": [
            {
                text: "javaSE",
                base: "/java/javaSE/",
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
                base: "/java/javaWeb/",
                items: [
                    {text: "JavaWeb（一）计算机网络基础", link: "javaWeb01.md"},
                    {text: "JavaWeb（二）前端基础", link: "javaWeb02.md"},
                    {text: "JavaWeb（三）后端开发", link: "javaWeb03.md"},
                ],
                collapsed: true,
            },
            {
                text: "新特性",
                base: "/java/newFeatures/",
                items: [
                    {text: "Java8", link: "01.md"},
                    {text: "Java9", link: "02.md"},
                ],
                collapsed: false,
            },

            {
                text: "SSM",
                base: "/java/SSM/",
                items: [
                    {text: "Spring", link: "Spring.md"},
                    {text: "MybatisPlus", link: "MybatisPlus.md"},
                ],
                collapsed: true,
            },
            {
                text: "工具类",
                base: "/java/tools/",
                items: [
                    {text: "Maven", link: "Maven.md"},
                    {text: "Lombok", link: "Lombok.md"},
                    {text: "EasyExcel", link: "EasyExcel.md"}
                ],
                collapsed: true,
            },
            {
                text: "并发编程",
                base: "/java/concurrent/",
                items: [
                    {text: "JUC", link: "JUC.md"},
                    {text: "CompletableFuture", link: "CompletableFuture.md"},
                ],
                collapsed: true,
            },
            {
                text: "SpringCloudAlibaba",
                base: "/java/springcloudAlibaba/",
                items: [
                    {text: "SpringCloudAlibaba", link: "01_springcloudAlibaba.md"},
                    {text: "Nacos", link: "02_Nacos.md"},
                ],
                collapsed: true,
            },
        ],
        // golang
        "/golang/": [
            {
                text: "语法基础",
                base: "/golang/golangSE/",
                items: [
                    {text: "golang（一）环境安装", link: "golangSE01.md"},
                    {text: "golang（二）变量和输入输出", link: "golangSE02.md"},
                    {text: "golang（三）数组切片和map", link: "golangSE03.md"},
                    {text: "golang（四）控制语句", link: "golangSE04.md"},
                ],
                collapsed: false,
            }
        ],
        // python
        "/python/": [
            {
                text: "语法基础",
                base: "/python/pythonSE/",
                items: [
                    {text: "python（一）基础语法", link: "pythonSE01.md"},
                    {text: "python（二）判断语句", link: "pythonSE02.md"},
                    {text: "python（三）循环语句", link: "pythonSE03.md"},
                    {text: "python（四）函数", link: "pythonSE04.md"},
                    {text: "python（五）数据容器", link: "pythonSE05.md"},
                    {text: "python（六）文件基础操作", link: "pythonSE06.md"},
                    {text: "python（七）异常", link: "pythonSE07.md"},
                    {text: "python（八）模块和包", link: "pythonSE08.md"},
                    {text: "python（）案例", link: "pythonSE00.md"},
                ],
                collapsed: false,
            }
        ],
        // 中间件
        "/middleware/": [
            {
                text: "概念",
                base: "/middleware/concept/",
                items: [
                    {text: "消息队列", link: "MQ.md"},
                ],
                collapsed: false,
            },
            {
                text: "Kafka",
                base: "/middleware/kafka/",
                items: [
                    {text: "Kafka（一）基础概念", link: "kafka01.md"},
                    {text: "Kafka（二）安装和部署", link: "kafka02.md"},
                    {text: "Kafka（三）工具和命令", link: "kafka03.md"},
                    {text: "Kafka（四）Java客户端", link: "kafka04.md"}
                ],
                collapsed: true,
            },
            {
                text: "ElasticSearch",
                base: "/middleware/es/",
                items: [
                    {text: "es（一）简介和安装", link: "es01.md"},
                    {text: "es（二）操作索引库", link: "es02.md"},
                    {text: "es（三）操作文档", link: "es03.md"},
                    {text: "es（）JavaClient", link: "es00.md"},
                ],
                collapsed: false,
            },
            {
                text: "Docker",
                base: "/middleware/docker/",
                items: [
                    {text: "Docker（一）安装和概念", link: "docker01.md"},
                    {text: "Docker（二）示例和命令", link: "docker02.md"},
                    {text: "Docker（三）Dockerfile", link: "docker03.md"},
                ],
                collapsed: true,
            },
        ],
        // 工作
        "/work/": [
            {
                text: "开发工具",
                base: "/work/tools/",
                items: [
                    {text: "Linux", link: "Linux.md"},
                    {text: "Git", link: "Git.md"},
                ],
                collapsed: false,
            },
            {
                text: "2025",
                base: "/work/2025/",
                items: [
                    {text: "Dify知识库", link: "01.md"},
                    {text: "LLM", link: "02.md"},
                    {text: "RAG", link: "03.md"},
                    {text: "DDD", link: "04.md"},
                ],
                collapsed: false,
            },
            {
                text: "2024",
                base: "/work/2024/",
                items: [
                    {text: "Redis慢日志持久化", link: "6_redisSlowLog.md"},
                    {text: "Nginx日志切割", link: "5_nginxLogCut.md"},
                    {text: "Nacos配置文件热更新", link: "4_nacosConfigurationHotUpdate.md"},
                    {text: "Vector", link: "3_Vector.md"},
                    {text: "问题修复记录", link: "2_bugs.md"},
                    {text: "可观测", link: "1_observability.md"},
                ],
                collapsed: true,
            }
        ],
        // 有知有行
        "/practice/": [
            {
                text: "股票",
                base: "/practice/stock/",
                items: [
                    {text: "股场悟道", link: "01.md"},
                    {text: "入门知识", link: "02.md"},
                ],
                collapsed: true,
            },
            {
                text: "2025",
                base: "/practice/2025/",
                items: [
                    {text: "股探报告", link: "01.md"},
                    {text: "BS", link: "02.md"},
                    {text: "四分之三阴量线", link: "03.md"},
                    {text: "2024/04/23", link: "04.md"},
                    {text: "2024/04/30", link: "05.md"},
                    {text: "2024/05/08", link: "06.md"},
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
                collapsed: false,
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
            text: "Java",
            link: "/java/javaIndex.md",
            activeMatch: "/java/"
        },
        {
            text: "Golang",
            link: "/golang/golangIndex.md",
            activeMatch: "/golang/"
        },
        {
            text: "Python",
            link: "/python/pythonIndex.md",
            activeMatch: "/python/"
        },
        {
            text: "🛰️中间件",
            link: "/middleware/middlewareIndex.md",
            activeMatch: "/middleware/"
        },
        {
            text: "👩🏻‍💻工作",
            link: "/work/工作首页.md",
            activeMatch: "/work/",
        },
        {
            text: "💸有知有行",
            link: "/practice/learnByDoing.md",
            activeMatch: "/practice/",
        },
        {
            text: "🤖其它",
            link: "/other/aboutMe.md",
            activeMatch: "/other/",
        }
    ];
}
