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