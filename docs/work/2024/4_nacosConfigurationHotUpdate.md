# Nacos配置文件热更新

:::details 参考资料：

- [如何实现nacos配置文件热更新](https://nacos.io/blog/faq/nacos-user-question-history15462/)
- [【Nacos】配置管理、微服务配置拉取、实现配置热更新、多环境配置](https://developer.aliyun.com/article/1519527)
- [应用间配置共享、扩展配置文件加载优先级、新老版本差异](https://developer.aliyun.com/article/1058267)
- [Nacos 融合 Spring Cloud，成为注册配置中心](https://nacos.io/docs/latest/ecology/use-nacos-with-spring-cloud/?source=wuyi)

:::

## 什么是Nacos配置文件热更新？

**Nacos配置热更新**是通过客户端监听配置变更来实现的。

当Nacos服务器上的配置发生变化时，它会自动推送给已订阅该配置的客户端，客户端收到更新后，会触发相应的处理逻辑来应用新配置，从而达到热更新的效果。

<img src="https://ask.qcloudimg.com/http-save/yehe-10074098/a169d0dbd3ca7c4addf248510dfc25ae.jpg" alt="nacos配置中心">

## 具体实现

### 在nacos中添加配置文件

在对应的 `namespace` 下，创建需要进行配置文件热更新的配置文件：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/4_nacosConfigurationHotUpdate/01.png" alt="创建配置文件">

### 编写bootstrap.yml

在启动配置文件 bootstrap.yml中，配置对应的nacos地址、命名空间、组、监听的配置文件：

````yml:line-numbers
xxx:
  nacos:
    server-addr: 172.30.34.73:8846
    username: nacos
    password: xxxx
    config-namespace: xxx
    discovery-namespace: xxx
    group: xxx

spring:
  application:
    name: st-logplatform-service
  cloud:
    nacos:
      config:
        server-addr: ${xxx.nacos.server-addr}
        username: ${xxx.nacos.username}
        password: ${xxx.nacos.password}
        namespace: ${xxx.nacos.config-namespace}
        group: ${xxx.nacos.group}
        file-extension: yaml
        refresh-enabled: true
        enabled: true  # 开启/关闭使用配置中心配置
        extension-configs:
          - data-id: config-custom.yml
            group: ${xxx.nacos.group}
            refresh: true # 需要显式打开，否则监听不成功
          - data-id: config.properties
            group: ${xxx.nacos.group}
            refresh: true
      discovery:
        server-addr: ${xxx.nacos.server-addr}
        username: ${xxx.nacos.username}
        password: ${xxx.nacos.password}
        namespace: ${xxx.nacos.discovery-namespace}
        enabled: true   # 开启/关闭使用注册中心
````

### 加载配置项

在对应的配置类中，加载nacos配置文件中对应的配置项：

````java
@Data
@Configuration
@RefreshScope // 开启热更新
public class LogExportConfig {
    @Value("${log-export.max_size}")
    private Integer logExportMaxSize;

    @Value("${log-export.batch_size}")
    private Integer logExportBatchSize;
}
````

### 验证

启动项目，在日志中可以发现已成功监听对应的配置文件：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/4_nacosConfigurationHotUpdate/02.png" alt="监听成功">

现在，只需验证是否可以热更新。

在nacos控制台中，修改配置文件的某几项：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/4_nacosConfigurationHotUpdate/03.png" alt="修改配置文件">

查看项目日志：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/work/20204/4_nacosConfigurationHotUpdate/04.png" alt="成功更新">

## 问题

在进行热更新的时候，有想过是否可以采用 `@NacosConfigurationProperties` 注解完成热更新，但是发现在 Spring Cloud Nacos 中需要在
bootstrap.yml 或 application.yml 中显式声明配置中心的相关属性。否则，Spring Cloud Nacos 无法正确加载 Nacos 配置中心的配置。