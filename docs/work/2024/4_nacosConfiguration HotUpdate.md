# Nacos配置文件热更新

:::details 参考资料：

- [如何实现nacos配置文件热更新](https://nacos.io/blog/faq/nacos-user-question-history15462/)
- [【Nacos】配置管理、微服务配置拉取、实现配置热更新、多环境配置](https://developer.aliyun.com/article/1519527)

:::

## 什么是Nacos配置文件热更新？

**Nacos配置热更新**是通过客户端监听配置变更来实现的。

当Nacos服务器上的配置发生变化时，它会自动推送给已订阅该配置的客户端，客户端收到更新后，会触发相应的处理逻辑来应用新配置，从而达到热更新的效果。

## 具体实现

### 