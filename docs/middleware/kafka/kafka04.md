# Kafka

::: details 参考资料如下：

- [千锋教育最新kafka入门到精通教程](https://www.bilibili.com/video/BV1Xy4y1G7zA)
- [kafka消息中间件精讲](https://www.bilibili.com/video/BV14J4m187jz)
- [windows系统kafka小白入门篇](https://blog.csdn.net/m0_70325779/article/details/137248462)
- [kafka消息中间件精讲](https://www.bilibili.com/video/BV14J4m187jz)

:::

## Java

终于进入正式篇了✌，从 Java 的角度来看 Kafka 有两个维度：

- producer：编写Java代码，朝 topic 中发送消息
- consumer：消费 topic 中的消息

### 1、环境搭建

现代开发，都是基于 SpringBoot 作为框架去迅速开发，首先进行环境搭建，引入 kafka 的依赖：

```xml
<!--kafka-->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

编写配置文件 `application.yml` :

```yml
server:
  port: 3489

spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    consumer:
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
```

### 2、producer

#### 2.1.入门

基于 SpringBoot ，编写代码，朝刚刚创建的名为 test 的topic发送消息。在日常的开发中，其实很简单:

```java:line-numbers
@SpringBootTest
@Slf4j
class KafkaDemoApplicationTests {

    // 引入spring-kafka后，SpringBoot会自动装配
    @Resource
    private KafkaTemplate<String, String> kafkaTemplate;

    @Test
    void test01() {
        kafkaTemplate.send("test", "msg");
    }
}
```

这样就可以直接发送成功了，这就是最简单的发送消息咯。需要注意的是，之前在引入 KafkaTemplate ：

```java
KafkaTemplate<K, V>

Type parameters:
<K> – the key type. <V> – the value type.
```

显示的制定了泛型 K 和 V，使用String类型.

#### 2.2.send()

KafkaTemplate 提供了好几种发送消息的方式：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/kafka/11.png" alt="send" style="margin: auto;zoom: normal">

分别的含义是：

- 发送消息类，message中已提前封装好信息
- 指定topic、data
- 发送producerRecord对象，已提前封装好各种信息
- 指定topic、key、data
- 指定topic、partition、key、data
- 指定topic、partition、时间戳、key、data

日常就是根据你想要的方式，去选择性的使用方法即可。

`Message<?> message` 的使用：

```java
    /**
     * KafkaHeaders：中可以设置很多参数
     * payload：消息体内容
     */
    @Test
    void test02() {
        Message<String> msg = MessageBuilder.withPayload("send Message<?> message")
                .setHeader(KafkaHeaders.TOPIC, "test")
                .build();
        kafkaTemplate.send(msg);
    }
```

`ProducerRecord<K, V> record` 的使用：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/kafka/12.png" alt="send 2" style="margin: auto;zoom: normal">


```java
    /**
     * ProducerRecord的使用
     */
    @Test
    void test03() {
        ProducerRecord<String, String> producerRecord = new ProducerRecord<>("test", "ProducerRecord<K, V> record");
        kafkaTemplate.send(producerRecord);
    }
```

#### 2.3.sendDefault()

KafkaTemplate 还有一个名为 `sendDefault()` 的方法，如下：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/kafka/13.png" alt="send" style="margin: auto;zoom: normal">

可以观察到，在这些方法中没有 topic ，是因为如果需要使用前，需要在配置文件中写明默认发送的主题：

```yml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    consumer:
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      group-id: test-consumer
      auto-offset-reset: earliest
    template:
      default-topic: test # 配置默认发送的主题
```

采用这个方法发送消息，会自动发送到配置文件中写明的主题中:

```java
    /**
     * sendDefault的使用
     */
    @Test
    void test04() {
        kafkaTemplate.sendDefault("sendDefault");
    }
```

#### 2.4.发送结果

发送消息的方法都学完了，如何获取消息发送完的结果呢？是否发送成功❓❓❓

无论是 `send()` 方法还是 `sendDefault` 方法，都会返回一个 `CompletableFuture<SendResult<K, V>>` 对象，是一个异步计算回调后的结果，去调用相关的函数就可执行后续操作。

CompletableFuture 的使用见：还没写。

#### 2.5.发送流程

Kafka 生产者的发送消息的流程为：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/kafka/14.png" alt="send 3" style="margin: auto;zoom: normal">

拦截器--------》序列化器--------》分区器

#### 2.6.分区器

如果一个 topic 存在多个分区，producer 向 topic 中发送消息时，采用什么何种策略将消息发送到哪个区域呢❓❓❓

阅读源码发现：

```java
    /**
     * computes partition for given record.
     * if the record has partition returns the value otherwise
     * if custom partitioner is specified, call it to compute partition
     * otherwise try to calculate partition based on key.
     * If there is no key or key should be ignored return
     * RecordMetadata.UNKNOWN_PARTITION to indicate any partition
     * can be used (the partition is then calculated by built-in
     * partitioning logic).
     */
    private int partition(ProducerRecord<K, V> record, byte[] serializedKey, byte[] serializedValue, Cluster cluster) {
        if (record.partition() != null)
            return record.partition();

        if (partitioner != null) {
            int customPartition = partitioner.partition(
                record.topic(), record.key(), serializedKey, record.value(), serializedValue, cluster);
            if (customPartition < 0) {
                throw new IllegalArgumentException(String.format(
                    "The partitioner generated an invalid partition number: %d. Partition number should always be non-negative.", customPartition));
            }
            return customPartition;
        }

        if (serializedKey != null && !partitionerIgnoreKeys) {
            // hash the keyBytes to choose a partition
            return BuiltInPartitioner.partitionForKey(serializedKey, cluster.partitionsForTopic(record.topic()).size());
        } else {
            return RecordMetadata.UNKNOWN_PARTITION;
        }
    }
```

生产者向多分区的 topic 发送消息时，分区选择策略可以根据消息是否包含 **Key** 或 **自定义分区器** 来决定，逻辑如下：

- **如果指定了分区号**：消息直接发送到指定的分区
- **如果没有指定分区，但指定了 Key**：
  - Kafka 使用 Key 的哈希值来计算目标分区。具体算法就是使用 `Utils.murmur2` 方法将 Key 哈希为一个整数，然后再取正数，以保证哈希值非负：
    ```java
    Utils.toPositive(Utils.murmur2(serializedKey)) % numPartitions;
    ```
  - 这样可以确保相同 Key 的消息发送到相同的分区，方便消费端实现 Key 的数据顺序性。
- **如果既没有指定分区也没有指定 Key**：
  - 采用的是一种伪轮询策略 `StickyPartitioner` 实现的动态选择分区的逻辑
  - 主要依据当前集群的负载状态以及可用分区情况来做决定。代码逻辑可分为两种情况：
    - **没有分区负载信息**：则从可用分区中随机选择一个分区；若无可用分区，则在全部分区中随机选择。
    - **有分区负载信息**：则基于分区的负载权重进行选择。代码生成一个随机数，根据分区负载的累积频率表，使用二分查找找到对应的分区，保证将更多消息发送到负载较低的分区。

自己可以配置其它提供的分区策略，或自己定义一个分区策略，实现逻辑如下：

```java
@Configuration
public class KafkaConfig {
    /**
     * 生产者创建工厂
     */
    public ProducerFactory<String, String> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigs());
    }

    /**
     * 生产者相关配置，都在ProducerConfig类中
     */
    public Map<String, Object> producerConfigs() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        //指定RoundRobin分区策略
        config.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, RoundRobinPartitioner.class);
        return config;
    }

    /**
     * 覆盖默认配置类中的KafkaTemplate
     */
    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
```

如果想要实现自定义的分区策略呢？其实道理都是一样的，只需要再多谢一个类，实现 `` 接口：

```java
public class CustomPartitioner implements Partitioner {

    /**
     * 计算分区逻辑部分代码
     */
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        return 0;
    }

    @Override
    public void close() {
        // 可不写
    }

    @Override
    public void configure(Map<String, ?> configs) {
        // 可不写
    }
}
```

然后，在生产者的配置类中配置即可：

```java
@Configuration
public class KafkaConfig {
    ...

