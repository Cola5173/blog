# JUC

:::details 学习资料：

- [Java Concurrent 并发编程](https://www.bilibili.com/video/BV1Wa4y1H7c7)
  :::

JUC的全称是：`java.util.concurrent`，是 Java 的并发编程的包，后续均为对其的学习。

## 1.基础概念

### 1.1.进程和线程

**进程**是程序的一次执行过程实例。当一个程序被执行，就是从磁盘中加载此程序的代码至内存。

**线程**就是一个指令流，将指令流中的一条条指令以一定的顺序交给CPU执行。

Java 中，线程作为最小调度单位，进程作为资源分配的的最小单位。
一个进程在其执行的过程中可以产生多个线程，同一个进程的多个线程共享堆和方法区资源，但每个线程有自己的程序计数器、虚拟机栈和本地方法栈。

### 1.2.并发和并行

**并发**是程序上的逻辑，而**并行**是物理上的概念。

如果程序是采用多线程的技术编写的，那么运行在单核单线程的机器上，就会并发执行；运行在多核多线程的机器上，就会并行执行。

程序员最关心的是***并发***，程序可不可以并行，取决于操作系统和硬件。

## 2.线程

在进行并发编程编码时，最关心的就是异步线程如何去执行任务。在Java 中，当我们启动 main 函数时其实就是启动了一个 JVM 的进程，而
main 函数所在的线程就是这个进程中的一个线程，也称主线程。

### 2.1.线程状态

在 Java 中，`java.lang.Thread.State` 中表明，线程在运行的生命周期中的指定时刻只可能处于下面 6 种不同状态的其中一个状态：

- NEW：初始状态，线程被创建出来但没有被调用 start()
- RUNNABLE: 运行状态，线程被调用了 start()等待运行的状态
- BLOCKED：阻塞状态，需要等待锁释放
- WAITING：等待状态，表示该线程需要等待其他线程做出一些特定动作（通知或中断）
- TIME_WAITING：超时等待状态，可以在指定的时间后自行返回而不是像 WAITING 那样一直等待
- TERMINATED：终止状态，表示该线程已经运行完毕。

<img src="./imgs/JUC/img.png" alt="线程状态转换图" style="display: block; margin: 0 auto; zoom: 70%">

### 2.2.创建启动线程

创建一个线程，启动线程执行方法，共有 `3` 种：

1. 直接使用 `Thread`
   ```java
    /**
     * 使用 Thread 创建和启动线程
     */
    @Test
    public void test01() {
        Thread thread = new Thread("Thread") {
            @Override
            public void run() {
                log.info("使用 Thread 线程名为:{}", Thread.currentThread().getName());
            }
        };
        thread.start();
        log.info("test01 主线程：{}，结束执行......", Thread.currentThread().getName());
    }
   ```
2. 使用 `Runnable` 接口配合 `Thread`
    ```java
    /**
     * Runnable 为可运行的任务，Thread 代表线程
     */
    @Test
    public void test02() {
        Runnable runnable = () -> {
            log.info("使用 Runnable 搭配 Thread 线程名为:{}", Thread.currentThread().getName());
        };

        Thread thread = new Thread(runnable, "Runnable");
        thread.start();

        log.info("test02 主线程：{}，结束执行......", Thread.currentThread().getName());
    } 
    ```
3. 使用 `FutureTask` 配合 `Thread`
    ```java
    /**
     * FutureTask 可以返回结果，Thread 代表线程
     */
    @Test
    @SneakyThrows
    public void test03() {
        FutureTask<Integer> futureTask = new FutureTask<>(() -> {
            log.info("使用 FutureTask 搭配 Thread 线程名为:{}", Thread.currentThread().getName());
            return 100;
        });

        Thread thread = new Thread(futureTask, "futureTask");
        thread.start();

        log.info("test03 主线程：{}，结束执行......", Thread.currentThread().getName());

        log.info("获取 futureTask 返回的结果：{}", futureTask.get());
    }
    ```