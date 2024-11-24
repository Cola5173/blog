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
