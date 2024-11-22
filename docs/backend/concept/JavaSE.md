# JavaSE

:::details 学习参考资料：

- [JavaSE 教程](https://www.bilibili.com/video/BV1YP4y1o75f)

:::

## 1.走进Java语言

一般来说，编程语言分为两大类：

- **编译型语言**：
  需要先编译为计算机可以直接执行的命令才可以运行。优点是计算机直接运行，性能高；缺点是与平台密切相关，在一种操作系统上编译的程序，无法在其他非同类操作系统上运行，比如Windows下的exe程序在Mac上就无法运行。
- **解释型语言**：
  只需要通过解释器代为执行即可，不需要进行编译。优点是可以跨平台，因为解释是解释器的事情，只需要在各个平台上安装对应的解释器，代码不需要任何修改就可以直接运行；缺点是需要依靠解释器解释执行，效率肯定没直接编译成机器指令运行的快，并且会产生额外的资源占用。

<img alt="java图标" src="https://oss.itbaima.cn/internal/markdown/2022/09/16/phfUjyuXLIbR3gJ.png">

:::info slogan
Write Once, Run Anywhere.
:::

这是Java语言的标语，它的目标很明确：**一次编写，到处运行**，它旨在打破平台的限制，让Java语言可以运行在任何平台上，并且不需要重新编译，实现跨平台运行。

实际上Java程序也是需要进行编译才可以运行的，这一点与C语言是一样的，Java程序编译之后会变成 `.class` 结尾的二进制文件：

<img alt="编译过程" src="https://oss.itbaima.cn/internal/markdown/2022/09/16/5z2OWQb3B9AhwSZ.png">

不过不同的是，这种二进制文件计算机并不能直接运行，而是需要交给JVM（Java虚拟机）执行:

<img alt="JVM运行class文件" src="https://oss.itbaima.cn/internal/markdown/2022/09/16/6HnkcSIfPdVZEpM.png">

**JVM** 可以将编译完成的 `.class` 文件直接交给 JVM 去运行，而程序中要做的事情，也都是由它来告诉计算机该如何去执行。

在不同的操作系统下，都有着对应的JVM实现，我们只需要安装好就可以了，而我们程序员只需要将Java程序编译为.class文件就可以直接交给JVM运行，无论是什么操作系统，JVM都采用的同一套标准读取和执行.class文件，所以说我们编译之后，在任何平台都可以运行，实现跨平台。
由于Java又需要编译同时还需要依靠JVM解释执行，所以说Java既是编译型语言，也是解释型语言。
Java分为很多个版本：

- JavaSE： 是我们本教程的主要学习目标，它是标准版的Java，也是整个Java的最核心内容，在开始后续课程之前，这是我们不得不越过的一道坎，这个阶段一定要认真扎实地将Java学好，不然到了后面的高级部分，会很头疼。
- JavaME： 微缩版Java，已经基本没人用了。
- JavaEE： 企业级Java，比如网站开发，它是JavaSE阶段之后的主要学习方向。

## 2.面向过程编程

### 2.1.Java程序基础

从最基本的Java程序基础开始

#### 2.1.1.程序代码基本结构

示例代码如下：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!!!!");
    }
}
```

这段代码实现的功能很简单，就是将 Hello World 输出到控制台。

目前只需要记住固定的模式即可，创建的源文件的名称为 `Main.java` ，然后编写的代码在第一行：

```java
public class Main {
  
}
```

:::warning 注意事项：

- 区分大小写
- 括号成对出现

:::

整个 Java 程序的入口点，称为`主方法`，主方法的模式是固定的的：

```java
public static void main(String[] args) {
    
}
```

任何想要的操作，可以编写在主方法中，比如先打印Hello World!，然后再打印YYDS!到控制台。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        System.out.println("YYDS!");
    }
}
```

分号代表换行。

#### 2.1.2.注释

在编写代码的时候，需要标记这段代码是什么意思，写注释说明，分别有如下的注释方式：

```java:line-numbers
/**
 * 文档注释
 */
public class Main {
    public static void main(String[] args) {
        // 单行注释
        System.out.println("Hello World!!!!");
        /*
        多行代码注释
        line 1
        line 2
         */
        System.out.println("java is the best language ever!!!!!");
    }
}
```

#### 2.1.3.变量与常量

`变量`，代表一个具体的值，并且变量的值是可以发生变化的，声明一个变量的格式如下：

```java
[数据类型] [变量名称];
```

- 数据类型：代表这个变量名称的类型，是整数(`int`)、小数(`double`)等
- 名称：随便取，但需要注意以下要求
    - 标识符可以由大小写字母、数字、下划线(_)和美元符号($)组成，但是不能以数字开头。
    - 变量不能重复定义，大小写敏感，比如A和a就是两个不同的变量。
    - 不能有空格、@、#、+、-、/ 等符号。
    - 应该使用有意义的名称，达到见名知意的目的（一般我们采用英文单词），最好以小写字母开头。
    - 不可以是 true 和 false。
    - 不能与Java语言的关键字或是基本数据类型重名，关键字列表如下：
      <img src="https://oss.itbaima.cn/internal/markdown/2023/03/01/I6nCh49qzyvoZBm.png">

没必要刻意去进行记忆，在学习的过程中逐步认识到这些关键字。

如果需要定义一个变量 `a` ，可以：

```java
public static void main(String[] args) {
    int a;    //声明一个整数类型变量a
    a = 10;   //使用时再赋值
}
```

或者

```java
public static void main(String[] args) {
    int a = 10;   //直接初始变量并赋值为10
}
```

还可以一次定义多个变量：

```java
public static void main(String[] args) {
    int a, b;   //定义变量a和变量b，中间使用逗号隔开就行了
}
```

或者

```java
public static void main(String[] args) {
    int a;   //分两句进行声明
    int b;
}
```

变量的值也可以在中途进行修改：

```java
public static void main(String[] args) {
    int a = 666;
    a = 777;
    System.out.println(a);   //这里打印得到的值就是777了
}
```

变量的值也可以直接指定为其他变量的值：

```java
public static void main(String[] args) {
    int a = 10;
    int b = a;   //直接让b等于a，那么a的值就会给到b
    System.out.println(b);   //这里输出的就是10了
}
```

有时候希望变量的值一直保持不变，可以将其指定为常量(`final`)，这里介绍Java中第一个需要认识的关键字：

```java
public static void main(String[] args) {
    final int a = 666;   //在变量前面添加final关键字，表示这是一个常量
    a = 777;    //常量的值不允许发生修改
}
```

至此，Java的基础语法部分介绍完毕，下一部分将开始介绍Java中的几大基本数据类型。

### 2.2.基本数据类型

程序中可能需要各种各样的数据，比如整数、小数、字符等等，这一部分属于Java中的八大基本数据类型。

#### 2.2.1.计算机中的二进制表示

但是先需要了解，在计算机中是如何去表示数据的呢？

在计算机中，所有的内容都是**二进制**形式表示。因为计算机是电子的，电平信号只有高位和低位，可以暂且理解为通电和不通电，高电平代表1，低电平代表0，由于只有0和1，因此只能使用2进制表示数字！

