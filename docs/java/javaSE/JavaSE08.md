# Java新特性

本文将介绍 `Java 9 - Java 17` 版本的所有新增特性

:::details 参考资料：

- [JavaSE 9-17 新特性](https://www.bilibili.com/video/BV1tU4y1y7Fg)

:::

Java 8 是Oracle 公司于 2014 年 3 月 18 日发布的，距离今天已经过了近十年的时间了。

Java 是继续不断发展壮大，几乎每隔 6 个月，就会冒出一个新版本，但是由于 Java 8 的稳定和生态完善（目前仍是LTS长期维护版本），依然有很多公司在坚持使用Java
8 。不过随着 SpringBoot 3.0 的到来，现在强制要求使用 Java 17 版本（同样也是LTS长期维护版本），下一个Java版本的时代，或许已经临近了。

## 1、Java 8 关键特性回顾

### 1.1.Lambda表达式

在 Java 8 之前，在某些情况下可能需要用到匿名内部类，比如：

````java
public static void main(String[] args) {
    //新建一个线程来搞事情
    Thread thread = new Thread(new Runnable() {   
        //创建一个实现Runnable的匿名内部类
        @Override
        public void run() {   //具体的实现逻辑
            System.out.println("Hello World!");
        }
    });
    thread.start();
}
````

在 Java 8 之后，只需要一个简短的 lambda 表达式即可：

````java
public static void main(String[] args) {
    //现在我们想新建一个线程来做事情
    Thread thread = new Thread(() -> {
        System.out.println("Hello World!");  //只需留下我们需要具体实现的方法体
    });
    thread.start();
}
````