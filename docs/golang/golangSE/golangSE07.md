# 控制

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)
- [Golang中文学习文档站](https://golang.halfiisland.com/)

:::

## 1、输入输出

第一个入门的案例就是输出一个字符串，这一节就来讲一下在 Go 中如何进行输入输出：

````go
package main

import "fmt"

func main() {
   fmt.Println("Hello World！")
}
````

### 1.1.文件描述符

在 go 的 os 包下：

````go
// Stdin, Stdout, and Stderr are open Files pointing to the standard input,
// standard output, and standard error file descriptors.
//
// Note that the Go runtime writes to standard error for panics and crashes;
// closing Stderr may cause those messages to go elsewhere, perhaps
// to a file opened later.
var (
	Stdin  = NewFile(uintptr(syscall.Stdin), "/dev/stdin")
	Stdout = NewFile(uintptr(syscall.Stdout), "/dev/stdout")
	Stderr = NewFile(uintptr(syscall.Stderr), "/dev/stderr")
)
````

有三个外暴露的文件描述符，分别是：

- `os.Stdin`：标准输入
- `os.Stdout`：标准输出
- `os.Stderr`：标准错误

Go 中的输入输出都离不开它们。

### 1.2.输出

在 Go 中输出有很多中方法：

- stdout

  因为标准输出本身就是一个文件，所以你可以直接将字符串写入到标准输出中

````go
func main() {
  os.Stdout.WriteString("hello world!")
}
````

- print

  Go 有两个内置的函数print，println，他们会将参数输出到标准错误中，仅做调试用，一般不推荐使用。

````go
func main() {
  print("hello world!\n")
  println("hello world")
}
````

- fmt

  最常见的用法是使用fmt包，它提供了fmt.Println函数，该函数默认会将参数输出到标准输出中。

  它的参数支持任意类型，如果类型实现了String接口也会调用String方法来获取其字符串表现形式，所以它输出的内容可读性比较高，适用于大部分情况，不过由于内部用到了反射，在性能敏感的场景不建议大量使用。

````go
func main() {
  fmt.Println("hello world!")
}
````

- bufio

  先将数据写入到内存中，积累到了一定阈值再输出到指定的Writer中，默认缓冲区大小是4KB。

  在文件 IO，网络 IO 的时候建议使用这个包。

````go
func main() {
  writer := bufio.NewWriter(os.Stdout)
  defer writer.Flush()
  writer.WriteString("hello world!")
}
````

也可以把它和fmt包结合起来用：

````go
func main() {
  writer := bufio.NewWriter(os.Stdout)
  defer writer.Flush()
  fmt.Fprintln(writer, "hello world!")
}
````

### 1.3.输入

- read

  直接读文件，读取输入内容，不推荐使用，很麻烦

````go
func main() {
  var buf [1024]byte
  n, _ := os.Stdin.Read(buf[:])
  os.Stdout.Write(buf[:n])
}
````

- fmt

  使用fmt包提供的几个函数

````go
// 扫描从os.Stdin读入的文本，根据空格分隔，换行也被当作空格
func Scan(a ...any) (n int, err error)

// 与Scan类似，但是遇到换行停止扫描
func Scanln(a ...any) (n int, err error)

// 根据格式化的字符串扫描
func Scanf(format string, a ...any) (n int, err error)
````

- bufio

  有大量输入需要读取的时候

````go
func main() {
    reader := bufio.NewReader(os.Stdin)
    var a, b int
    fmt.Fscanln(reader, &a, &b)
    fmt.Printf("%d + %d = %d\n", a, b, a+b)
}
````

- scanner

  bufio.Scanner与bufio.Reader类似，不过它是按行读取的。

````go
func main() {
  scanner := bufio.NewScanner(os.Stdin)
  for scanner.Scan() {
    line := scanner.Text()
    if line == "exit" {
      break
    }
    fmt.Println("scan", line)
  }
}
````

### 1.4.格式化

Go 中的格式化输出功能基本上由 `fmt.Printf` 函数提供：

````go
func main() {
  fmt.Printf("hello world, %s!", "jack")
}
````

下面是 Go 目前所有的格式化动词:

| 0  | 格式化   | 描述                                      | 接收类型 |
|----|-------|-----------------------------------------|------|
| 1  | `%%`  | 输出百分号% 任意                               |
| 2  | `%s`  | 输出string/[] byte值 string,[] byte        |
| 3  | `%q`  | 格式化字符串，输出的字符串两端有双引号""    string,[] byte |
| 4  | `%d`  | 输出十进制整型值 整型                             |
| 5  | `%f`  | 输出浮点数 浮点                                |
| 6  | `%e`  | 输出科学计数法形式 ,也可以用于复数 浮点                   |
| 7  | `%E`  | 与%e相同 浮点                                |
| 8  | `%g`  | 根据实际情况判断输出%f或者%e,会去掉多余的 0 浮点            |
| 9  | `%b`  | 输出整型的二进制表现形式 数字                         |
| 10 | `%#b` | 输出二进制完整的表现形式 数字                         |
| 11 | `%o`  | 输出整型的八进制表示 整型                           |
| 12 | `%#o` | 输出整型的完整八进制表示 整型                         |
| 13 | `%x`  | 输出整型的小写十六进制表示 数字                        |
| 14 | `%#x` | 输出整型的完整小写十六进制表示 数字                      |
| 15 | `%X`  | 输出整型的大写十六进制表示 数字                        |
| 16 | `%#X` | 输出整型的完整大写十六进制表示 数字                      |
| 17 | `%v`  | 输出值原本的形式，多用于数据结构的输出 任意                  |
| 18 | `%+v` | 输出结构体时将加上字段名 任意                         |
| 19 | `%#v` | 输出完整 Go 语法格式的值 任意                       |
| 20 | `%t`  | 输出布尔值 布尔                                |
| 21 | `%T`  | 输出值对应的 Go 语言类型值 任意                      |
| 22 | `%c`  | 输出 Unicode 码对应的字符 int32                 |
| 23 | `%U`  | 输出字符对应的 Unicode 码 rune,byte             |
| 24 | `%p`  | 输出指针所指向的地址 指针                           |

## 2、条件控制

在 Go 中，条件控制语句总共有三种 `if` ，`switch` ，`select`。

`select` 相对前两者而言比较特殊，本节不会讲解，将会留到并发那一节再做介绍。

### 2.1.if else

if else 至多两个判断分支，语句格式如下：

````go
if expression {

}
````

或者

````go
if expression {

}else {

}
````

`expression` 必须是一个布尔表达式，即结果要么为真要么为假，必须是一个布尔值：

````go
func main() {
   a, b := 1, 2
   if a > b {
      b++
   } else {
      a++
   }
}
````

也可以把表达式写的更复杂些，必要时为了提高可读性，应当使用括号来显式的表示谁应该优先计算。

````go
func main() {
   a, b := 1, 2
    if a<<1%100+3 > b*100/20+6 { // (a<<1%100)+3 > (b*100/20)+6
      b++
   } else {
      a++
   }
}
````

同时 `if` 语句也可以包含一些简单的语句：

````go
func main() {
  if x := 1 + 1; x > 2 {
    fmt.Println(x)
  }
}
````

### 2.2.else if

`else if` 语句可以在 `if else` 的基础上创建更多的判断分支，语句格式如下：

````go
if expression1 {

}else if expression2 {

}else if expression3 {

}else {

}
````

在执行的过程中每一个表达式的判断是从左到右，整个if语句的判断是从上到下 。一个根据成绩打分的例子如下，第一种写法:

````go
func main() {
   score := 90
   var ans string
   if score == 100 {
      ans = "S"
   } else if score >= 90 && score < 100 {
      ans = "A"
   } else if score >= 80 && score < 90 {
      ans = "B"
   } else if score >= 70 && score < 80 {
      ans = "C"
   } else if score >= 60 && score < 70 {
      ans = "E"
   } else if score >= 0 && score < 60 {
      ans = "F"
   } else {
      ans = "nil"
   }
   fmt.Println(ans)
}
````

第二种写法利用了if语句是从上到下的判断的前提，所以代码要更简洁些:

````go
func main() {
  score := 90
  var ans string
  if score >= 0 && score < 60 {
    ans = "F"
  } else if score < 70 {
    ans = "D"
  } else if score < 80 {
    ans = "C"
  } else if score < 90 {
    ans = "B"
  } else if score < 100 {
    ans = "A"
  } else if score == 100 {
    ans = "S"
    }else {
        ans = "nil"
    }
  fmt.Println(ans)
}
````

### 2.3.switch

`switch` 语句也是一种多分支的判断语句，语句格式如下：

````go
switch expr {
  case case1:
    statement1
  case case2:
    statement2
  default:
    default statement
}
````

一个简单的例子如下：

````go
func main() {
   str := "a"
   switch str {
   case "a":
      str += "a"
      str += "c"
   case "b":
      str += "bb"
      str += "aaaa"
   default: // 当所有case都不匹配后，就会执行default分支
      str += "CCCC"
   }
   fmt.Println(str)
}
````

还可以在表达式之前编写一些简单语句，例如声明新变量：

````go
func main() {
  switch num := f(); { // 等价于 switch num := f(); true {
  case num >= 0 && num <= 1:
    num++
  case num > 1:
    num--
    fallthrough
  case num < 0:
    num += num
  }
}

func f() int {
  return 1
}
````

switch语句也可以没有入口处的表达式：

````go
func main() {
   num := 2
   switch { // 等价于 switch true {
   case num >= 0 && num <= 1:
      num++
   case num > 1:
      num--
   case num < 0:
      num *= num
   }
   fmt.Println(num)
}
````

通过fallthrough关键字来继续执行相邻的下一个分支：

````go
func main() {
   num := 2
   switch {
   case num >= 0 && num <= 1:
      num++
   case num > 1:
      num--
      fallthrough // 执行完该分支后，会继续执行下一个分支
   case num < 0:
      num += num
   }
   fmt.Println(num)
}
````

### 2.4.label

给一个代码块打上标签，可以是 `goto` ， `break` ， `continue` 的目标：

````go
func main() {
  A:
    a := 1
  B:
    b := 2
}
````

### 2.5.goto

`goto` 将控制权传递给在同一函数中对应标签的语句：

````go
func main() {
   a := 1
   if a == 1 {
      goto A
   } else {
      fmt.Println("b")
   }
A:
   fmt.Println("a")
}
````

在实际应用中 `goto` 用的很少，跳来跳去的很降低代码可读性，性能消耗也是一个问题。

## 3、循环控制

在 Go 中，有仅有一种循环语句：`for` ，Go 抛弃了 `while` 语句，for 语句可以被当作 while 来使用。

### 3.1.for

语句格式如下：

````go
for init statement; expression; post statement {
  execute statement
}
````

当只保留循环条件时，就变成了while：

````go
for expression {
  execute statement
}
````

这是一个死循环，永远也不会退出：

````go
for {
  execute statement
}
````

### 3.2.for range

`for range` 可以更加方便的遍历一些可迭代的数据结构，如数组，切片，字符串，映射表，通道。语句格式如下：

````go
for index, value := range iterable {
  // body
}
````

`index` 为可迭代数据结构的索引，`value` 则是对应索引下的值。例如，使用for range遍历一个字符串：

````go
func main() {
   sequence := "hello world"
   for index, value := range sequence {
      fmt.Println(index, value)
   }
}
````

也可以迭代一个整型值，字面量，常量，变量：

````go
for i := range 10 {
    fmt.Println(i)
}

n := 10
for i := range n {
    fmt.Println(i)
}

const n = 10
for i := range n {
  fmt.Println(i)
}
````

### 3.3.break

`break` 关键字会终止最内层的 for 循环，结合标签一起使用可以达到终止外层循环的效果：

````go
func main() {
  for i := 0; i < 10; i++ {
    for j := 0; j < 10; j++ {
      if i <= j {
        break
      }
      fmt.Println(i, j)
    }
  }
}
````

### 3.4.continue

`continue` 关键字会跳过最内层循环的本次迭代，直接进入下一次迭代，结合标签使用可以达到跳过外层循环的效果：

````go
func main() {
  for i := 0; i < 10; i++ {
    for j := 0; j < 10; j++ {
      if i > j {
        continue
      }
      fmt.Println(i, j)
    }
  }
}
````