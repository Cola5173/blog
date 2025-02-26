# 控制语句

:::details 参考资料：

- [8小时入门go语言开发](https://www.bilibili.com/video/BV1zu4y187Wb)

:::

## 1、判断

以年龄为例，输入的年龄在某一个区间，就输出对应的提示信息

````go
<=0     未出生
1-18    未成年
18-35   青年
>=35    中年
````

### 1.1.if

````go
func main() {
	var age int
	fmt.Println("请输入你的年龄:")

	fmt.Scan(&age)

	if age <= 0 {
		fmt.Println("未出生")
		return
	}
	if age <= 18 {
		fmt.Println("未成年")
		return
	}
	if age <= 35 {
		fmt.Println("青年")
		return
	}
	fmt.Println("中年")
}
````

### 1.2.switch

````go
func main() {
	var age int
	fmt.Println("请输入你的年龄:")

	fmt.Scan(&age)

	switch {
	case age <= 0:
		fmt.Println("未出生")
	case age <= 18:
		fmt.Println("未成年")
	case age <= 35:
		fmt.Println("青年")
	default:
		fmt.Println("中年")
	}

}
````

### 3、for

for循环，一般写法是：

````go
for 初始化;条件;操作{
}
````

例如求1+2+...+100的和：

````go
func main() {
	// for 循环
	var result = 0
	for i := 1; i <= 100; i++ {
		result += i
	}
	fmt.Println(result)
}
````

for 循环，还有其它的变体如下：

````go
func main() {
	// 死循环，每隔1秒打印当前的时间
	for {
		time.Sleep(1 * time.Second)
		fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
	}

	// golang 没有 while 循环，如果需要使用 while 循环，是由 for 变体
	i := 0
	sum := 0
	for i <= 100 {
		sum += i
		i++
	}
	fmt.Println(sum)

	// do - while
	j := 0
	sum2 := 0
	for {
		sum2 += j
		j++
		if j > 100 {
			break
		}
	}
	fmt.Println(sum2)

	// 遍历切片
	s := []string{"A", "B", "C", "D", "E"}
	for index := range s {
		fmt.Println(index, s[index])
	}

	// 遍历map
	map01 := map[string]string{
		"A": "A",
		"B": "B",
		"C": "C",
		"D": "D",
		"E": "E",
	}
	for key, value := range map01 {
		fmt.Println(key, value)
	}

	// break:跳过循环
	// continue:跳过本轮循环

}
````

