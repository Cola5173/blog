# Python

::: details 参考资料：

- [【零基础 快速学Python】 韩顺平 (适合Python零基础 Python初学入门)](https://www.bilibili.com/video/BV1zN4y1v7Vv)
- [Python基础学习（三）运算符](https://blog.csdn.net/qingxuly/article/details/143206270)

:::

## 运算符

「运算符」是一种特殊的符号，用以表示数据的运算、赋值和比较等。

---

### 1、算术运算符

「算术运算符」，是对数据类型的变量进行运算的。算术运算符一览：

| 运算符	 | 运算	                 | 范例           | 	结果  |
|------|---------------------|--------------|------|
| `+`	 | 加	                  | 5+5	         | 10   |
| `-`	 | 减	                  | 6-4	         | 2    |
| `*`  | 	乘	                 | 3* 4	        | 12   |
| `/`	 | 除                   | 	5/5	        | 1    |
| `%`  | 	取模（取余）	            | 7%5	         | 2    |
| `//` | 	取整除-返回商的整数部分（向下取整） | 	9//2，-9//2	 | 4，-5 |
| `**` | 	返回 x 的 y 次幂        | 	2** 4       | 	16  |

示例：

````py
# 演示算术运算符的使用
# 对于除号，返回结果包含小数
print(10 / 3)  # 3.3333333333333335
# 取整数，返回商的整数部分，向下取整
print(10 // 3)  # 3
print(-10 // 3)  # -4
print(10 // -3)  # -4
# a % b = a - a // b * b
print(10 % 3)  # 1
print(-10 % 3)  # 2
print(10 % -3)  # -2
````

### 2、比较运算符

「比较运算符」的结果要么是 `true` 要么是 `false` 。比较运算符一览：

| 运算符	      | 运算               | 	范例	     | 结果     |
|-----------|------------------|----------|--------|
| `==`	     | 等于               | 	4 == 3  | 	False |
| `!=`	     | 不等于              | 	4 != 3	 | True   |
| `<`	      | 小于               | 	4 < 3	  | False  |
| ` >`	     | 大于	              | 4 > 3	   | True   |
| `<=`	     | 小于等于             | 	4 <= 3	 | False  |
| `>= `     | 	大于等于	           | 4 >= 3   | 	True  |
| `is`	     | 判断两个变量引用对象是否为同一个 | 	        | 	      |
| `is not`	 | 判断两个对象引用对象是否不同   |          |        |

示例：

````py
# 比较运算符的使用
a = 9
b = 8
print(a > b)  # true
print(a >= b)  # true
print(a <= b)  # false
print(a < b)  # false
print(a == b)  # false
print(a != b)  # true
flag = a > b
print("flag =", flag)  # true
print(a is b)  # false
print(a is not b)  # true

str1 = "abc#"
str2 = "abc#"
print(str1 == str2)  # true
print(str1 is str2)  # true, 交互模式下为False
````

### 3、逻辑运算符

「逻辑运算符」也被称为布尔运算符。逻辑运算符一览表（假设 a = 10 ，b = 20）：

| 运算符    | 	逻辑表达式   | 	描述	                                               | 实例                     |
|--------|----------|----------------------------------------------------|------------------------|
| `and`	 | x and y	 | 布尔“与”：如果 x 为 False，返回 x 的值，否则返回 y 的计算值。            | 	(a and b) 返回 20       |
| `or`	  | x or y	  | 布尔“或”：如果 x 为 True，返回 x 的值，否则返回 y 的计算值。	            | (a or b) 返回 10         |
| `not`  | 	not a	  | 布尔“非“：如果 x 为 True，返回 False。如果 x 为 False，它返回 True。	 | not (a and b) 返回 False |

- 只有当第一个为 true 时 ，才会验证 `and` 的第二个 
- 只有当第一个为 false 时，才会验证 `or` 的第二个

示例：

````py
# 逻辑运算符
a = 10
b = 20
print(a and b)  # 20
print(a or b)  # 10
print(not a)  # false

# and 使用细节
score = 70
if (score >= 60 and score <= 80):
    print("成绩还不错~")

a = 1
b = 99
print(a and b)  # 99
print((a > b) and b)  # false
print((a < b) and b)  # 99

# or 使用细节
score = 70
if score <= 60 or score >= 80:
    print("hi~")

a = 1
b = 99
print(a or b)  # 1
print((a > b) or b)  # 99
print((a < b) or b)  # true

# not 使用细节
a = 3
b = not (a > 3)
print(b)  # true
print(not False)  # true
print(not True)  # false
print(not 0)  # true
print(not "jack")  # false
print(not 1.88)  # false
print(not a)  # false
````

### 4、赋值运算符

「赋值运算符」就是将某个运算后的值，赋给指定的变量。赋值运算符一览：

| 运算符	  | 描述	         | 实例                            |
|-------|-------------|-------------------------------|
| `=`   | 	简单的赋值运算符   | 	c = a + b 将 a + b 的运算结果赋值为 c |
| `+=`	 | 复合加法赋值运算符	  | c += a 等效于 c = c + a          |
| `-=`	 | 复合减法赋值运算符   | 	c -= a 等效于 c = c - a         |
| `*=`	 | 复合乘法赋值运算符	  | c * = a 等效于 c = c * a         |
| `/=`  | 	复合除法赋值运算符  | 	c /= a 等效于 c = c / a         |
| `%=`	 | 复合取模赋值运算符   | 	c %= a 等效于 c = c % a         |
| `**=` | 	复合幂赋值运算符	  | c **= a 等效于 c = c **a         |
| `//=` | 	复合取整除赋值运算符 | 	c //= a 等效于 c = c // a       |

示例：

````py
# 赋值运算符
num1 = 10
i = 100
i += 100  # => i = i + 100
print("i =", i)  # 200
i -= 100  # => i = i - 100
print("i =", i)  # 100
i *= 3  # i = i * 3
print("i =", i)  # 300

# 有两个变量，a 和 b，要求将其进行交换，最终打印结果
# 方法1
a = 30
b = 40
print(f"没有交换前 a={a} b={b}")
temp = a
a = b
b = temp
print(f"交换后 a={a} b={b}")

# 方法2
a = 30
b = 40
print(f"没有交换前 a={a} b={b}")
a, b = b, a
print(f"交换后 a={a} b={b}")

# 方法3
a = 30
b = 40
print(f"没有交换前 a={a} b={b}")
a = a + b
b = a - b
a = a - b
print(f"交换后 a={a} b={b}")
````

### 5、三元运算符

在 python 中「三元运算符」的语法为：

````py
max = a if a > b else b
````

示例：

````py
# 三元运算符
# 获取两个数的最大值
a = 10
b = 80
max = a if a > b else b
print(f"max={max}")

# 获取三个数的最大值
a = 10
b = 30
c = 20
max1 = a if a > b else b
max2 = max1 if max1 > c else c
print(f"max2={max2}")

# 可以支持嵌套使用，但是可读性差，不推荐
max = (a if a > b else b) if (a if a > b else b) > c else c
print(f"max={max}")
````

### 6、运算符优先级

运算符有不同的优先级，所谓优先级就是表达式的运算顺序：

| 分类	   | 运算符	                                  | 描述                |
|-------|---------------------------------------|-------------------|
| 算术运算符 | 	（expressions）                        | 	添加圆括号的表达式        |
|       | **                                    | 	乘方               |
|       | *，@，/，//，%	                           | 乘，矩阵乘，除，整除，取余     |
|       | + -	                                  | 加法减法              |
| 位运算	  | >>，<<	                                | 右移，左移运算符（移位）      |
|       | &	                                    | 按位与               |
|       | ^	                                    | 按位异或              |
|       | `                                     | `                 |	按位或|
| 比较运算  | 	in，not in，is，is not，<，<=，>，>=，!=，==	 | 比较运算，包括成员检测和标识号检测 |
| 逻辑运算	 | not x                                 | 	布尔逻辑非 NOT        |
|       | and	                                  | 布尔逻辑与 AND         |
|       | or	                                   | 布尔逻辑或 OR          |
| 赋值运算	 | =，%=，/=，//=，-=，+=，*=，**=	             | 赋值运算符             |

### 7、标识符的命名规则和规范

标识符的命名规则：

- 由 26 个英文字母大小写，0-9，_组成
- 数字不可以开头
- 不可以使用关键字，但能包含关键字
- Python 区分大小写 
- 标识符不能包含空格

````py
# 1. 由26个英文字母大小写，0-9，_组成。
num9_N = 100
# 2. 数字不可以开头。
# 1num = 100
# 3. 不可以使用关键字，但能包含关键字。
# if = 100
my_if = 100
# 4. Python区分大小写。
n = 100
N = 200
print("n =", n, "N =", N)
# 5. 标识符不能包含空格。
my_name = "hi"
# my name = "hi"
````

标识符的命名规范：
- 变量名：变量要小写，若有多个单词，使用下划线分开
- 常量全部大写
- 函数名一律小写，如果有多个单词，用下划线隔开
- 私有函数以双下划线开头
- 类名：使用大驼峰命名，多个单子的首字母用大写开头，比如：MyName

````py
num = 20
my_friend_age = 21
PI = 3.1415926

def my_func(var1, var2):
    pass
def __private_func(var1, var2):
    pass

class SheetParser:
    pass
class Foo:
    pass
````

### 8、关键字

「关键字」是被 Python 语言赋予了特殊含义，用做专门用途的字符串（单词）。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/04.png" alt="基本概念" style="margin: auto;zoom: normal">

### 9、键盘输入

在编程中，需要接收用户输入的数据，就可以使用键盘语句来获取。

`input(prompt)` 如果存在 prompt 实参，则将其写入标准输出，末尾不带换行符。接下来，该函数从输入中读取一行，将其转换为**字符串**（除了末尾的换行符）并返回。示例：

````py
# 可以从控制台接收用户信息，【姓名，年龄，薪水】
name = input("请输入姓名：")
age = input("请输入年龄：")
score = input("请输入成绩：")

print("\n输入的信息如下：")
print("name:", name)
print("age:", age)
print("score:", score)

# 注意：接收到的数据类型是str。
# print(10 + score)  # TypeError: unsupported operand type(s) for +: 'int' and 'str'
# 如果我们希望对接收到的数据进行算术运算，则需要进行类型转换。
print(10 + float(score))

# 当然，我们也可以在接收数据的时候，直接转成需要的类型
age = int(input("请输入年龄："))
print("age的类型是：", type(age))
````