    /**
     * 生产者相关配置，都在ProducerConfig类中
     */
    public Map<String, Object> producerConfigs() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        //指定自定义的发送消息分区策略
        config.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, CustomPartitioner.class);
        return config;
    }

    ...
}
```

#### 2.7.拦截器

如果想要实现自定义的拦截器，需要实现 `ProducerInterceptor` 接口：

```java
public class CustomInterceptor implements ProducerInterceptor<String, String> {

    /**
     * 发送消息前，会先调用这个方法
     */
    @Override
    public ProducerRecord<String, String> onSend(ProducerRecord<String, String> record) {
        log.info("自定义消息拦截器 success ........");
        return record;// 需要将消息发送出去
    }

    /**
     * 服务器收到消息后的确认
     */
    @Override
    public void onAcknowledgement(RecordMetadata metadata, Exception exception) {

    }

    @Override
    public void close() {
        //可不写
    }

    @Override
    public void configure(Map<String, ?> configs) {
        //可不写
    }
}
```

在之前编写的 kafka 配置类中添加即可：

```java
    /**
     * 生产者相关配置，都在ProducerConfig类中
     */
    public Map<String, Object> producerConfigs() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        //指定自定义的发送消息分区策略
        config.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, CustomPartitioner.class);
        //指定自定义的发送消息拦截器
        config.put(ProducerConfig.INTERCEPTOR_CLASSES_CONFIG,CustomInterceptor.class.getName());
        return config;
    }
