# golang语言特性

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)

:::

## 1、优势

极简单的部署方式：可直接编译成机器码、不依赖其他库、直接运行即可部署

静态类型语言，编译的时候可以检查出大多数问题

语言层面的并发：天生的基因支持、充分的利用多核:

````go
// Go 语言实现并发的代码
func goFunc(i int) {
	fmt.Println("goroutine ", i, " ...")
}

func main() {
	for i := 0; i < 1000; i++ {
		go goFunc(i) // 开启一个并发协程
	}
	time.Sleep(time.Second)
}
````

强大的标准库：runtime 系统调度机制、高效的 CG 垃圾回收、丰富的标准库

“大厂” 领军：Google、facebook、Tencent、Baidu、七牛、字节...

## 2、适用场景

1. 云计算基础设施领域：

   代表项目：docker、kubernetes、etcd、consul、cloud flare CDN、七牛云存储 等。

2. 基础后端软件：

   代表项目：tidb、influxdb、 cockroach 等。

3. 微服务

   代表项目：go-kit、 micro、 monzo bank 的 typhon、bilibili 等。

4. 互联网基础设施

   代表项目：以太坊、hyperledger 等。

## 3、Golang的不足

1. 包管理，大部分包都在github上

2. 无泛化类型

   (Golang 1.18+已经支持泛型)

3. 所有Excepiton都用Error来处理(比较有争议)。

4. 对C的降级处理，并非无缝，没有C降级到asm那么完美(序列化问题)