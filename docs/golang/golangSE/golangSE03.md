# golang语言特性

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)

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

## 2、变量

在 go 语言中，声明变量的一般形式是使用 `var` 关键字，有四种方式：

````go
func main() {
	// 方式一：声明一个变量，默认的值是0
	var a int
	fmt.Println("a = ", a)
	fmt.Printf("tyoe of a = %T\n", a)

	// 方式二：声明一个变量，初始化一个值
	var b int = 100
	fmt.Println("b = ", b)
	fmt.Printf("tyoe of b = %T\n", b)

	// 方法三：初始化的时候, 省去数据类型，通过值自动匹配当前的变量的数据类型
	var c = 100
	fmt.Println("c = ", c)
	fmt.Printf("tyoe of c = %T\n", c)

	// 方法四：(常用) 省去var关键字，直接自动匹配
	d := 100
	fmt.Println("d = ", d)
	fmt.Printf("tyoe of d = %T\n", d)
}
````

常见的格式化占位符：

- `%T` 会输出传入变量的 数据类型
- 