```

### 3、consumer

#### 3.1.监听机制

如何使用Java代码来监听topic，消费消息呢？是通过监听机制来实现的：

```java:line-numbers
@Service
@Slf4j
public class EventConsumer {

    @KafkaListener
    public void consume(ConsumerRecord<String, String> record) {
        log.warn("监听到 topic：{}， 的消息内容为：{}", record.topic(), record.value());
    }
}
```

通过 `@KafkaListener` 注解，实现在启动项目的时候，监听 Kafka 中 topic 内的内容变化，但是直接启动会报错：

:::details 报错信息
Error starting ApplicationContext. To display the condition evaluation report re-run your application with 'debug'
enabled.
22:32:19.643 [main] ERROR o.s.boot.SpringApplication - Application run failed
java.lang.IllegalStateException: topics, topicPattern, or topicPartitions must be provided
:::

在使用这个注解的时候，需要指定一些信息：

```java
@KafkaListener(topics = {"test"})
public void consume(ConsumerRecord<String, String> record) {
    log.warn("监听到 topic：{}， 的消息内容为：{}", record.topic(), record.value());
}
```

但仍然报错：

:::details 报错信息
Caused by: java.lang.IllegalStateException: No group.id found in consumer config, container properties, or
@KafkaListener annotation; a group.id is required when group management is used.
:::

可以通过配置文件 or 在注解中指定 `consumer group` ，大部分项目中都是使用一个消费组，一般都在配置文件中指定：

```yml:line-numbers
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    consumer:
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      group-id: test-consumer
```

成功启动项目，但是发现，控制台并没有输出相关日志，尝试再次发送消息到 kafka 中，发现日志正常打印。这是因为 consumer 的默认配置就是，从消费者开始工作后的新消息才会被处理。

#### 3.2.消费偏移量策略

这就引入了一项配置，Kafka 消费者的 `auto-offset-reset` 配置用于指定当消费者组的偏移量（offset）不存在或不可用时（例如，第一次消费或偏移量已过期被删除）应该从哪里开始消费消息。

常用的选项为 `latest`（SpringBoot 默认项）、`earliest`，但是总共有四种：

- **`latest`**
  - 含义：当没有有效偏移量时，从 **最新的消息** 开始消费。
  - 用法：消费者会忽略历史消息，只消费新产生的消息。
  - 适合场景：适用于只关心新数据、不需要处理历史消息的情况。
  - 举例：如果当前 topic 中已经有 100 条消息，而消费者第一次连接时使用 `latest`，则它会从第 101 条消息开始消费。
- **`earliest`**
  - 含义：当没有有效偏移量时，从 **最早的消息** 开始消费。
  - 用法：消费者会从分区的起始位置（即偏移量 0）开始读取数据。
  - 适合场景：适用于需要处理所有历史消息的情况，或者系统第一次启动时。
  - 举例：如果 `earliest` 被设置，消费者会从最早的消息开始处理，无论消息已经存在了多久。
- **`none`**
  - 含义：当没有偏移量可供恢复时，抛出错误，表示没有合适的偏移量。
  - 用法：只有在消费者组有已存储的偏移量时才会启动，否则会报错并停止。
  - 适合场景：适用于不允许任何数据丢失或跳过的应用中，确保消费者组的偏移量总是存在。
  - 举例：如果该消费者组从未消费过该 topic，或者偏移量被清除，客户端会直接报错，避免消息丢失。
- **`exception`**
  - 含义：该选项并不是 Kafka 的官方设置；通常通过 `none` 和自定义错误处理来实现类似的效果。
  - 处理方式：遇到无法获取偏移量的情况时抛出异常，以便应用程序进行自定义处理。

❗❗❗如果之前已经使用过相同的 `consumer-group-id` 消费过，Kafka 会保存该消费组的偏移量。即使重新设置了消费者的
`auto-offset-reset=earliest` ，该配置也不会生效。此时，要么使用新的消费组or重置该消费组的的偏移量。

Kafka 中提供了脚本工具，用于手动重置消费组的偏移量：

```shell
# 进入 Kafka 安装目录的 bin 目录，使用 kafka-consumer-groups.sh 工具
./kafka-consumer-groups.sh --bootstrap-server <broker地址> \
                           --group <消费组ID> \
                           --topic <topic名称> \
                           --reset-offsets \
                           --to-earliest \
                           --execute
```

```cmd
kafka-consumer-groups.bat --bootstrap-server localhost:9092 ^
                          --group test-consumer ^
                          --topic test ^
                          --reset-offsets ^
                          --to-earliest ^
                          --execute
```

❗❗❗记住，消费组的状态需要为 `inactive` 否则会重置消费组偏移量失败：

:::details 重置结果细节
Error: Assignments can only be reset if the group 'test-consumer' is inactive, but the current state is Stable.
:::

重置成功后就可以监听到 test 主题下的所有消息咯~