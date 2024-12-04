# SpringCloudAlibaba

## 介绍

**[Spring Cloud Alibaba](https://sca.aliyun.com/)** 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用服务的必需组件，方便开发者通过
SpringCloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里分布式应用解决方案，通过阿里中间件来迅速搭建分布式应用系统。

## SpringCloud微服务体系

**Spring Cloud 是分布式微服务架构的一站式解决方案**，它提供了一套简单易用的编程模型，使我们能在 Spring Boot
的基础上轻松地实现微服务系统的构建。
Spring Cloud 提供以微服务为核心的分布式系统构建标准。


<img src="https://sca.aliyun.com/img/overview-doc-img/spring-cloud-img.png" alt="定位" style="display: block; margin: 0 auto; zoom: 100%">

Spring Cloud 本身并不是一个开箱即用的框架，它是一套微服务规范，共有两代实现：

* `Spring Cloud Netflix` 是 Spring Cloud 的第一代实现，主要由 `Eureka`、`Ribbon`、`Feign`、`Hystrix` 等组件组成。
* `Spring Cloud Alibaba` 是 Spring Cloud 的第二代实现，主要由 `Nacos`、`Sentinel`、`Seata` 等组件组成。

## 定位

<img src="https://sca.aliyun.com/img/overview-doc-img/spring-cloud-alibaba-img.png" alt="定位" style="display: block; margin: 0 auto; zoom: 100%">

Spring Cloud Alibaba 吸收了 Spring Cloud Netflix 微服务框架的核心架构思想，并进行了高性能改进。自 Spring Cloud Netflix
进入停更维护后，Spring Cloud Alibaba 逐渐代替它成为主流的微服务框架。

## 功能

目前 Spring Cloud Alibaba 提供了如下功能:

* `服务限流降级`：支持 WebServlet、WebFlux, OpenFeign、RestTemplate、Dubbo 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级
  Metrics 监控。
* `服务注册与发现`：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。
* `分布式配置管理`：支持分布式系统中的外部化配置，配置更改时自动刷新。
* `Rpc服务`：扩展 Spring Cloud 客户端 RestTemplate 和 OpenFeign，支持调用 Dubbo RPC 服务
* `消息驱动能力`：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。
* `分布式事务`：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。
* `阿里云对象存储`：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
* `分布式任务调度`：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有
  Worker（schedulerx-client）上执行。
* `阿里云短信服务`：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

SpringCloudAlibaba 实际上是 SpringCloud 的增强框架，可以兼容 SpringCloud 原生组件和 SpringCloudAlibaba 的组件。