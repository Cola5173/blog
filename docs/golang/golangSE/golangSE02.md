# golang语言特性

:::details 参考资料：

- [8小时入门go语言开发](https://www.bilibili.com/video/BV1zu4y187Wb)

:::

## 1、变量定义

### 1.1.变量定义

看下面的例子：

````go
// main 包才能执行函数
func main() {
	// 先定义，再赋值
	var name string
	name = "coco cola" // go 中，声明的变量，必须使用，否则报错：Unused variable 'name'
	fmt.Println(name)

	// 声明变量的时候就赋值
	var name1 string = "pepsi cola"
	fmt.Println(name1)

	// 但是其实，声明的时候，可以省略类型，由赋的值直接推断是什么类型
	var name2 = "diet coke"
	fmt.Println(name2)

	// 短声明符号赋值
	name3 := "zero coke"
	fmt.Println(name3)
}
````

> 如果一个变量定义了，但是没有赋值，那么这个变量的值就是这个类型的 "零值"

### 1.2.全局变量与局部变量

定义在函数体（包括main函数）内的变量都是**局部变量**，定义了就必须使用。

定义在外部的变量就是**全局变量**，可以只定义不使用。

````go
package main

import "fmt"

var userName = "枫枫知道" // 可以不使用

func main() {
  // var 变量名 类型 = "变量值"
  var name = "枫枫"
  // 在函数体内定义的变量，必须要使用
  fmt.Println(name)
}
````

### 1.3.定义多个变量

````go
package main

func main() {
  var name1, name2, name3 string // 定义多个变量

  var a1, a2 = "枫枫", "知道" // 定义多个变量并赋值
  
  a3, a4 := "枫枫", "知道" // 简短定义多个变量并赋值
}

var (
  name     string = "枫枫"
  userName        = "枫枫知道"
)
````

### 1.4.定义常量

**常量**在定义的时候就要赋值，赋值之后就不能再修改了。

````go
const name string = "枫枫" // 定义就要赋值
//name = "知道" // 不能再修改了
fmt.Println(name)
````

### 1.5.命名规范

**首字母大写**的变量、函数、方法、属性，可在包外进行访问。

## 2、输入输出

````go
func main() {
	// 自动换行，中间有空格
	fmt.Println("cola", 12)

	// %s string类型的占位符 \n 是换行符
	fmt.Printf("%s is a boy\n", "bob")
	fmt.Printf("%s is a boy\n", "bob")
	// %d 整数
	fmt.Printf("%d\n", 3)
	// %.2f 保留2位小数（四舍五入）
	fmt.Printf("%.2f\n", 1.2562)
	// 打印空字符串
	fmt.Printf("%#v\n", "")

	// 输入
	var name2 string
	fmt.Scan(&name2) // 这里记住，要在变量的前面加个&, 后面讲指针会提到
	fmt.Println("你输入的名字是", name2)
}
````

## 3、基本数据类型

go 语言的基本数据类型有：整数型、浮点型、复数、布尔、字符串。

### 3.1.整数型

go语言的整数类型，具体细分有很多：

````go
func main() {
	var n1 uint8 = 2 // 2^8
	var n2 uint16 = 2
	var n3 uint32 = 2
	var n4 uint64 = 2
	var n5 uint = 2
	var n6 int8 = 2
	var n7 int16 = 2
	var n8 int32 = 2
	var n9 int64 = 2
	var n10 int = 2

	fmt.Println(n1, n2, n3, n4, n5, n6, n7, n8, n9, n10)
}
````

- 默认的数字定义类型是 `int` 类型
- 带个u就是无符号，只能存正整数
- 后面的数字就是2进制的位数
- `uint8` 还有一个别名 byte， 一个字节 = 8个bit位
- int类型的大小取决于所使用的平台，64位操作系统，int就是int64的最大上限

### 3.2.浮点型

Go语言支持两种浮点型数：float32 和 float64

- float32 的浮点数的最大范围约为 3.4e38，可以使用常量定义：`math.MaxFloat32`
- float64 的浮点数的最大范围约为 1.8e308，可以使用一个常量定义：`math.MaxFloat64`

如果没有显式声明，则默认是 **float64** 。

### 3.3.字符型

比较重要的两个类型是 `byte`（单字节字符）、 `rune` （多字节字符）。

````go
func main() {
	var c1 = 'a'
	var c2 = 97
	fmt.Println(c1, c2)           // 直接打印都是数字
	fmt.Printf("%c %c\n", c1, c2) // 以字符的格式打印

	var r1 rune = '中'
	fmt.Printf("%c\n", r1)
}
````

- 字符的本质是一个整数，直接输出时，是该字符对应的 UTF-8 编码的码值
- 可以直接给某个变量赋一个数字，然后按格式化输出时 %c ，会输出该数字对应的 unicode 字符
- 字符类型是可以进行运算的，相当于一个整数，因为它都对应有 Unicode 码

### 3.4.字符串类型

字符的赋值是单引号，**字符串的赋值是双引号**。

````go
var s string = "枫枫知道"
fmt.Println(s)
````

### 3.5.转义字符

````go
fmt.Println("枫枫\t知道")              // 制表符
fmt.Println("枫枫\n知道")              // 回车
fmt.Println("\"枫枫\"知道")            // 双引号
fmt.Println("枫枫\r知道")              // 回到行首
fmt.Println("C:\\pprof\\main.exe") // 反斜杠
````

### 3.6.多行字符串

````go
package main

import "fmt"

func main() {
  var s = `今天
天气
真好
`
  fmt.Println(s)
}
````

在 `` 这个里面，再出现转义字符就会原样输出了

### 3.7.布尔类型

布尔型数据只有 true（真）和 false（假）两个值

- 布尔类型变量的默认值为false
- Go 语言中不允许将整型强制转换为布尔型
- 布尔型无法参与数值运算，也无法与其他类型进行转换

### 3.8.零值问题

如果给一个基本数据类型只声明不赋值，那么这个变量的值就是对应类型的零值，例如 int 就是 0，bool 就是 false，字符串就是 "" 。

````go
func main() {
	var a1 int
	var a2 float32
	var a3 string
	var a4 bool

	fmt.Printf("%#v\n", a1) // 0
	fmt.Printf("%#v\n", a2) // 0
	fmt.Printf("%#v\n", a3) // ""
	fmt.Printf("%#v\n", a4) // false
}
````
