# 函数

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)
- [Golang中文学习文档站](https://golang.halfiisland.com/)

:::

## 1、声明

函数的声明格式如下：

````go
func 函数名([参数列表]) [返回值] {
  函数体
}
````

声明函数有两种办法，一种是通过 `func` 关键字直接声明，另一种就是通过 `var` 关键字来声明：

````go
func sum(a int, b int) int {
  return a + b
}

var sum = func(a int, b int) int {
  return a + b
}
````

Go 中的函数不支持重载。

## 2、参数

Go 中的参数名可以不带名称，一般这种是在接口或函数类型声明时才会用到，不过为了可读性一般还是建议尽量给参数加上名称：

````go
type ExWriter func(io.Writer) error

type Writer interface {
  ExWrite([]byte) (int, error)
}
````

对于类型相同的参数而言，可以只需要声明一次类型，不过条件是它们必须相邻：

````go
func Log(format string, a1, a2 any) {
  ...
}
````

变长参数可以接收 0 个或多个值，必须声明在参数列表的末尾，最典型的例子就是 `fmt.Printf` 函数：

````go
func Printf(format string, a ...any) (n int, err error) {
  return Fprintf(os.Stdout, format, a...)
}
````

Go 中的函数参数是传值传递，即在传递参数时会拷贝实参的值。

## 3、返回值

Go 允许函数有多个返回值，此时就需要用括号将返回值围起来：

````go
func Div(a, b float64) (float64, error) {
  if a == 0 {
    return math.NaN(), errors.New("0不能作为被除数")
  }
  return a / b, nil
}
````

Go 也支持具名返回值，不能与参数名重复，使用具名返回值时，return关键字可以不需要指定返回哪些值：

````go
func Sum(a, b int) (ans int) {
  ans = a + b
  return
}
````

不管具名返回值如何声明，永远都是以return关键字后的值为最高优先级：

````go
func SumAndMul(a, b int) (c, d int) {
  c = a + b
  d = a * b
    // c，d将不会被返回
  return a + b, a * b
}
````