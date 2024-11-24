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

在Java中，无论是小数还是整数，都有符号（和C语言不同，C语言有无符号数）所以，首位就作为符号位。

#### 2.2.2.整数类型

在Java中，整数类型包括以下几个：

* byte 字节型 （8个bit，也就是1个字节）范围：-128~+127
* short 短整形（16个bit，也就是2个字节）范围：-32768~+32767
* int 整形（32个bit，也就是4个字节）最常用的类型：-2147483648 ~ +2147483647
* long 长整形（64个bit，也就是8个字节）范围：-9223372036854775808 ~ +9223372036854775807

其实这几种变量都可以正常表示整数：

```java
public static void main(String[] args) {
    short a = 10;
    System.out.println(a);
}
```

因为都可以表示整数，所以可以将小的整数类型值传递给大的整数类型：

```java
public static void main(String[] args) {
    short a = 10;
    int b = a;   //小的类型可以直接传递给表示范围更大的类型
    System.out.println(b);
}
```

反之会出现报错：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/16/NLZlDgxz3ci5Idr.png" alt="整数类型大到小报错">

这是由于在将小的整数类型传递给大的整数类型时发生了**隐式类型转换**
，只要是从存储范围小的类型到存储范围大的类型，都支持隐式类型转换，它可以自动将某种类型的值，转换为另一种类型，比如上面就是将short类型的值转换为了int类型的值。

隐式类型转换不仅可以发生在整数之间，也可以是其他基本数据类型之间，后面会逐步介绍。

实际上为变量赋一个常量数值时，也发生了隐式类型转换，比如：

```java
public static void main(String[] args) {
   byte b = 10;    //这里的整数常量10，实际上默认是int类型，但是由于正好在对应类型可以表示的范围内，所以直接转换为byte类型的值
}
```

由于直接编写的整数常量值默认为 `int` ，需要特别注意一下，比如下面这种情况：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/16/76GgjWYz4DPBy1p.png" alt="int类型整数报错">

按照 `long` 类型的规定，实际上是可以表示这么大的数字的，但直接在代码中写的的常量数字，默认情况下是 `int`
类型。如果需要将其表示为一个long类型的常量数字，那么需要在后面添加大写或是小写的L才可以。

```java
public static void main(String[] args) {
    long a = 922337203685477580L;   //这样就可以正常编译通过了
}
```

针对于这种很长的数字，为了提升辨识度，可以使用下划线分割每一位：

```java
public static void main(String[] args) {
   int a = 1_000_000;    //当然这里依然表示的是1000000，没什么区别，但是辨识度会更高
}
```

#### 2.2.3.浮点类型

在Java中也可以轻松地使用小数：

* float：单精度浮点型 （32bit，4字节）
* double：双精度浮点型（64bit，8字节），默认的小数类型常量

可以直接创建浮点类型的变量：

```java
public static void main(String[] args) {
    double a = 10.5, b = 66;   //整数类型常量也可以隐式转换到浮点类型
}
```

由于 `float` 类型的精度不如 `double` ，如果直接给其赋一个 `double` 类型的值，会直接出现错误。

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/x7bOzyIacpDowKk.png" alt="float错误">

使用 `float` 需要在后面添加大写或小写的F来表示这是一个float类型的常量值：

```java
public static void main(String[] args) {
    float f = 9.9F;
    double a = f;    //隐式类型转换，由于double精度更大，所以可以直接接收float类型的值
    System.out.println(a);
}
```

只不过由于精度问题，最后的打印结果：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/1JqHY2so6Qwz4WX.png" alt="精度问题">

隐式类型转换规则：byte→short(char)→int→long→float→double

#### 2.2.4.字符类型

`char` （字符类型，6个bit，2字节，不带符号，范围是0 ~ 65535），可以表示计算机中的任意一个字符（包括中文、英文、标点等一切可以显示出来的字符）。

实际上每个数字在计算机中都会对应一个字符：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/Z7AiBPNO6ylML4z.png" alt="ASCII表">

比如我们的英文字母A要展示出来，那就是一个字符的形式，而其对应的ASCII码值为65，所以说当char为65时，打印出来的结果就是大写的字母A了：

```java
public static void main(String[] args) {
    char c = 65;
    System.out.println(c);// 打印出来的结果为：A
}
```

或者也可以直接写一个字符常量值赋值：

```java
public static void main(String[] args) {
    char c = 'A';    //字符常量值需要使用单引号囊括，并且内部只能有一个字符
    System.out.println(c);
}
```

不过，`ASCII` 表中只有 128 个字符，只包含了一些基础的字符，那么多中文字符（差不多有6000多个），用ASCII编码表肯定是没办法全部表示的，但如果现在需要在电脑中使用中文。这时，就需要扩展字符集了。

:::details 编码

可以使用两个甚至多个字节来表示一个中文字符，这样能够表示的数量就大大增加了，GB2132方案规定当连续出现两个大于127的字节时（注意不考虑符号位，此时相当于是第一个bit位一直为1了），表示这是一个中文字符（所以为什么常常有人说一个英文字符占一字节，一个中文字符占两个字节），这样就可以表示出超过7000种字符了，不仅仅是中文，甚至中文标点、数学符号等，都可以被正确的表示出来。

不过这样能够表示的内容还是不太够，除了那些常见的汉字之外，还有很多的生僻字，比如龘、錕、釿、拷这类的汉字，后来干脆直接只要第一个字节大于127，就表示这是一个汉字的开始，无论下一个字节是什么内容（甚至原来的128个字符也被编到新的表中），这就是Windows至今一直在使用的默认GBK编码格式。

虽然这种编码方式能够很好的解决中文无法表示的问题，但是由于全球还有很多很多的国家以及很多很多种语言，所以最终目标是能够创造一种可以表示全球所有字符的编码方式，整个世界都使用同一种编码格式，这样就可以同时表示全球的语言了。所以这时就出现了一个叫做**ISO的（国际标准化组织）组织，来定义一套编码方案来解决所有国家的编码问题，这个新的编码方案就叫做Unicode**（准确的说应该是规定的字符集，包含了几乎全世界所有语言的字符），规定每个字符必须使用两个字节，即用16个bit位来表示所有的字符（也就是说原来的那128个字符也要强行用两位来表示）

但是这样的话实际上是很浪费资源的，因为这样很多字符都不会用到两字节来保存，肯定不能直接就这样去表示，这会导致某些字符浪费了很多空间，需要一个更加好用的具体的字符编码方式。所以最后就有了UTF-8编码格式（它是Unicode字符集的一个编码规则），区分每个字符的开始是根据字符的高位字节来区分的，比如用一个字节表示的字符，第一个字节高位以“0”开头；用两个字节表示的字符，第一个字节的高位为以“110”开头，后面一个字节以“10开头”；用三个字节表示的字符，第一个字节以“1110”开头，后面俩字节以“10”开头；用四个字节表示的字符，第一个字节以“11110”开头，后面的三个字节以“10”开头：

:::

#### 2.2.5.布尔类型

