# JavaSE

:::details 学习参考资料：

- [JavaSE 教程](https://www.bilibili.com/video/BV1YP4y1o75f)

:::

## 7.1.多线程

### 7.1.1.线程的创建和启动

通过创建Thread对象来创建一个新的线程，Thread构造方法中需要传入一个Runnable接口的实现（其实就是编写要在另一个线程执行的内容逻辑）同时Runnable只有一个未实现方法，因此可以直接使用lambda表达式：

```java
@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();//run是直接在当前线程执行，并不是创建一个线程执行
}
```

创建好后，通过调用start()方法来运行此线程：

```java
/**
 * 我是主线程！
 * 我是线程：Thread-0
 * 我正在计算 0-10000 之间所有数的和...
 * 结果：50005000
 */
public static void main(String[] args) {
    Thread t = new Thread(() -> {
        System.out.println("我是线程：" + Thread.currentThread().getName());
        System.out.println("我正在计算 0-10000 之间所有数的和...");
        int sum = 0;
        for (int i = 0; i <= 10000; i++) {
            sum += i;
        }
        System.out.println("结果：" + sum);
    });
    t.start();
    System.out.println("我是主线程！");
}
```

印实际上是在交替进行的，也证明了他们是在同时运行！

### 7.1.2.线程的休眠和中断

当一个线程处于运行状态下，线程的下一个状态会出现以下情况：

- 当CPU给予的运行时间结束时，会从运行状态回到就绪（可运行）状态，等待下一次获得CPU资源
- 当线程进入休眠 / 阻塞(如等待IO请求) / 手动调用wait()方法时，会使得线程处于等待状态，当等待状态结束后会回到就绪状态
- 当线程出现异常或错误 / 被stop() 方法强行停止 / 所有代码执行结束时，会使得线程的运行终止

使线程进入休眠：

```java
public static void main(String[] args) {
    Thread t = new Thread(() -> {
        try {
            System.out.println("l");
            Thread.sleep(1000);   //sleep方法是Thread的静态方法，它只作用于当前线程（它知道当前线程是哪个）
            System.out.println("b");    //调用sleep后，线程会直接进入到等待状态，直到时间结束
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    t.start();
}
```

通过调用 `sleep()` 方法来将当前线程进入休眠，使得线程处于等待状态一段时间。如果打断正在休眠的线程，会抛出一个
`InterruptedException` 异常：

```java
public static void main(String[] args) {
    Thread t = new Thread(() -> {
        try {
            Thread.sleep(10000);  //休眠10秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    t.start();
    try {
        Thread.sleep(3000);   //休眠3秒，一定比线程t先醒来
        t.interrupt();   //调用t的interrupt方法
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

:::danger 报错信息：
java.lang.InterruptedException: sleep interrupted
:::

每一个 Thread 对象中，都有一个 `interrupt()` 方法，调用此方法后，会给指定线程添加一个**中断标记**
以告知线程需要立即停止运行或是进行其他操作。比如，通过 `isInterrupted()` 可以判断线程是否存在中断标志，进行资源释放：

```java
public static void main(String[] args) {
    Thread t = new Thread(() -> {
        System.out.println("线程开始运行！");
        while (true){   //无限循环
            if(Thread.currentThread().isInterrupted()){   //判断是否存在中断标志
                break;   //响应中断
            }
        }
        System.out.println("线程被中断了！");
    });
    t.start();
    try {
        Thread.sleep(3000);   //休眠3秒，一定比线程t先醒来
        t.interrupt();   //调用t的interrupt方法
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

如果并不希望收到中断信号就是结束程序，而是通知程序做其他事情，可以在收到中断信号后，复位中断标记，然后继续执行程序：

```java
public static void main(String[] args) {
    Thread t = new Thread(() -> {
        System.out.println("线程开始运行！");
        while (true) {
            if (Thread.currentThread().isInterrupted()) {   //判断是否存在中断标志
                System.out.println("发现中断信号，复位，继续运行...");
                Thread.interrupted();  //复位中断标记（返回值是当前是否有中断标记，这里不用管）
            }
        }
    });
    t.start();
    try {
        Thread.sleep(3000);   //休眠3秒，一定比线程t先醒来
        t.interrupt();   //调用t的interrupt方法
        Thread.sleep(5000);
        t.stop();   //强制停止线程t
        System.out.println("线程停止！");
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

虽然这样很方便地控制了线程的暂停状态，但是这两个方法实际上也是不推荐的做法，它很容易导致死锁❗❗❗

### 7.1.3.线程的优先级

Java程序中的每个线程并不是平均分配CPU时间的，为了使得线程资源分配更加合理，Java采用的是抢占式调度方式，优先级越高的线程，优先使用CPU资源！线程的优先级一般分为以下三种：

* `MIN_PRIORITY` ：最低优先级
* `MAX_PRIORITY` ：最高优先级
* `NOM_PRIORITY` ：常规优先级

```java
public static void method01() {
    Thread t = new Thread(() -> {
        System.out.println("线程开始运行！");
    });
    t.start();
    t.setPriority(Thread.MIN_PRIORITY);  //通过使用setPriority方法来设定优先级
}
```

优先级越高的线程，获得CPU资源的概率会越大，但并不一定优先级越高的线程越先执行！

### 7.1.4.线程的礼让和加入

可以在当前线程的工作不重要时，将CPU资源让位给其他线程，通过使用 `yield()` 方法来将当前资源让位给其他同优先级线程：

```java
public static void method01() {
    Thread t1 = new Thread(() -> {
        System.out.println("线程1开始运行！");
        for (int i = 0; i < 50; i++) {
            if (i % 5 == 0) {
                System.out.println("让位！");
                Thread.yield();
            }
            System.out.println("1打印：" + i);
        }
        System.out.println("线程1结束！");
    });
    Thread t2 = new Thread(() -> {
        System.out.println("线程2开始运行！");
        for (int i = 0; i < 50; i++) {
            System.out.println("2打印：" + i);
        }
    });
    t1.start();
    t2.start();
}
```

使用 `join()` 方法来实现一个线程等待另一个线程执行完成后再继续进行：

```java
public static void method02() {
    Thread t1 = new Thread(() -> {
        System.out.println("线程1开始运行！");
        for (int i = 0; i < 50; i++) {
            System.out.println("1打印：" + i);
        }
        System.out.println("线程1结束！");
    });
    Thread t2 = new Thread(() -> {
        System.out.println("线程2开始运行！");
        for (int i = 0; i < 50; i++) {
            System.out.println("2打印：" + i);
            if (i == 10) {
                try {
                    System.out.println("线程1加入到此线程！");
                    t1.join();    //在i==10时，让线程1加入，先完成线程1的内容，在继续当前内容
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    });
    t1.start();
    t2.start();
}
```

线程1加入后，线程2等待线程1待执行的内容全部执行完成之后，再继续执行的线程2内容。注意，线程的加入只是等待另一个线程的完成，并不是将另一个线程和当前线程合并!!!

### 7.1.5.线程锁和线程同步

线程之间的共享变量是存储在主内存（main memory）中，每个线程都有一个私有的工作内存（本地内存），工作内存中存储了该线程以读/写共享变量的副本：

<img src="https://oss.itbaima.cn/internal/markdown/2022/10/04/ZvI8neF3tdGJwS4.png" alt="Java内存模型">

当同时去操作一个存储在主内存中的共享变量时，如果仅仅是读取还好，但是如果同时写入内容，就会出现问题：

```java
private static int value = 0;

/**
 * 线程1完成
 * 线程2完成
 * 18611
 * ------------------------
 * 多运行几次，发现每次得到的结果不一样
 */
public static void method01() throws InterruptedException {
    Thread t1 = new Thread(() -> {
        for (int i = 0; i < 10000; i++) value++;
        System.out.println("线程1完成");
    });
    Thread t2 = new Thread(() -> {
        for (int i = 0; i < 10000; i++) value++;
        System.out.println("线程2完成");
    });
    t1.start();
    t2.start();
    Thread.sleep(1000);  //主线程停止1秒，保证两个线程执行完成
    System.out.println(value);
}
```

通过 `synchronized` 关键字来创造一个线程锁，它需要在括号中填入一个内容，必须是一个对象或是一个类：

````java
private static int value = 0;

public static void method02() throws InterruptedException {
    Thread t1 = new Thread(() -> {
        for (int i = 0; i < 10000; i++) {
            synchronized (ThreadLockAndThreadSynchronization.class) {
                value++;
            }
        }
        System.out.println("线程1完成");
    });
    Thread t2 = new Thread(() -> {
        for (int i = 0; i < 10000; i++) {
            synchronized (ThreadLockAndThreadSynchronization.class) {
                value++;
            }
        }
        System.out.println("线程2完成");
    });
    t1.start();
    t2.start();
    Thread.sleep(1000);  //主线程停止1秒，保证两个线程执行完成
    System.out.println(value);
}
````

在同步代码块执行过程中，拿到了传入对象或类的锁（传入的如果是对象，就是对象锁，不同的对象代表不同的对象锁，如果是类，就是类锁，类锁只有一个，实际上类锁也是对象锁，是Class类实例，但是Class类实例同样的类无论怎么获取都是同一个），但是注意两个线程必须使用同一把锁！

当一个线程进入到同步代码块时，会获取到当前的锁，而这时如果其他使用同样的锁的同步代码块也想执行内容，
**必须等待当前同步代码块的内容执行完毕后会自动释放这把锁**。

当对象不同时，获取到的是不同的锁，因此并不能保证自增操作的原子性，最后也得不到我们想要的结果。

synchronized关键字也可以作用于方法上，调用此方法时也会获取锁：

````java
private static int value = 0;

public static void method03() throws InterruptedException {
    Thread t1 = new Thread(() -> {
        for (int i = 0; i < 10000; i++) add();
        System.out.println("线程1完成");
    });
    Thread t2 = new Thread(() -> {
        for (int i = 0; i < 10000; i++) add();
        System.out.println("线程2完成");
    });
    t1.start();
    t2.start();
    Thread.sleep(1000);  //主线程停止1秒，保证两个线程执行完成
    System.out.println(value);
}

private static synchronized void add() {
    value++;
}
````

### 7.1.6.死锁

死锁是指两个线程相互持有对方需要的锁，但是又迟迟不释放，导致程序卡住：

<img src="https://oss.itbaima.cn/internal/markdown/2022/10/04/Ja6TPO23wCI8pvn.png" alt="死锁">

线程A和线程B都需要对方的锁，但是又被对方牢牢把握，由于线程被无限期地阻塞，因此程序不可能正常终止：

````java
private static final Object lock1 = new Object();
private static final Object lock2 = new Object();

public static void method01() {
    Thread t1 = new Thread(() -> {
        synchronized (lock1) {
            System.out.println(Thread.currentThread().getName() + " 拿到 lock1");
            try {
                Thread.sleep(1000);
                synchronized (lock2) {
                    System.out.println(Thread.currentThread().getName() + " 拿到 lock2");
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }, "t1");

    Thread t2 = new Thread(() -> {
        synchronized (lock2) {
            System.out.println(Thread.currentThread().getName() + " 拿到 lock2");
            try {
                Thread.sleep(1000);
                synchronized (lock1) {
                    System.out.println(Thread.currentThread().getName() + " 拿到 lock1");
                }
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }, "t2");
    
    t1.start();
    t2.start();
}
````

在编写多线程代码的时候，需要额外的注意，一定不要出现这种死锁的情况。如何检测死锁❓

利用 `jps` 命令，先找到Java进程号：

````shell
PS C:\Users\xxxxx> jps
22408 Jps
22744 Main
24584 Deadlock
9960 Main
8572 Launcher
````

利用 `jstack` 命令，检测死锁：

````shell
PS C:\Users\xxxx> jstack 24584
2024-12-03 14:44:34
Full thread dump Java HotSpot(TM) 64-Bit Server VM (17.0.4.1+1-LTS-2 mixed mode, sharing):
...
Java stack information for the threads listed above:
===================================================
"t1":
        at com.xxx.javase.chapter07.Deadlock.lambda$method01$0(Deadlock.java:23)
        - waiting to lock <0x00000004e8093a70> (a java.lang.Object)
        - locked <0x00000004e8093a60> (a java.lang.Object)
        at com.fkx.javase.chapter07.Deadlock$$Lambda$14/0x0000000800c01200.run(Unknown Source)
        at java.lang.Thread.run(java.base@17.0.4.1/Thread.java:833)
"t2":
        at com.xxx.javase.chapter07.Deadlock.lambda$method01$1(Deadlock.java:37)
        - waiting to lock <0x00000004e8093a60> (a java.lang.Object)
        - locked <0x00000004e8093a70> (a java.lang.Object)
        at com.fkx.javase.chapter07.Deadlock$$Lambda$15/0x0000000800c01418.run(Unknown Source)
        at java.lang.Thread.run(java.base@17.0.4.1/Thread.java:833)

Found 1 deadlock.
````

`jstack` 自动找到了一个死锁，并打印出了相关线程的栈追踪信息，同样的，使用 `jconsole` 也可以进行监测。

### 7.1.7.wait和notify方法

`wait()`、`notify()` 以及 `notifyAll()` ，需要配合 `synchronized`来使用的（实际上锁就是依附于对象存在的，每个对象都有针对于锁的一些操作）：

````java
public static void method01() throws InterruptedException {
    Object o1 = new Object();
    Thread t1 = new Thread(() -> {
        synchronized (o1) {
            try {
                System.out.println(Thread.currentThread().getName() + " 开始等待");
                o1.wait();     //进入等待状态并释放锁
                System.out.println(Thread.currentThread().getName()+" 等待结束！");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }, "t1");
    Thread t2 = new Thread(() -> {
        synchronized (o1) {
            System.out.println(Thread.currentThread().getName() + " 开始唤醒！");
            o1.notify();     //唤醒处于等待状态的线程
            for (int i = 0; i < 50; i++) {
                System.out.println(i);
            }
            //唤醒后依然需要等待这里的锁释放之前等待的线程才能继续
        }
    }, "t2");
    t1.start();
    Thread.sleep(1000);
    t2.start();
}
````

`wait()` 方法会暂时使得此线程进入等待状态，同时会释放当前代码块持有的锁，这时其他线程可以获取到此对象的锁。

当其他线程调用 `notify()` 方法后，会唤醒刚才变成等待状态的线程（这时并没有立即释放锁）。注意，必须是在持有锁（同步代码块内部）的情况下使用，否则会抛出异常！

### 7.1.8.ThreadLocal的使用

之前介绍了每个线程都有一个自己的工作内存，那么能否只在自己的工作内存中创建变量仅供线程自己使用呢？

通过 `ThreadLocal` 类，来创建工作内存中的变量，它将变量值存储在内部（只能存储一个变量），不同的线程访问到ThreadLocal对象时，都只能获取到当前线程所属的变量：

````java
/**
 * 变量值已设定！
 * lbwnb
 * null
 * -----------------
 * 第一个线程存放的内容，第一个线程可以获取，但是第二个线程无法获取
 */

public static void method01() throws InterruptedException {
    //注意这是一个泛型类，存储类型为我们要存放的变量类型
    ThreadLocal<String> local = new ThreadLocal<>();
    Thread t1 = new Thread(() -> {
        local.set("lbwnb");   //将变量的值给予ThreadLocal
        System.out.println("变量值已设定！");
        System.out.println(local.get());   //尝试获取ThreadLocal中存放的变量
    });
    Thread t2 = new Thread(() -> {
        System.out.println(local.get());   //尝试获取ThreadLocal中存放的变量
    });
    t1.start();
    Thread.sleep(3000);    //间隔三秒
    t2.start();
}
````

第一个线程存入后，第二个线程也存放，是否会覆盖第一个线程存放的内容：

````java
/**
 * 线程1变量值已设定！
 * 线程2变量值已设定！
 * 线程1读取变量值：
 * lbwnb
 * -------
 * 即使线程2重新设定了值，也没有影响到线程1存放的值
 */
public static void method02() throws InterruptedException {
    ThreadLocal<String> local = new ThreadLocal<>();
    Thread t1 = new Thread(() -> {
        local.set("lbwnb");//将变量的值给予ThreadLocal
        System.out.println("线程1变量值已设定！");
        try {
            Thread.sleep(2000);    //间隔2秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("线程1读取变量值：");
        System.out.println(local.get());   //尝试获取ThreadLocal中存放的变量
    });
    Thread t2 = new Thread(() -> {
        local.set("yyds");   //将变量的值给予ThreadLocal
        System.out.println("线程2变量值已设定！");
    });
    t1.start();
    Thread.sleep(1000);    //间隔1秒
    t2.start();
}
````

不同线程向ThreadLocal存放数据，只会存放在线程自己的工作空间中，而不会直接存放到主内存中，因此各个线程直接存放的内容互不干扰。

线程中创建的子线程，可以通过 `InheritableThreadLocal` 获得父线程工作内存中的变量：

````java
public static void method03() {
    ThreadLocal<String> local = new InheritableThreadLocal<>();
    Thread t = new Thread(() -> {
        local.set("lbwnb");
        new Thread(() -> {
            System.out.println(local.get());
        }).start();
    });
    t.start();
}
````

在InheritableThreadLocal存放的内容，会自动向子线程传递。

### 7.1.9.定时器

Java 提供了一套自己的框架用于处理定时任务：

````java
public static void m1() {
    //创建定时器对象
    Timer timer = new Timer();
    timer.schedule(new TimerTask() {
        //注意这个是一个抽象类，不是接口，无法使用lambda表达式简化，只能使用匿名内部类
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());    //打印当前线程名称
        }
    }, 1000);//执行一个延时任务
}
````

Timer类来进行定时任务调度，可以创建任意类型的定时任务，包延时任务、循环定时任务等。

虽然任务执行完成了，但是程序并没有停止，这是因为Timer内存维护了一个任务队列和一个工作线程：

````java
public class Timer {
    /**
     * The timer task queue.  This data structure is shared with the timer
     * thread.  The timer produces tasks, via its various schedule calls,
     * and the timer thread consumes, executing timer tasks as appropriate,
     * and removing them from the queue when they're obsolete.
     */
    private final TaskQueue queue = new TaskQueue();

    /**
     * The timer thread.
     */
    private final TimerThread thread = new TimerThread(queue);
  
		...
}
````

`TimerThread` 继承自 Thread，是一个新创建的线程，在构造时自动启动。`run()` 会循环地读取队列中是否还有任务，如果有任务依次执行，没有的话就暂时处于休眠状态：

````java
public void run() {
    try {
        mainLoop();
    } finally {
        // Someone killed this Thread, behave as if Timer cancelled
        synchronized(queue) {
            newTasksMayBeScheduled = false;
            queue.clear();  // Eliminate obsolete references
        }
    }
}

/**
 * The main timer loop.  (See class comment.)
 */
private void mainLoop() {
  try {
       TimerTask task;
       boolean taskFired;
       synchronized(queue) {
          //当队列为空同时没有被关闭时，会调用wait()方法暂时处于等待状态，当有新的任务时，会被唤醒。
          while (queue.isEmpty() && newTasksMayBeScheduled)   
                queue.wait();
          if (queue.isEmpty())
             break;    //当被唤醒后都没有任务时，就会结束循环，也就是结束工作线程
                      ...
}
````

`newTasksMayBeScheduled`
是标记当前定时器是否关闭，当它为false时，表示已经不会再有新的任务到来，也就是关闭，可以通过调用cancel()方法来关闭它的工作线程：

````java
public void cancel() {
    synchronized(queue) {
        thread.newTasksMayBeScheduled = false;
        queue.clear();
        queue.notify();  //唤醒wait使得工作线程结束
    }
}
````

使用完成后，调用Timer的cancel()方法以正常退出程序：

````java
public static void main(String[] args) {
    Timer timer = new Timer();
    timer.schedule(new TimerTask() {
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
            timer.cancel();  //结束
        }
    }, 1000);
}
````

### 7.1.10.守护线程

其他所有的非守护线程结束之后，守护线程自动结束，Java中所有的线程都执行完毕后，守护线程自动结束，因此守护线程不适合进行IO操作，只适合打打杂：

````java
public static void m1() throws InterruptedException {
    Thread t = new Thread(() -> {
        while (true) {
            try {
                System.out.println("程序正常运行中...");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    });
    //设置为守护线程（必须在开始之前，中途是不允许转换的）
    t.setDaemon(true);
    t.start();
    Thread.sleep(4000);
}
````

在守护线程中产生的新线程也是守护的：

````java
public static void m2() throws InterruptedException {
    Thread t = new Thread(() -> {
        Thread it = new Thread(() -> {
            while (true) {
                try {
                    System.out.println("程序正常运行中...");
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        it.start();
    });
    //设置为守护线程（必须在开始之前，中途是不允许转换的）
    t.setDaemon(true);
    t.start();
    Thread.sleep(5000);
}
````

### 7.1.11.再谈集合类

集合类中有一个东西是Java8新增的 `Spliterator` 接口，翻译过来就是：可拆分迭代器（Splitable
Iterator）和Iterator一样，用于遍历数据源中的元素，但它是为了并行执行而设计的。

并行流，其实就是一个多线程执行的流，通过默认的 `ForkJoinPool` 实现，它可以提高多线程任务的速度：

````java
/**
 * main -> 3
 * main -> 9
 * main -> 0
 * main -> 6
 * ForkJoinPool.commonPool-worker-2 -> 1
 * ForkJoinPool.commonPool-worker-1 -> 5
 * ForkJoinPool.commonPool-worker-2 -> 2
 * ForkJoinPool.commonPool-worker-3 -> 4
 * ForkJoinPool.commonPool-worker-1 -> 4
 * ------------------------------------------
 * forEach操作的顺序，并不是我们实际List中的顺序，同时每次打印也是不同的线程在执行
 */
public static void m1() {
    List<Integer> list = new ArrayList<>(Arrays.asList(1, 4, 5, 2, 9, 3, 6, 0));
    list
            .parallelStream()    //获得并行流
            .forEach(i -> System.out.println(Thread.currentThread().getName() + " -> " + i));
}
````

可以通过调用 `forEachOrdered()` 来使用单线程维持原本的顺序：

````java
/**
 * ForkJoinPool.commonPool-worker-6 -> 1
 * ForkJoinPool.commonPool-worker-2 -> 4
 * ForkJoinPool.commonPool-worker-2 -> 5
 * ForkJoinPool.commonPool-worker-2 -> 2
 * ForkJoinPool.commonPool-worker-2 -> 9
 * ForkJoinPool.commonPool-worker-2 -> 3
 * ForkJoinPool.commonPool-worker-2 -> 6
 * ForkJoinPool.commonPool-worker-2 -> 0
 * ----------
 * forEachOrdered操作的顺序，并不是我们实际List中的顺序，同时每次打印也是不同的线程在执行
 */
public static void m2() {
    List<Integer> list = new ArrayList<>(Arrays.asList(1, 4, 5, 2, 9, 3, 6, 0));
    list
            .parallelStream()    //获得并行流
            .forEachOrdered(i -> System.out.println(Thread.currentThread().getName() + " -> " + i));
}
````

### 7.1.12.生产者与消费者

题目：所谓的生产者消费者模型，就是生产者在不断的生产，消费者也在不断的消费。消费者消费的产品是生产者生产的，这就必然存在一个中间容器，把容器想象成是一个货架，当货架空的时候，生产者要生产产品，此时消费者在等待生产者往货架上生产产品，而当货架有货物的时候，消费者可以从货架上拿走商品，生产者此时等待货架出现空位，进而补货，这样不断的循环。

通过多线程编程，来模拟一个餐厅的2个厨师和3个顾客，假设厨师炒出一个菜的时间为3秒，顾客吃掉菜品的时间为4秒。

````java
/**
 * @author cola1213
 * @date 2024/12/3 16:23
 * @description 7.1.12.生产者与消费者
 * 一个餐厅的2个厨师和3个顾客，假设厨师炒出一个菜的时间为3秒，顾客吃掉菜品的时间为4秒。
 */
public class ProducerConsumer {
    public static void main(String[] args) {
        Chef chef01 = new Chef("Adam");
        Chef chef02 = new Chef("Bob");

        Customer customer1 = new Customer("nicky");
        Customer customer2 = new Customer("maria");
        Customer customer3 = new Customer("david");

        new Thread(() -> {
            while (true) {
                try {
                    chef01.cook("fish");
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();

        new Thread(() -> {
            while (true) {
                try {
                    chef02.cook("chicken");
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();

        new Thread(() -> {
            while (true) {
                try {
                    customer1.eat();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();

        new Thread(() -> {
            while (true) {
                try {
                    customer2.eat();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();

        new Thread(() -> {
            while (true) {
                try {
                    customer3.eat();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();
    }

    private static final Object lock = new Object();
    private static List<String> list = new ArrayList<>();

    // 厨师
    static class Chef {
        private String name;

        public Chef(String name) {
            this.name = name;
        }

        public void cook(String foodName) throws InterruptedException {
            synchronized (lock) {
                while (list.size() >= 5) {  // 假设最多存放5个菜品
                    lock.wait();  // 等待消费者消费，避免生产过多
                }
                list.add(foodName);
                System.out.println("厨师: " + this.name + " 炒的菜是：" + foodName + " ，目前还有： " + list.size() + " 道菜");
                lock.notifyAll();  // 通知消费者可以开始吃了
                Thread.sleep(3000);
            }
        }
    }

    // 消费者
    static class Customer {

        private String name;

        public Customer(String name) {
            this.name = name;
        }

        public void eat() throws InterruptedException {
            synchronized (lock) {
                while (list.size() <= 0) {
                    lock.wait();  // 等待生产者生产菜品
                }
                System.out.println(name + " 吃到了：" + list.remove(0) + " ，还有 " + list.size() + " 道菜");
                lock.notifyAll();  // 通知生产者可以继续生产
                Thread.sleep(4000);
            }
        }

    }
}
````

## 7.2.反射

反射就是在运行状态中，对于任意一个类，都能够知道这个类所有的属性和方法，对于任意一个对象，都能调用它的任意一个方法和属性。这种
**动态获取信息及动态调用对象方法**的功能叫Java的反射机制。

### 7.2.1.Java类加载机制

在学习Java的反射机制之前，需要先了解一下类的加载机制：

<img src="https://oss.itbaima.cn/internal/markdown/2022/10/04/vZ4onhuJWcALHNP.png" alt="类加载机制">

在程序启动时，JVM会将一部分类（class文件）通过 `ClassLoader`
加载（并不是所有的类都会在一开始加载）。在加载过程中，会将类的信息提取出来（存放在元空间中，JDK1.8之前存放在永久代），同时也会生成一
**个Class对象存放在内存（堆内存）**，注意此Class对象只会存在一个，与加载的类唯一对应！

### 7.2.2.Class类详解

反射机制是利用存放在堆内存的 class 对象获取元空间中的类信息：

- Class 对象本身存储在堆内存中，但它引用的是元空间中的类的元数据（类的结构信息）
- 元空间中存储的是类的 结构，而不是类的 实例数据，实例数据（如对象的字段值）存储在堆内存中的实例对象中

Class 类的实例可以通过以下几种方式获取：

````java
public static void m1() throws ClassNotFoundException {
    //使用class关键字，通过类名获取
    Class<String> clazz = String.class;
    //使用Class类静态方法forName()，通过包名.类名获取，注意返回值是Class<?>
    Class<?> clazz2 = Class.forName("java.lang.String");
    //通过实例对象获取
    Class<?> clazz3 = new String("cpdd").getClass();

    System.out.println(clazz == clazz2);//true
    System.out.println(clazz == clazz3);//true
}
````

在JVM中每个类始终只存在一个Class对象，无论通过什么方法获取，都是一样的。

基本数据类型也有对应的Class对象（反射操作可能需要用到），不仅可以通过class关键字获取，其实本质上是定义在对应的包装类中的：

````java
/**
 * The {@code Class} instance representing the primitive type
 * {@code int}.
 *
 * @since   JDK1.1
 */
@SuppressWarnings("unchecked")
public static final Class<Integer>  TYPE = (Class<Integer>) Class.getPrimitiveClass("int");

/*
 * Return the Virtual Machine's Class object for the named
 * primitive type
 */
static native Class<?> getPrimitiveClass(String name);   //C++实现，并非Java定义
````

包装类型的Class对象并不是基本类型Class对象。

### 7.2.3.Class对象与多态

一般，使用 `instanceof` 进行类型比较：

````java
public static void m1() {
    String str = "";
    System.out.println(str instanceof String);
}
````

或者：

````java
public static void m2() {
    String str = "";
    System.out.println(str.getClass() == String.class);   //直接判断是否为这个类型
}
````

如果需要判断是否为子类或是接口/抽象类的实现，可以使用 `asSubClass()` ：

````java
public static void m3() {
    Integer i = 10;
    i.getClass().asSubclass(Number.class);   //当Integer不是Number的子类时，会产生异常
}
````

通过 `getSuperclass()` 可以获取到父类的Class对象：

````java
public static void m4() {
    Integer i = 10;
    System.out.println(i.getClass().getSuperclass());
}
````

### 7.2.4.创建类对象
