# Python

::: details 参考资料：

- [【零基础 快速学Python】 韩顺平 (适合Python零基础 Python初学入门)](https://www.bilibili.com/video/BV1zN4y1v7Vv)
- [Python基础学习（四）程序控制结构](https://blog.csdn.net/qingxuly/article/details/143206293)

:::

## 程序控制结构

「程序控制结构」是指控制程序如何执行的，主要有三大流程控制语句：

- 顺序控制
- 分支控制
- 循环控制

---

### 1、顺序控制

「顺序控制」是指程序从上到下逐行的执行，中间没有任何的判断和跳转。

示例：

````py
# 顺序控制
# 顺序控制
print("程序开始执行")
print("1.小明去上学")
print("2.小明学习中")
print("3.小明放学了")
print("策划给你续执行结束")

# Python中定义变量时采用合法的前向引用
num1 = 12
num2 = num1 + 2
````

### 2、分支控制

「分支控制」是让程序有选择的执行，分支控制有三种：单分支、双分支、多分支。

#### 2.1.单分支

「单分支」是通过 `if` 语句来实现的，基本语法如下：

````py
if 条件表达式:
  代码块
````

- 当条件表达式为 True 时，就会执行代码块；如果为 False，就不执行
- Python **缩进**非常重要，是用于界定代码块的，相当于其他编程语言中的大括号{}
  - 最短的缩进对较长的有包含关系，缩进前后没有要求，但是每个代码块应具有相同的缩进长度（TAB 或者相同个数的空格）
  - 可以看成，和其它语言相比：其它语言的代码块是用{}表示的，Python 缩进就代替了{}

示例：

````py
# 单分支 if
if 4 < 1:
    print("ok1")
    print("ok2")
print("ok3")  # 打印

if 100 > 20:
    print("ok4")  # 打印
    print("ok5")  # 打印
    if 8 > 2:
        print("ok6")  # 打印
````

#### 2.2.双分支

「双分支」的基本语法如下：

````py
if 条件表达式:
  执行代码块1
else:
  执行代码块2
````

- 条件表达式为 `true` ，则执行代码块1，否则执行代码块2
- 只能二选一执行，不可能都执行，也不可能都不执行

示例：

````py
# 判断一个年份是否是闰年，闰年的条件是符合下面二者之一：（1）年份能被4整除，但不能被100整除（2）能被400整除
year = 2024
if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print(f"{year} 是闰年")
else:
    print(f"{year} 不是闰年")
````

#### 2.3.多分支

「多分支」的语法如下：

````py
if 条件表达式1:
    执行代码块1
elif 条件表达式2：
    执行代码块2
...
else:
    执行代码块n+1
````

- 当条件表达式 1 成立时，即执行代码 1
- 如果表达式 1 不成立，才去判断表达式 2 是否成立
- 如果表达式 2 成立，就执行代码块 2 
- 以此类推，如果所有的表达式都不成立则执行 else 的代码块
- 只能有一个执行入口

示例：

````py
# 参加Python考试，根据得分获得对应奖励
score = int(input("请输入成绩[整数]："))
if score >= 0 and score <= 100:
    if score == 100:
        print("BWM")
    elif score > 80 and score <= 99:
        print("iphone13")
    elif score >= 60 and score <= 80:
        print("ipad")
    else:
        print("none")
else:
    print(score, "不在0~100")
````

### 3、嵌套分支

「嵌套分支」是指在一个分支结构中又嵌套了另一个分支结构，里面的分支的结构称为内层分支，外面的分支结构称为外层分支。语法：

````py
if:
    if:
        # if-else...
    else:
        # if-else...
````

注意：一般不要超过3层，否则影响可读性不好。

示例：

````py
# 参加歌手比赛，如果初赛成绩大于8.0进入决赛，否则提示淘汰。并根据性别提示进入男子组或女子组，输入成绩和性别，进行判断和输出信息。
score = float(input("请输入你的成绩："))

if score > 8.0:
    gender = input("请输入你的性别（男|女）：")
    if gender == "男":
        print("男子组决赛")
    else:
        print("女子组决赛")
else:
    print("淘汰")
````

### 4、for循环

「for循环」就是让你的代码可以循环的执行，语法：

````py
for <变量> in <范围/序列>:
    <循环操作语句>
````

- `for`、`in` 是关键字，是规定好的
- <范围/序列> 可以理解成要处理的数据集，需要是可迭代对象（比如字符串，列表等…）
- 循环操作语句，这里可以有多条语句，也就是我们要循环执行的代码，也叫循环体 
- python 的 for 循环是一种「轮询机制」，是对指定的数据集，进行轮询处理

示例：

````py
# 编写一个程序，可以打印5句 “hsp” 。
# 定义一个列表（后面详细介绍），可以视为一个数据集
nums = [1, 2, 3, 4, 5]
print(nums, type(nums))

for i in [1, 2, 3, 4, 5]:
    print("hsp", i)

for i in nums:
    print("hsp", i)
````

for 循环控制流程图：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/05.png" alt="for循环执行流程图" style="margin: auto;zoom: normal">

注意实现和细节说明：

- 循环时，依次将序列中的值取出赋给变量
- 如需要遍历数字序列，可以使用内置 `range()` 函数，它会生成数列

`range()` 函数生成数列是`前闭后开`的，函数解释：

````py
# range函数解读
class range(stop)
class range(start, stop, step=1)
# 1、虽然被称为函数，但 range 实际上是一个不可变的序列类型。
# 2、range 默认增加的步长 step是1，也可以指定，start 默认是0。
# 3、通过list() 可以查看range() 生成的序列包含的数据。
# 4、range() 生成的数列是前闭后开。
````

示例：

````py
# 1、生成一个 [1, 2, 3, 4, 5]
r1 = range(1, 6, 1)
r1 = range(1, 6)
print("r1 = ", list(r1))

# 2、生成一个 [0, 1, 2, 3, 4, 5]
r2 = range(0, 6, 1)
r2 = range(0, 6)
print("r2 = ", list(r2))

# 3、生成一个 r3 =  [1, 3, 5, 7, 9]
r3 = range(1, 10, 2)
print("r3 = ", list(r3))

# 4、输出10句"hello, python"
for i in range(10):
print("hello, python")
````

并且 `for` 可以和 `else` 搭配使用：

````py
for <variable> in <ssequence>:
    <statements>
else:
    <statements>
````

for 循环正常的完成遍历，在遍历过程中，没有被打断，会进入 else 代码块。

示例：

````py
# for-else案例
nums = [1, 2, 3]
for i in nums:
    print("hsp")
    # 演示break
    # if i == 2:
    #     break  # 中断-提前结束for
else:
    print("没有循环数据了..."
````

### 5、while循环

「while循环」用于在表达式为真的情况下，重复的（循环的）执行，语法：

````py
while 判断条件(condition):
    循环操作语句(statements)...
````

- while 是关键字，是规定好的 
- 当判断条件为 True 时，就执行循环操作语句，如果为 False，就退出 while
- 循环操作语句，这里可以有多条语句，也就是要循环执行的代码，也叫循环体

示例：
````py
# 使用while完成10句 “hsp”
i = 1
while i <= 10:
print("hsp")
i += 1
````

while 循环控制流程图：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/06.png" alt="while循环执行流程图" style="margin: auto;zoom: normal">

`while` 可以和 `else` 配合使用，在判断条件为 false 时，会执行 else 的语句块，即：在遍历过程中，没有被打断（解释：比如没有执行到 break 语句）。语法：

````py
while 判断条件(condition):
    循环操作语句(statements)
else:
    其它语句<additional_statements(s)>
````

示例：

````py
# while-else使用案例
i = 0
while i < 3:
    print("hsp")
    i += 1
    # 演示break 中断
    # if i == 1:
    #     break
else:
    print("i < 3 不成立 i =", i)
````

### 6、多重循环

「多重循环」是指将一个循环放在另一个循环体内，就形成了嵌套循环。其中，`for` 或 `while` 均可以作为外层循环和内层循环，建议最多只使用两层循环，不要超过三层。

实际上，嵌套循环就是把内层循环当做外层循环的循环体。如果外层循环次数为 m 次，内层为 n 次，则内层循环体实际上需要执行 m*n 次。

示例：

````py
# 如果外层循环次数为m次，内层为n次，则内层循环体实际上需要执行m*n次。
for i in range(2):
    for j in range(3):
        print("i=", i, "j=", j)
````

### 7、break

「break」用于终止某个语句块的执行，使用在循环中。流程图：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/07.png" alt="break执行流程图" style="margin: auto;zoom: normal">

示例：

````py
# 随机生成 1-100 的一个数，直到生成了97这个数，看看一共用了多少次
# random.randint(a, b) 返回随机整数N满足 a<=N<=b。相当于randrange(a, b+1)
import random

count = 0
while True:
    count += 1
    n = random.randint(1, 100)
    print(n)
    if n == 97:
        break
print("count =", count)
````

注意实现和细节说明：

- break 语句是用在 for 或 while 循环所嵌套的代码
- 它会终结最近的外层循环，如果循环有可选的 else 子句，也会跳过该子句 
- 如果一个 for 循环被 break 所终结，该循环的控制变量会保持其当前值

示例：

````py
# 它会终结最近的外层循环，如果循环有可选的else子句，也会跳过该子句。
count = 0
while True:
print("hi")
count += 1
if count == 3:
break
while True:
print("ok")
break
else:
print("hello")

# 如果一个for循环被break所终结，该循环的控制变量会保持其当前值。
nums = [1, 2, 3, 4, 5]
for i in nums:
if i > 3:
break
print("i =", i)
````





````py
````