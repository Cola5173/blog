# Kafka

::: details 参考资料如下：

- [千锋教育最新kafka入门到精通教程](https://www.bilibili.com/video/BV1Xy4y1G7zA)
- [kafka消息中间件精讲](https://www.bilibili.com/video/BV14J4m187jz)
- [windows系统kafka小白入门篇](https://blog.csdn.net/m0_70325779/article/details/137248462)
- [kafka消息中间件精讲](https://www.bilibili.com/video/BV14J4m187jz)

:::

## 工具和命令

### 1、工具

有一个 GUI 可以可视化看到 kafka 中的数据，比较方便学习，我所使用的是：[Kafka-King](https://github.com/Bronya0/Kafka-King?tab=readme-ov-file)，下载后配置使用即可。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/kafka/10.png" alt="Kafka King" style="margin: auto;zoom: normal">

本地使用 Kafka King 真的挺不错的，各种功能都有😄。

如果是大型集群，建议使用：[Know Streaming](https://github.com/didi/KnowStreaming)，可以观察流量，Kafka中的数据积压。

在开发时候，需要关注的 `consumer group` 中的三个信息：

- current-offset：最后被消费的消息的偏移量
- log-end-offset：消息总量（最后一条消息的偏移量）
- lag：积压消息总量

其实在线上排查问题的时候，并没有很多工具可以使用，主要靠命令。

### 2、命令

**列出所有 Topic：**

````shell
./bin/kafka-topics.sh --list --bootstrap-server <ip:port>
````

**创建topic：**

````shell
# 创建名为 test 的topic，分区 1，副本 1
./bin/kafka-topics.sh --create --topic test --partitions 1 --replication-factor 1 --bootstrap-server <ip:port>
````

**查看 test 的 topic 下的消息量：**

````shell
./bin/kafka-run-class.sh kafka.tools.GetOffsetShell --broker-list <ip:port> --topic test
````

查看消费者的偏移量：

```shell
./bin/kafka-consumer-groups.sh --describe --group consumerName --bootstrap-server <ip:port>
```

**检查集群的状态,这个命令会显示 Kafka broker 支持的 API 版本以及其他集群信息**

````shell
./bin/kafka-broker-api-versions.sh --bootstrap-server <ip:port>
````
