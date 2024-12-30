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