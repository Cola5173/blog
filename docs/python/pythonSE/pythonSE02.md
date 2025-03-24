# Python

::: details 参考资料：

- [【零基础 快速学Python】 韩顺平 (适合Python零基础 Python初学入门)](https://www.bilibili.com/video/BV1zN4y1v7Vv)
- [Python基础学习（二）变量](https://blog.csdn.net/qingxuly/article/details/143206219)

:::

## 变量和运算符

---

### 1、变量

#### 1.1.概念

变量是程序的基本组成单位，当程序/代码执行后，变量的值是存在计算机内存的。

`Memory`（内存）是计算机的重要部件，它用于暂时存放 CPU 中的运算数据，以及与硬盘等外部存储交换的数据。它是外存于 CPU 进行沟通的桥梁，计算机中所有程序的运行都在内存中进行。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/01.png" alt="基本概念" style="margin: auto;zoom: normal">

````py
# 变量的实例
# 定义了一个变量，变量的名称是a，变量的值是1，1是int类型（整数类型）
a = 1
# 变量a的值修改为2，变量a的值是2,2是int类型
a = 2
# 输出变量的值
print("a的值是", a, "类型是", type(a))
````

#### 1.2.介绍

变量相当于内存中一个数据存储空间的表示，可以把变量看做是一个房间的门牌号，通过门牌号我看可以找到房间，而通过变量名可以访问到变量（值）。

需要先定义变量，才能使用，否则会提示 `not defined`

````py
# 变量使用的错误形式，需要先定义变量，才能使用，否则会提示 not defined
# print(c)
# c = 10
````

#### 1.3.快速入门

演示记录人的信息并输出的程序

````py
# 演示记录人的信息并输出的程序
name = "tom"  # 字符串
age = 20  # 整形
score = 90.4  # 浮点型（小数）
gender = "男"  # 字符串

# 输出信息
print("个人信息如下：")
print(name)
print(age)
print(score)
print(gender)

# 输出信息
print("个人信息如下：", name, age, score, gender)
````

#### 1.4.格式化输出

在 Python 中，使用 `%` 操作符进行格式化输出时，需要在字符串中使用占位符来表示需要替换的值。占位符由`一个百分号 %` 和`一个格式说明符`组成，格式说明符用于指定变量的类型和格式。

| %操作符 | 	说明   | 	备注                          |
|------|-------|------------------------------|
| %s	  | 输出字符串 |                              |
| %d	  | 输出整数	 | %03d 表示宽度为 3，右对齐，不足的部分用 0 填充 |
| %f	  | 输出浮点数 | 	%.2f 表示小数点后保留两位有效数字         |
| %%	  | 输出%	  |                              |

````py
# 定义变量
age = 80
score = 77.5
gender = '男'
name = "贾宝玉"

# %操作符输出
print("个人信息：%s %d %.1f %s" % (name, age, score, gender))
````

除了使用 % 操作符进行格式化输出外，Python 还提供了 `format()` 函数来进行字符串格式化，通过花括号 {} 作为占位符，并通过位置、关键字或属性来指定替换的值。

````py
# format()函数
print("个人信息：{} {} {} {}".format(name, age, score, gender))
````

`f-strings` 是 Python 3.6 及更高版本中引入的一种新的字符串格式化方法，使用花括号 {} 包围变量名或表达式，并在字符串前加上字母 “f” 或 “F”。在花括号内，可以直接插入变量名或表达式，而不需要使用占位符和格式说明符。这使得字符串格式化更加简洁和易读。

````py
# f-strings
print(f"个人信息：{name} {age} {score} {gender}")
````

#### 1.5.+号使用

当左右两边都是数值型时，则做加法运算。当左右两边都是字符串，则做拼接运算。

````py
# +号的使用案例

name = "king"
score = 50.8

print(score + 90)  # 140.8
print(name + "hi")  # kinghi
print("100" + "98")  # 10098
print(34.5 + 100)  # 134.5

# print("100" + 100)  # TypeError: can only concatenate str (not "int") to str
````

---

### 2、数据类型

#### 2.1.基本数据类型

Python 中的变量在使用前都必须赋值，变量赋值以后该变量才会被创建。

| 类型       | 	描述                                                  |
|----------|------------------------------------------------------|
| `int`    | 	整数：如 1, -1, 200                                     |
| `float`	 | 小数：如 1.1, -4.5, 900.9                                |
| `bool`	  | 布尔值就是我们常说的逻辑，可以理解为对（True）或错（False）                   |
| `string` | 字符串就是字符组成的一串内容，python 中用成对的单引号或双引号括起来，如“hello world” |

“类型”是变量所指的内存数据的类型，`a = 100`：

- a 是变量，它是没有类型的
- a 变量指向的数据 100 是有类型的
- 100 有些地方也称为 `字面量`
- `type()` 函数查看数据类型

````py
# 演示type() 使用

age = 80
score = 77.5
gender = '男'
name = "贾宝玉"
is_pass = True

# 查看变量的类型（本质是查看变量指向的数据的类型）
print(type(age))
print(type(score))
print(type(gender))
print(type(name))
print(type(is_pass))

# type() 可以直接查看具体的值（字面量） 的类型
print(f"hello 的类型是{type('hello')}")
print(f"1.1 的类型是{type(1.1)}")
````

#### 2.2.整数类型

Python 整数就是用于存放整数值的，比如：12，30，3456，-1，可以表示很大的数（官方：the limit (4300 digits) for integer）.

````py

````