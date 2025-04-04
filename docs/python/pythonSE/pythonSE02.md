# Python

::: details 参考资料：

- [【零基础 快速学Python】 韩顺平 (适合Python零基础 Python初学入门)](https://www.bilibili.com/video/BV1zN4y1v7Vv)
- [Python基础学习（二）变量](https://blog.csdn.net/qingxuly/article/details/143206219)

:::

## 变量和数据类型

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
n3 = 9 ** 88  # 计算9的88次方
print("n3 = ", n3, type(n3))

# 计算9的888次方
n3 = 9 ** 888
print("n3 = ", n3, type(n3))

# 计算9的8888次方
# n3 = 9 ** 8888
# ValueError: Exceeds the limit (4300 digits) for integer string conversion; use sys.set_int_max_str_digits() to increase the limit
# print("n3 = ", n3, type(n3))

# 计算9的8888次方
import sys

n3 = 9 ** 8888
sys.set_int_max_str_digits(0)
print("n3 = ", n3, type(n3))
````

Python 的整数有十进制、十六进制、八进制、二进制：
- 十进制就是我们最常见的写法，比如：1，66，123
- 十六进制写法：加前缀 0x，由 0-9 和 A-F 的数字和字母结合
- 八进制写法：加前缀 0o，由 0-7 数字组合
- 二进制写法：加前缀 0b，只有 0 和 1 数字结合
- 运行时，会自动转化为十进制输出

````py
# 进制（输出都是十进制）
print(10)  # 十进制
print(0x10)  # 十六进制
print(0o10)  # 八进制
print(0b10)  # 二进制
````

`byte`（字节）：计算机中基本存储单元；

`bit`（位）：计算机中的最小存储单位，`1 byte = 8 bit` .

字节数是随着数字增大而增大（即：Python 整型是变长的），每次的增量是 4 个字节。

````py
n1 = 0
n2 = 1
n3 = 2
n4 = 2 ** 15
n5 = 2 ** 30
n6 = 2 ** 128

# sys.getsizeof(object) 返回对象的大小（以字节为单位）
print(n1, sys.getsizeof(n1), "类型", type(n1))
print(n2, sys.getsizeof(n2), "类型", type(n3))
print(n3, sys.getsizeof(n3), "类型", type(n3))
print(n4, sys.getsizeof(n4), "类型", type(n4))
print(n5, sys.getsizeof(n5), "类型", type(n5))
print(n6, sys.getsizeof(n6), "类型", type(n6))
````

#### 2.3.浮点

Python 的浮点类型可以表示一个小数，比如：123.4，7.8，-0.12：

- 浮点数表示形式为：十进制数（5.12，.512，必须有小数点）、科学计数法（5.12e，5.12e-2）
- 浮点数有大小限制：max（1.7976931348623157e+308）、min（2.2250738585072014e-308）
- 浮点类型计算后，存在精度的缺失，需要使用 Decimal 类进行精确计算

````py
n1 = 5.12
n2 = .512
print(n2)  # 0.512

n3 = 5.12e2  # 5.12 乘以 10 的 2 次方
print(n3)  # 512.0

n4 = 5.12e-2  # 5.12 乘以 10 的 -2 次方
print(n4)  # 0.0512

# float_info 是 sys 模块中的一个对象，它包含了浮点数的相关信息
import sys
print(sys.float_info.max)  # 最大的浮点数
print(sys.float_info.min)  # 最小的浮点数

# 浮点类型计算后，存在精度缺失问题
n5 = 8.1 / 3
print(n5)  # 2.6999999999999997

# decimal 模块可以解决浮点数的精度问题
from decimal import Decimal
n6 = Decimal('8.1') / Decimal('3')
print(n6)  # 2.7
````

#### 2.4.布尔

`bool`（布尔类型），取值 `True` 和 `False` ，都是关键字，表示布尔值。

适用于逻辑运算，一般用于程序流程控制：条件控制语句、循环控制语句，比如判断某个条件是否成立，或者在某个条件满足时执行某些代码。

布尔类型可以和其他数据类型进行比较，比如数字、字符串等。在比较时，Python 会将 True 视为 1，False 视为 0 。在 Python 中，非 0 被视为真值，0 被视为假值。

````py
# 布尔的基本使用，逻辑运算
n1 = 100
n2 = 200
if n1 > n2:
    print("n1 大于 n2")
else:
    print("n1 小于等于 n2")

# 把 n1 > n2 的结果赋值给变量 n3
n3 = n1 > n2
print(n3)
print("n3 的类型是", type(n3))
print(type(1 > -1))

# 布尔值和整数的运算，False 相当于 0，True 相当于 1
n4 = False
n5 = True
print(n4 + 10)
print(n5 + 10)

if n4 == 0:
    print("n4 是 False")
if n5 == 1:
    print("n5 是 True")

# 非0被视为真值，0被视为假值
if 0:
    print("haha")
if 1:
    print("lala")
if -1.1:
    print("ohlalala")
````

#### 2.5.字符串

字符串是 Python 中很常用的数据类型，使用引号 `'` 或 `"` 包括起来，创建字符串：

````py
# 使用引号（' or "）包括起来，创建字符串
n1 = 'tom 说：“hello”'
print(n1)
n2 = "jack say hi"
print(n2)
````

- Python 中不支持单字符类型，单字符在 Python 中也是作为一个字符串使用
- 用三个单引号 '''内容''' 或三个双引号 """内容""" 可以使字符串内容保持原样输出，在输出格式复杂的内容是比较有用的
- 在字符串前面加 `r` 可以使整个字符串不会被转义

````py
# python 不支持单字符类型，单字符也是作为一个字符串使用
n3 = 'A'
print('n3 的值为：{} 类型是 {}'.format(n3, type(n3)))  # n3 的值为：A 类型是 <class 'str'>

# 用三个单引号'''内容'''或三个双引号"""内容"""可以使字符串内容保持原样输出，在输出格式复杂的内容是比较有用的。
content = """ Hi，我是你的百度翻译AI助手，我可以提供一站式翻译服务，'f'
目前仅支持中文和英语，其它语种正在努力学习中；
所有内容均由AI提供，仅供参考，如有错误请反馈，我们将持续改进！"""
print(content)

# 在字符串前面加`r`可以使整个字符串不会被转义
str4 = "jack\ntom\tking"
print(str4)
str5 = r"jack\ntom\tking"
print(str5)
````

**「字符串驻留机制」**，python仅保存一份相同且不可变的字符串，不同的值被存放在字符串的驻留池中，python的驻留机制对**相同的字符串只保存一份拷贝**，后续创建相同字符串时，不会开辟新的空间，而是把该字符串的地址赋给新创建的变量。

````py
# 字符串驻留机制
str1 = "hello"
str2 = "hello"
str3 = "hello"

# id()函数是可以返回对象/数据的内存地址
print("str1的地址：", id(str1))
print("str2的地址：", id(str2))
print("str3的地址：", id(str3))
````

❗驻留机制的只有在以下几种情况才会发生（在终端中执行）：

- 字符串是由26个英文大小写字母，0～9，_组成
- 字符串长度为 0 或 1 时
- 字符串在编译时进行驻留，而非运行时
- [-5,256] 的整数数字

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/02.png" alt="基本概念" style="margin: auto;zoom: normal">

`sys` 的 `intern()` 方法可以强制两个字符串都指向同一个对象：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/03.png" alt="基本概念" style="margin: auto;zoom: normal">

但是 pycharm 对字符串进行了优化处理：

````py
# pycharm 进行了字符串优化处理
n1 = 'abc#'
n2 = 'abc#'
print(id(n1))
print(id(n2))

n1 = -100
n2 = -100
print(id(n1))
print(id(n2))
````

当需要值相同的字符串时，可以直接从字符串池里拿来使用，避免频繁的创建和销毁，提高效率和节约内存。

#### 2.6.数据类型转换

「隐式转换」，python 中变量的类型不是固定的，会根据变量在运行时决定，运算的时候会自动向高精度进行转换。

````py
# python 根据该变量使用的上下文在运行时决定的
var1 = 10  # int类型
print(type(var1))
var1 = 1.1  # float类型
print(type(var1))
var1 = 'hello'  # string类型
print(type(var1))

# 在运算的时候，数据类型会向高精度自动转换，float的精度高于int
var2 = 10
var3 = 1.2
var4 = var2 + var3
print("var4=", var4, "var4的类型：", type(var4))
var2 = var2 + 0.1
print("var2=", var2, "var2的类型：", type(var2))
````

「显式类型转换」，指的是对变量数据类型进行转换：

````py
# 显式转换
i = 10
i = float(i)
print("i={},i 的类型是 ：{}".format(i, type(i)))
i = str(i)
print("i={},i 的类型是 ：{}".format(i, type(i)))
````

显式类型转换的注意事项：

- 不管什么值的 `int` 、 `float` 都可以转换为 `str` ，`str(x)` 将对象 x 转换为字符串
- `int` 转换为 `float` 时，会增加小数部分
- `float` 转换为 `int` 时，会删除小数部分
- `str` 转 `int` 、 `float` ，使用 `int(x)` 、 `float(x)` 将对象 x 转换为`int` 、 `float`
- 在将 `str` 类型转为 基本数据类型时，要确保 `str` 能够转成有效的数据，如果无法转成有效的数字则会报错
- 对一个变量进行强制转换，会返回一个数据值，强制转换后并不影响原本变量的数据类型

````py
# 显式转换的注意事项
# 显示类型转换注意事项
n1 = 100
n2 = 123.65
print(str(n1))
print(str(n2))

print(float(n1))
print(int(n2))

n3 = "12.56"
print(float(n3))
# print(int(n3))  # ValueError: invalid literal for int() with base 10: '12.56'

n4 = "hello"  # ValueError: could not convert string to float: 'hello'
# print(float(n4))
# print(int(n4))

i = 10
j = float(i)
print("i的值：", i, "i的类型：", type(i))
print("j的值：", j, "j的类型：", type(j))

k = str(i)
print("i的值：", i, "i的类型：", type(i))
print("k的值：", k, "k的类型：", type(k))
````
