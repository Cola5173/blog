# 常量和变量

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)
- [Golang中文学习文档站](https://golang.halfiisland.com/)

:::

## 1、常量

常量的值无法在运行时改变，一旦赋值过后就无法修改，其值只能来源于：

- 字面量
- 其他常量标识符
- 常量表达式
- 结果是常量的类型转换
- iota

常量只能是基本数据类型，不能是：

- 除基本类型以外的其它类型，如结构体，接口，切片，数组等
- 函数的返回值
- 常量的值无法被修改，否则无法通过编译

### 1.1.初始化

常量的声明需要用到 `const` 关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略：

````go
const name string = "Jack" // 字面量

const msg = "hello world" // 字面量

const num = 1 // 字面量

const numExpression = (1+2+3) / 2 % 100 + num // 常量表达式
````

如果仅仅只是声明而不指定值，将会无法通过编译，编译器报错：

````
missing init expr for name
````

批量声明常量可以用()括起来以提升可读性，可以存在多个()达到分组的效果：

````go
const (
   Count = 1
   Name  = "Jack"
)

const (
   Size = 16
   Len  = 25
)
````

在同一个常量分组中，在已经赋值的常量后面的常量可以不用赋值，其值默认就是前一个的值：

````go
const (
  A = 1
  B // 1
  C // 1
  D // 1
  E // 1
)
````

### 1.2.iota

`iota` 是一个内置的常量标识符，通常用于表示一个**常量声明中的无类型整数序数，一般都是在括号中使用**：

````go
const iota = 0
````

默认的第一行的 `iota` 的默认值是 0 ：

````go
const (
   Num = iota // 0
   Num1 // 1
   Num2 // 2
   Num3 // 3
   Num4 // 4
)
````

也可以这么写

````go
const (
   Num = iota*2 // 0
   Num1 // 2
   Num2 // 4
   Num3 // 6
   Num4 // 8
)
````

还可以：

````go
const (
   Num = iota << 2*3 + 1 // 1
   Num1 // 13
   Num2 // 25
   Num3 = iota // 3
   Num4 // 4
)
````

`iota` 是递增的，第一个常量使用iota值的表达式，根据序号值的变化会自动的赋值给后续的常量，直到用新的 `const`
重置，这个序号其实就是代码的相对行号，是相对于当前分组的起始行号：

````go
const (
	Num0  = iota<<2*3 + 1 // 1 第一行
	Num01 = iota<<2*3 + 1 // 13 第二行
	_                     // 25 第三行
	Num03                 //37 第四行
	Num04 = iota          // 4 第五行
	_                     // 5 第六行
	Num05                 // 6 第七行
)
````

## 2、枚举

Go 语言没有为枚举单独设计一个数据类型，都是通过自定义类型 + const + iota 来实现枚举：

````go
// 模拟枚举类型
const (
	Red   = iota // Red = 0
	Green        // Green = 1
	Blue         // Blue = 2
)

func Demo03() {
	fmt.Println(Red)   // 输出 0
	fmt.Println(Green) // 输出 1
	fmt.Println(Blue)  // 输出 2
}
````

这些枚举实际上就是数字，Go 也不支持直接将其转换为字符串，可以通过给自定义类型添加方法来返回其字符串表现形式，实现Stringer接口即可：

````go
func (s Season) String() string {
  switch s {
  case Spring:
    return "spring"
  case Summer:
    return "summer"
  case Autumn:
    return "autumn"
  case Winter:
    return "winter"
  }
  return ""
}
````

但是，这样子做有很多的缺点：

- 类型不安全，因为Season是自定义类型，可以通过强制类型转换将其他数字也转换成该类型
- 繁琐，字符串表现形式需要自己实现
- 表达能力弱，因为const仅支持基本数据类型，所以这些枚举值也只能用字符串和数字来进行表示

## 3、变量

变量是用于保存一个值的存储位置，允许其存储的值在运行时动态的变化。

每声明一个变量，都会为其分配一块内存以存储对应类型的值，[参考手册-变量](https://go.dev/ref/spec#Variables) 查看更多细节。

### 3.1.声明

在 go 中的类型声明是后置的，变量的声明会用到 `var` 关键字，格式为：

````go
var 变量名 类型名
````

变量名的命名规则必须遵守标识符的命名规则：

````go
var intNum int
var str string
var char byte
````

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

- `%T` ： 会输出传入变量的数据类型
- `%s` ：打印字符串
- `%f` ：打印浮点数
- `%v` ：打印变量的值，是一个通用占位符，适用于多种类型

这些转义字符用于在字符串中嵌入无法直接输入的字符或控制字符。

上述四种方式都可以声明局部变量，但是**全局变量只能由前三种方式声明**。

当要声明多个不同类型的变量时，可以使用()进行包裹，可以存在多个()：

````go
func main() {
	// 声明多个变量
	var xx, yy int = 100, 200
	var s1, s2 string = "hello", "world"
	fmt.Println("xx= ", xx, ", yy= ", yy, ", s1= ", s1, ", s2= ", s2)

	// 多变量声明，多行
	var (
		cc int     = 100
		dd float32 = 3.14
		ee bool    = true
	)
	fmt.Println("cc= ", cc, ", dd= ", dd, ", ee= ", ee)
}
````

一个变量如果只是声明而不赋值，那么变量存储的值就是对应类型的零值。

### 3.2.赋值

赋值会用到运算符 `=` ：

````go
var name string
name = "jack"
````

也可以声明的时候直接赋值:

````go
var name string = "jack"
````

或者官方提供的语法糖，省略掉var关键字和后置类型，具体是什么类型交给编译器自行推断：

````go
name := "jack" // 字符串类型的变量。
````

虽然可以不用指定类型，但是在后续赋值时，类型必须保持一致，否则下面这种代码无法通过编译：

````go
a := 1
a = "1"
````

短变量初始化不能使用nil，因为nil不属于任何类型，编译器无法推断其类型。

短变量声明也可以批量初始化：

````go
name, age := "jack", 1
````

短变量声明方式无法对一个已存在的变量使用。

但是有一种情况除外，那就是在赋值旧变量的同时声明一个新的变量：

````go
a := 1
a, b := 2, 2
````

这种代码是可以通过编译的，变量a被重新赋值，而b是新声明的。

在 go 语言中，有一个规则，那就是所有在函数中的变量都必须要被使用，比如下面的代码只是声明了变量，但没有使用它：

````go
func main() {
  a := 1
}
````

那么在编译时就会报错，提示你这个变量声明了但没有使用

````
a declared and not used
````

这个规则仅适用于函数内的变量，对于函数外的包级变量则没有这个限制。

### 3.3.匿名

用下划线可以表示不需要某一个变量

````go
// 返回值： (*File, error)
Open(name string) (*File, error)
````

比如 os.Open 函数有两个返回值，我们只想要第一个，不想要第二个，可以按照下面这样写：

````go
file, _ := os.Open("readme.txt")
````

未使用的变量是无法通过编译的，当你不需要某一个变量时，就可以使用下划线 `_` 代替。

### 3.4.交换

在 Go 中，如果想要交换两个变量的值，不需要使用指针，可以使用赋值运算符直接进行交换，语法上看起来非常直观：

````go
num1, num2 := 25, 36
num1, num2 = num2, num1
````

三个变量也是同样如此：

````go
num1, num2, num3 := 25, 36, 49
num1, num2, num3  = num3, num2, num1
````

思考下面这一段代码，这是计算斐波那契数列的一小段代码，三个变量在计算后的值分别是什么：

````go
a, b, c := 0, 1, 1
a, b, c = b, c, a+b
````

答案是：

````
1 1 1
````

明明 a 已经被赋予 b 的值了，为什么 a+b 的结果还是 1？go 在进行多个变量赋值运算时，它的顺序是先计算值再赋值，并非从左到右计算。

当涉及到函数调用时，这个效果就更为明显，我们有一个函数sum可以计算两个数字的返回值

````go
func sum(a, b int) int {
  return a + b
}
````

通过函数来进行两数相加：

````go
a, b, c := 0, 1, 1
a, b, c = b, c, sum(a, b)
````

结果没有变化，在计算sum函数返回值时，它的入参依旧是 0 和 1。

所以代码应该这样分开写：

````go
a, b = b, c
c = a + b
````

### 3.5.比较

变量之间的比较有一个大前提，那就是它们之间的类型必须相同，go 语言中不存在隐式类型转换:

````go
func main() {
  var a uint64
  var b int64
  fmt.Println(a == b)
}
````

编译器会告诉你两者之间类型并不相同：

````
invalid operation: a == b (mismatched types uint64 and int64)
````

必须使用强制类型转换：

````go
func main() {
  var a uint64
  var b int64
  fmt.Println(int64(a) == b)
}
````

go 中的可比较类型有：

- 布尔
- 数字
- 字符串
- 指针
- 通道 （仅支持判断是否相等）
- 元素是可比较类型的数组（切片不可比较）（仅支持判断是否相等）（仅支持相同长度的数组间的比较，因为数组长度也是类型的一部分，而不同类型不可比较）
- 字段类型都是可比较类型的结构体（仅支持判断是否相等）

### 3.6.代码块

在函数内部，可以通过花括号建立一个代码块，代码块彼此之间的变量作用域是相互独立的：

````go
func main() {
  a := 1

  {
    a := 2
    fmt.Println(a)
  }

  {
    a := 3
    fmt.Println(a)
  }
  fmt.Println(a)
}
````

块与块之间的变量相互独立，不受干扰，无法访问，但是会受到父块中的影响。