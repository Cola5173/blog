# golang语言特性

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)
- [Golang中文学习文档站](https://golang.halfiisland.com/)

:::

## 1、main函数

学任何语言都绕不开第一个 hello world，比如：

````go
package main

import "fmt"

func main() {
	// hello world....
	fmt.Println("hello world")
}
````

在终端中运行：

````cmd
PS D:\03-codes\03_go\goStudy> go run .\main\hello.go
hello world
````

`go run` 表示 直接编译 go 语言并执行应用程序，一步完成.

:::warning ❗注意：
PS D:\03-codes\03_go\goStudy\chapte03> go run .\hello.go

package command-line-arguments is not a main package
:::

Go 程序中的 main 函数只能位于 main 包中❗❗❗Go 程序需要一个 main 包来作为程序的入口点。

也可以先编译，然后再执行：

````cmd
PS D:\03-codes\03_go\goStudy> go build .\main\hello.go
PS D:\03-codes\03_go\goStudy> .\hello.exe
hello world
````

## 2、包

在 Go 中，程序是通过将包链接在一起来构建的，导入的最基本单位是一个包，而不是.go文件。

包其实就是一个文件夹，英文名 package，包内共享所有变量，常量，以及所有定义的类型，命名风格建议都是小写字母，并且要尽量简短。

### 2.1.可见性

包内共享所有变量，常量，以及所有定义的类型，但对于包外而言并不是这样。Go 语言中，控制可见性的方式，规则如下：

- 名称大写字母开头，即为公有类型/变量/常量
- 名字小写或下划线开头，即为私有类型/变量/常量

比如下面的一个例子，常量MyName就是公开的，而常量mySalary就是私有的：

````go
package example

// 公有
const MyName = "jack"

// 私有
const mySalary = 20_000
````

这个可见性的规则适用于整个 Go 语言的任何地方。

### 2.2.导入

导入一个包就是导入这个包的所有公有的类型/变量/常量，导入的语法就是import加上包名；

````go
package main

import "example"
import "example1"
````

也可以用括号括起来，如果有包名重复了，或者包名比较复杂，也可以给它们起别名：

````go
package main

import (
  e "example"
  e1 "example1"
)
````

当导入包后，想要访问包中的类型时，通过 `名称.标识符` 去访问即可：

````go
package main

import (
  "example"
    "fmt"
)

func main() {
    fmt.Println(example.MyName)
}
````

还有另一种特殊的使用方法就是匿名导入包，匿名导入的包无法被使用，这么做通常是为了加载包下的 `init`
函数，但又不需要用到包中的类型，例如一个常见的场景就是注册数据库驱动：

````go
package main

import (
  e "example"
  _ "mysql-driver"
)
````

:::warning 注意：
Go 中无法进行循环导入，不管是直接的还是间接的

存在循环导入的话将会无法通过编译
:::

### 2.3.内部包

go 中约定，一个包内名为 `internal` 包为内部包，外部包将无法访问内部包中的任何内容，否则的话编译不通过：

````go
/home/user/go/
    src/
        crash/
            bang/              (go code in package bang)
                b.go
        foo/                   (go code in package foo)
            f.go
            bar/               (go code in package bar)
                x.go
            internal/
                baz/           (go code in package baz)
                    z.go
            quux/              (go code in package main)
                y.go
````

`crash` 包无法访问 `baz` 包中的类型。

## 3、注释

Go 支持单行注释和多行注释，注释与内容之间建议隔一个空格：

````go
// 这是main包
package main

// 导入了fmt包
import "fmt"

/*
*
这是启动函数main函数
*/
func main() {
  // 这是一个语句
  fmt.Println("Hello world!")
}
````

## 4、标识符

标识符就是一个名称，用于包命名，函数命名，变量命名等等，命名规则如下：

- 只能由字母，数字，下划线组成
- 只能以字母和下划线开头
- 严格区分大小写
- 不能与任何已存在的标识符重复，即包内唯一的存在
- 不能与 Go 任何内置的关键字冲突

下方列出所有的内置关键字，也可以前往 [参考手册-标识符](https://go.dev/ref/spec#Identifiers) 查看更多细节：

````go
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
````

## 5、运算符

下面是 Go 语言中支持的运算符号的优先级排列，也可以前往 [参考手册-运算符](https://go.dev/ref/spec#Operators) 查看更多细节：

````go
Precedence    Operator
    5             *  /  %  <<  >>  &  &^
    4             +  -  |  ^
    3             ==  !=  <  <=  >  >=
    2             &&
    1             ||
````

需要注意，go 语言中没有选择将 `~` 作为取反运算符，而是复用了 `^` 符号，当两个数字使用 `^` 时，例如 `a^b`
，它就是异或运算符，只对一个数字使用时，例如 `^a` ，那么它就是取反运算符。

go 也支持增强赋值运算符：

````go
a += 1
a /= 2
a &^= 2
````

:::tip 提示：
Go 语言中没有自增与自减运算符，它们被降级为了语句 `statement`，并且规定了只能位于操作数的后方，所以不用再去纠结 `i++` 和
`++i` 这样的问题。

````go
a++ // 正确
++a // 错误
a-- // 正确
````

它们不再具有返回值，因此 `a = b++` 这类语句的写法是错误的。

:::

## 6、字面量

字面量，是“字面意义上“的值。

### 6.1.整型字面量

为了便于阅读，允许使用下划线_来进行数字划分，但是仅允许在前缀符号之后和数字之间使用：

````go
24 // 24
024 // 24
2_4 // 24
0_2_4 // 24
10_000 // 10k
100_000 // 100k
0O24 // 20
0b00 // 0
0x00 // 0
0x0_0 // 0
````

### 6.2.浮点数字面量

通过不同的前缀可以表达不同进制的浮点数：

````go
0.
72.40
072.40       // == 72.40
2.71828
1.e+0
6.67428e-11
1E6
.25
.12345E+5
1_5.         // == 15.0
0.15e+0_2    // == 15.0

0x1p-2       // == 0.25
0x2.p10      // == 2048.0
0x1.Fp+0     // == 1.9375
0X.8p-0      // == 0.5
0X_1FFFP-16  // == 0.1249847412109375
0x15e-2      // == 0x15e - 2 (integer subtraction)
````

### 6.3.复数字面量

````go
0i
0123i         // == 123i
0o123i        // == 0o123 * 1i == 83i
0xabci        // == 0xabc * 1i == 2748i
0.i
2.71828i
1.e+0i
6.67428e-11i
1E6i
.25i
.12345E+5i
0x1p-2i       // == 0x1p-2 * 1i == 0.25i
````

### 6.4.字符字面量

字符字面量必须使用单引号括起来''，Go 中的字符完全兼容utf8：

````go
'a'
'ä'
'你'
'\t'
'\000'
'\007'
'\377'
'\x07'
'\xff'
'\u12e4'
'\U00101234'
````

### 6.5.转义字符

Go 中可用的转义字符：

````go
\a   U+0007 响铃符号
\b   U+0008 回退符号
\f   U+000C 换页符号
\n   U+000A 换行符号
\r   U+000D 回车符号
\t   U+0009 横向制表符号
\v   U+000B 纵向制表符号
\\   U+005C 反斜杠转义
\'   U+0027 单引号转义 (该转义仅在字符内有效)
\"   U+0022 双引号转义 (该转义仅在字符串内有效)
````

### 6.6.字符串字面量

字符串字面量必须使用双引号""括起来或者反引号（反引号字符串不允许转义）：

````go
`abc`                // "abc"
`\n
\n`                  // "\\n\n\\n"
"\n"
"\""                 // `"`
"Hello, world!\n"
"今天天气不错"
"日本語"
"\u65e5本\U00008a9e"
"\xff\u00FF"
````

## 7、函数

Go 中的函数声明方式通过 `func` 关键字：

````go
func main() {
  println(1)
}
````

Go 中的函数有两个不同的点，第一个是参数类型后置：

````go
func Hello(name string) {
  fmt.Println(name)
}
````

第二个不同的点就是多返回值，而且可以带名字:

````go
func Pos() () (x, y float64) {
    ...
}
````

## 8、风格

### 8.1.函数花括号换行

在 Go 中所有的花括号都不应该换行

### 8.2.代码缩进

Go 默认使用 `Tab` 进行缩进，仅在一些特殊情况会使用空格。

### 8.3.代码间隔

Go 中大部分间隔都是有意义的，从某种程度上来说，这也代表了编译器是如何看待你的代码的，例如下方的数学运算:

````go
2*9 + 1/3*2
````

在格式化后，*符号之间的间隔会显得更紧凑，意味着优先进行运算，而+符号附近的间隔则较大，代表着较后进行运算。

### 8.4.花括号省略

在其它语言中的 if 和 for 语句通常可以简写，像下面这样:

````java
for (int i=0; i < 10; i++) printf("%d", i)
````

但在 Go 中不行，可以只写一行，但必须加上花括号:

````go
for i := 0; i < 10; i++ {fmt.Println(i)}
````

### 8.5.三元表达式

Go 中没有三元表达式，所以像下面的代码是无法通过编译的。