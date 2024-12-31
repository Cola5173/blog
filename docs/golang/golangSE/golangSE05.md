# 常量

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)
- [Golang中文学习文档站](https://golang.halfiisland.com/)

:::

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

## 1、初始化

常量的声明需要用到const关键字，常量在声明时就必须初始化一个值，并且常量的类型可以省略：

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

## 2、iota

`iota` 是一个内置的常量标识符，通常用于表示一个常量声明中的无类型整数序数，一般都是在括号中使用：

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

## 3、枚举

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