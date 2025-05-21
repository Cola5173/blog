# 函数

::: details 参考资料：

- [黑马程序员python教程](https://www.bilibili.com/video/BV1qW4y1a7fU)

:::

## 一、函数基础

「函数」是指，组织好的，可重复使用的，用来实现特定功能的代码段

### 1.完整格式

其完整的格式为：

````python
# 定义
def 函数名(传入参数):
    函数体
    return 返回值

# 使用
函数名(传入参数)
````

- 传入的参数的数量时不受限制的，也可不使用参数
- 返回值不需要，也可省略

### 2.简单格式

简单格式的定义为：

````python
# 定义
def 函数名():
    函数体

# 使用
函数名()
````

函数必须先定义，后使用：

````python
# 定义
def say():
    print("hello world")

# 使用
say()
# 输出 hello world
````

### 3.带参格式

在函数进行计算的时候，可接受外部（调用时）提供的数据：

````python
# 定义
def 函数名(传入参数):
    函数体

# 使用
函数名(传入参数)
````

传入的时候，按照顺序传入数据，参数之间使用逗号进行分割。函数定义中的参数称之为「形式参数」，真正函数调用的时候称之为「实际参数」：

````python
# 定义
def add(x, y):
    res = x + y
    print(res)
# 使用
add(10, 6)
# 输出 16

# 定义
def show(x): 
    print(x)
# 使用
show(10)
# 输出 10
````

### 4.带返回值

「返回值」是指，程序中函数完成事情后，最后给调用者的结果：

````python
# 定义
def 函数名(传入参数):
    函数体
    return 返回值

# 或

def 函数名():
    函数体
    return 返回值
# 使用
变量 = 函数名(传入参数)
变量 = 函数名()
````

函数体在遇到return后就结束了，所以写在return后的代码不会执行：

````python
# 定义
def add(x, y):
    return x + y
    print("end not print") # 在return后不再执行输出

# 使用
res = add(10, 6)
print(res)
# 只输出 16
````

### 5.None类型

如果函数没有使用 return 语句返回数据，函数返回值为 None，其类型是：<class ‘NoneType’>

- None表示：空的、无实际意义的意思

函数返回的None，就表示，这个函数没有返回什么有意义的内容，也就是返回了空的意思：

````python
# 定义
def say():
    print("hello world")
# 使用
mes = say()
# 输出 hello world
print(mes)
print(type(mes))
# 输出
# hello world
# None
# <class 'NoneType'>
````

在 if 中 none 对应的就是 false .

### 6.函数嵌套

「函数嵌套」就是指一个函数里面又调用了另外一个函数：

````pyhton
def fun_1():
    fun_2()
    print("----fun_1-----")

def fun_2():
    fun_3()
    print("----fun_2-----")

def fun_3():
    print("----fun_3----")

fun_1()
# 输出
# ----fun_3----
# ----fun_2-----
# ----fun_1-----
````

## 二、变量的作用域

变量的作用域是指，变量的作用范围（变量在哪里可用，在哪里不可用）

### 1.局部变量

定义在函数体内部的变量，即只在函数体内部生效：

````python
def test():
    num = 100
    print(num)

test() # 输出 100
print(num) # 报错 name 'num' is not defined
````

变量 `num` 是定义在 `test()` 函数内部的变量，在函数外部访问则立即报错.

在函数体内部，临时保存数据，即当函数调用完成后，则销毁局部变量.

### 2.全局变量

在函数体内、外都能生效的变量：

````python
num = 100
def test():
    print(num)
    
test() # 输出 100
print(num) # 输出 100
````

### 3.global关键字

一般情况下，在函数内无法修改全局变量的值：

````python
num = 100
def test():
    # 声明一个值为200的局部变量num
    num = 200
    print(num)

test() # 输出 200
print(num) # 输出 100
````

使用 `global` 关键字可以在函数内部声明变量为全局变量, 如下所示：

````python
num = 100
def test():
    # 声明num为全局变量
    global num
    num = 200
    print(num)

test() # 输出 200
print(num) # 输出 200
````

## 三、进阶

### 1.多返回值

按照返回值的顺序，写对应顺序的多个变量接收即可，变量之间用逗号隔开：

````python
def test():
    return 6, 9, 16
x, y, z= test()

print(f"第一个值为{x},第二个值为{y},第三个值为{z}")
# 输出 第一个值为6,第二个值为9,第三个值为16
````

支持return不同类型的数据：

````python
def test():
    return "观止", True, 16
x, y, z = test()

print(f"第一个值为{x},第二个值为{y},第三个值为{z}")
# 输出 第一个值为观止,第二个值为True,第三个值为16
````

### 2.多种传参方式

调用函数时根据函数定义的「参数位置」来传递参数：

````python
def user_info(name, age, gender):
    print(f"您的名字是{name},年龄是{age},性别是{gender}")

user_info('TOM', 20, '男')
# 输出 您的名字是TOM,年龄是20,性别是男
````

通过「键=值」形式传递参数，可以让函数更加清晰、容易使用，同时也清除了参数的顺序需求：

````python
def user_info(name, age, gender):
    print(f"您的名字是{name},年龄是{age},性别是{gender}")

user_info(name='TOM', age=20, gender='男')
# 输出 您的名字是TOM,年龄是20,性别是男
user_info(gender='男', age=20, name='TOM')
# 输出 您的名字是TOM,年龄是20,性别是男
````

函数调用时，如果有位置参数时，「位置参数必须在关键字参数的前面」，但关键字参数之间不存在先后顺序：

````python
def user_info(name, age, gender):
    print(f"您的名字是{name},年龄是{age},性别是{gender}")

user_info('TOM', gender='男, age=20')
# 输出 您的名字是TOM,年龄是20,性别是男
````

「缺省参数」，也叫默认参数，用于定义函数，为参数提供默认值，调用函数时可不传该默认参数的值

- 所有位置参数必须出现在默认参数前，包括函数定义和调用
- 当调用函数时没有传递参数, 就会使用默认是用缺省参数对应的值.
- 函数调用时，如果为缺省参数传值则修改默认参数值, 否则使用这个默认值

````python
def user_info(name, age, gender='男'):
    print(f"您的名字是{name},年龄是{age},性别是{gender}")

user_info('TOM', 20)
# 输出 您的名字是TOM,年龄是20,性别是男
user_info('TOM', 20, '女')
# 输出 您的名字是TOM,年龄是20,性别是女
````

「不定长参数」，也叫可变参数. 用于不确定调用的时候会传递多少个参数(不传参也可以)的场景.

- 以 `*` 号标记一个形式参数，以元组的形式接受参数
- 传进的所有参数都会被args变量收集，它会根据传进参数的位置合并为一个元组(tuple)，args是元组类型

````python
def user_info(*args):
    print(args)

user_info('TOM')
# 输出 ('TOM',)
user_info('TOM', 20, '女')
# 输出 ('TOM', 20, '女')
````

### 3.函数作为参数传递

函数本身也可以像普通变量一样作为参数传递使用，函数名存放的是函数所在空间的地址：

````python
def func():
    print("hello world~")

print(func) # 打印 <function func at 0x0000022E77983EB0>
````

通过 函数名() 的形式可执行所存放空间中的代码(执行函数):

````python
def func():
    print("hello world~")

func() # 打印 hello world~
````

函数名可以像普通变量一样赋值，`func1 = func2` ：

````python
def func1():
    print("hello world~")

func = func1
func() # 打印 hello world~
````

函数本身也可以像普通变量一样作为参数传递使用

````python
def add(x, y):
    return x + y
def compute(add):
    result = add(6, 3)
    print(result)

compute(add)
# 输出 9
````

### 4.lambda函数

lambda匿名函数，「无名称的函数」，def关键字，可以定义带有名称的函数：

````python
lambda 传入参数：函数体(一行代码)
# lambda 是关键字，表示定义匿名函数
# 传入参数表示匿名函数的形式参数，如：x, y 表示接收2个形式参数
# 函数体，就是函数的执行逻辑，要注意：只能写一行，无法写多行代码
````

- 有名称的函数，可以基于名称重复使用
- lambda关键字，可以定义匿名函数（无名称）
- 无名称的匿名函数，只可临时使用一次

使用示例：

````python
def compute(add):
    result = add(6, 3)
    print(result)
# 输出 9 
compute(lambda x, y: x + y)

# 等效于
def add(x, y):
    return x + y
def compute(add):
    result = add(6, 3)
    print(result)
# 输出 9
compute(add)
````
