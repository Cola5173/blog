# Python

::: details 参考资料：

- [【零基础 快速学Python】 韩顺平 (适合Python零基础 Python初学入门)](https://www.bilibili.com/video/BV1zN4y1v7Vv)
- [Python语言描述](https://blog.csdn.net/qingxuly/article/details/143206130)

:::

## Python 语言概述

---

### 1、开发前准备

开发 python 需要安装环境，安装说明详见：[Windows上安装 Python 环境并配置环境变量](https://blog.csdn.net/Lyh1gguyg/article/details/146276117)

使用的开发工具为：[pycharm](https://www.jetbrains.com/pycharm/)，下载后使用即可

---

### 2、转义字符

| 转义字符  | 	说明          |
|-------|--------------|
| `\t`  | 	制表符，实现对齐的功能 |
| `\n`	 | 换行符          |
| `\\`  | 	一个\         |
| `\"`  | 	一个 "        |
| `\'`  | 	一个’         |
| `\r`  | 	一个回车        |

示例：

````py
# \t制表符
print("jack\t20")

# \n换行
print("Hello,jack\nhello,tom")

# \\输出\
print("D:\\Pycharm\\chapter02")

# \"输出"     \'输出'
print("郭靖说：\"hello\"")
print("郭靖说：\'hello\'")
print("郭靖说：'hello'")  # 单引号也可以不适用转义 \

# \r回车
print("嘻嘻哈哈, \r咚咚锵锵") # 先输出嘻嘻哈哈，咚咚锵锵会在同一行覆盖掉嘻嘻哈哈

# exercise
# 请用一行输出语句，输出如下文案
# 姓名	年龄	籍贯	住址
# tom	12	    河北	北京
print("姓名\t年龄\t籍贯\t住址\ntom\t\t12\t\t河北\t北京")
````

---

### 3、注释

`comment`（注释），用于注释说明程序。

- 单行注释：
  ````py
  # 这是一个注释
  ````
- 多行注释：
  ````py
    """
    三个单引号
    print("hello world 4")
    print("hello world 5")
    print("hello world 6")
    """
    
    '''
    三个双引号
    print("hello world 1")
    print("hello world 2")
    print("hello world 3")
    '''
  ````
- 文件编码声明注释：在文件开头加上编码声明，用以指定文件的编码格式
  ````py
  # coding:utf-8
  ````
  
---

### 4、Python 代码规范和文档

#### 4.1.代码规范

使用多行注释来注释多行说明，如果注释函数或者其中的某个步骤，使用单行注释。

使用一次 Tab 操作，实现缩进，默认整体向右移动，使用 Shift+Tab 整体向左移动。

`=` 两边习惯各加一个空格比较规范。

变量之间使用逗号间隔比较清晰。

#### 4.2.文档

[Python 标准库](https://docs.python.org/zh-cn/3/library/index.html) 提供了函数、模块、数值、字符串，也给出了相应的文档，用于告诉开发者如何使用。

示例：

````py
# 演示abs函数的使用
# abs函数返回数字的绝对值，如果参数是字符串，则返回错误信息
print(abs(-20))  # 输出：20
print(abs(4))    # 输出：4
print(abs(-5.6)) # 输出：5.6
````
