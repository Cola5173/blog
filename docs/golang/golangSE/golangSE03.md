# 数组、切片和map

:::details 参考资料：

- [8小时入门go语言开发](https://www.bilibili.com/video/BV1zu4y187Wb)

:::

## 1、数组

数组（Array），里的元素必须全部为同一类型，声明数组时，必须指定其长度或者大小。

````go
func main() {
	// 数组在声明是长度只能是一个常量，不能是变量
	var array = [5]int{1, 2, 4, 3, 5}
	fmt.Println(array)

	// 数组的使用
	fmt.Println(array[0])
	array[0] = 0
	fmt.Println(array[0])
	fmt.Println(len(array))
}
````

## 2、切片

go里面的数组，长度被限制死了，所以不经常用，因此 go 出了 lice（切片）。切片（Slice）相较于数组更灵活，因为在声明切片后其长度是可变的。

切片声明：

````go
var nums []int // 值
nums := []int{1, 2, 3} // 值
nums := make([]int, 0, 0) // 值
nums := new([]int) // 指针
````

除了基本数据类型，其他数据类型如果只定义不赋值，那么实际的值就是 nil

````go
// 定义一个字符串切片
var list []string
fmt.Println(list == nil) // true
````

通常情况下，推荐使用 `make` 来创建一个空切片，只是对于切片而言，make函数接收三个参数：**类型**，**长度**，**容量**。

````go
make([]type, length, capacity)
````

````go
func main() {
  // 定义一个字符串切片
  var list = make([]string, 0)
  fmt.Println(list, len(list), cap(list))
  fmt.Println(list == nil) // false

  list1 := make([]int, 2, 2)
  fmt.Println(list1, len(list1), cap(list1))
}
````

之所以叫做切片，是因为切片是数组切出来的。

````go
// 切片是数组切出来的
var nums01 = [3]int{1, 2, 3}
nums02 := nums01[0:2] // 1,2
fmt.Println(nums02)
````

还可以给切片排序：

````go
// 切片排序
nums03 := []int{1, 2, 7, 3, 8, 6, 9}
sort.Ints(nums03) // 默认是从小到大
fmt.Println(nums03)
sort.Sort(sort.Reverse(sort.IntSlice(nums03)))// 反转，从大到小
fmt.Println(nums03)
````

## 3、map

