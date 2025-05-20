# 循环语句

::: details 参考资料：

- [黑马程序员python教程](https://www.bilibili.com/video/BV1qW4y1a7fU)

:::

## 一、while

条件满足无限执行，定义格式：

````python
while 条件：
	条件为True时重复执行
    
# 写法要求与if语句类似
````

使用示例：

````python
i = 0
while i < 100:
    print("观止study")
    i += 1  # 等效于 i = i + 1
# 需要设置循环终止的条件，如i += 1配合 i < 100，就能确保执行100次后停止，否则将无限循环
# 控制台输出 100次观止study
````

## 二、for

### 1.格式定义

「for循环」是对一批内容进行逐个处理，基础格式为：

````python
for 临时变量 in 待处理数据集(可迭代对象): 
        循环满足条件时执行的代码
# 从待处理数据集中：逐个取出数据赋值给临时变量
````

「待处理的对象」又称之为可迭代的类型，是指内容可以一个个依次取出的一种类型，包括：

- 字符串
- 列表
- 元组
- ···

for 循环本质就是在遍历可迭代的对象：

````python
# 定义字符串name
name = "study"
# for循环处理字符串
for x in name:
    print(x)
# 将字符串的内容：依次取出
# 输出
# s
# t
# u
# d
# y        
````

### 2.和while的区别

for循环是无法定义循环条件的。只能从被处理的数据集中，依次取出内容进行处理.

理论上讲，for循环无法构建无限循环（被处理的数据集不可能无限大）。

### 3.range

`range` 用于获得一个简单的数字序列（可迭代类型的一种）：

- `range(num)`

````python
# 获取一个从0开始，到num结束的数字序列（不含num本身）
# 如range(5)取得的数据是：[0, 1, 2, 3, 4]
for x in range(5):
    print(x)
# 输出
# 0
# 1
# 2
# 3
# 4
````

- `range(num1, num2)`

````python
# 获得一个从num1开始，到num2结束的数字序列（不含num2本身）
# 如，range(5, 10)取得的数据是：[5, 6, 7, 8, 9]
for x in range(5, 10):
    print(x)
# 输出
# 5
# 6
# 7
# 8
# 9
````

- `range(num1, num2, step)`

````python
# 获得一个从num1开始，到num2结束的数字序列（不含num2本身）
# 数字之间的步长，以step为准（step默认为1）
# 如，range(5, 10, 2)取得的数据是：[5, 7, 9]
for x in range(5, 10, 2):
    print(x)
# 输出
# 5
# 7
# 9
````

## 三、循环中断

### 1.continue

`continue` 是用于临时跳过，跳过本次循环，直接进行下一次循环：

- 可用于 `for` 和 `while` 循环，效果一致
- 在嵌套循环中，只对所在层循环生效

````python
for num in range(5):
    if num == 3:
        continue  # 当num=3时跳过后面语句，进行下次循环
    print(num)
# 输出
# 0
# 1
# 2
# 4
````

### 2.break

`break` 是提前退出循环，不在继续：

- 直接结束所在的循环
- 可用于 `for` 和 `while` 循环，效果一致
- 在嵌套循环中只对所在的层循环生效

````python
for num in range(5):
    if num == 3:
        break  # 当num=3时提前退出循环，不再继续
    print(num)
# 输出
# 0
# 1
# 2
````
