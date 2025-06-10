# 文件基础操作

::: details 参考资料：

- [黑马程序员python教程](https://www.bilibili.com/video/BV1qW4y1a7fU)

:::

## 一、编码

`enconding`(编码)，是一种规则的集合，记录了内容和二进制之间的相互转换的逻辑。

计算机只能识别 0 和 1 ，使用 `enconding` 可以将数据转换为0和1，存储在硬盘中。

计算机中有许多可用编码：UTF-8、GBK、Big5 等不同的编码，将内容翻译成二进制也是不同的；对内容的编码与解码必须使用同一套编码，否则会导致错误的结果。

`UTF-8` 是目前全球通用的编码格式，除非有特殊需求，否则，一律以 `UTF-8` 格式进行文件编码即可。

## 二、文件操作

在日常生活中，文件操作主要包括打开、关闭、读、写等操作；

操作过程中请务必注意文件路径的书写：

- 只有操作文件与python文件在同一目录才能直接写文件名；
- 新手建议都写文件的绝对路径，不易导致错误发生

### 1.open

使用 `open()` 函数，可以打开一个已经存在的文件，或者创建一个新文件:

````python
open(name, mode, encoding)
# name：是要打开的目标文件名的字符串(可以包含文件所在的具体路径)。
# mode：设置打开文件的模式(访问模式)：只读、写入、追加等。
# encoding:编码格式（推荐使用UTF-8）
````

文件常用的三种基础访问模式，可通过 `mode` 指定:

| 模式 | 	描述                                                          |
|----|--------------------------------------------------------------|
| r  | 	以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。                            |
| w  | 	打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，原有内容会被删除。如果该文件不存在，创建新文件。 |
| a  | 	打开一个文件用于追加。如果该文件已存在，新的内容将会被写入到已有内容之后。 如果该文件不存在，创建新文件进行写入。   |

示例代码：

````python
file_path = "/Users/cola1213/Downloads/03.txt"

# open file
f = open(file_path, "r", encoding="utf-8")
````

### 2.read

文件的读取，每次读取会从上一次读取结束的位置开始，每次 `open()` 中的内容只能被读取一次：

| 操作                | 	功能                      |
|-------------------|--------------------------|
| 文件对象.read(num)    | 	读取指定长度字节 不指定num读取文件全部   |
| 文件对象.readline()	  | 读取一行                     |
| 文件对象.readlines()	 | 读取全部行，返回列表               |
| for line in 文件对象	 | for循环文件行，一次循环得到一行数据      |
| 文件对象.close()	     | 关闭文件对象                   |
| with open() as f	 | 通过with open语法打开文件，可以自动关闭 |

示例代码：

````python
f = open("C:/code/test.txt", "r", encoding="UTF-8")
content = f.read() # 不传入num，读取文件中所有的数据。
print(content)
# 打印
# 观止
# study

f = open("C:/code/test.txt", "r", encoding="UTF-8")
content = f.read(2) # 传入num，读取2字节长度数据。
print(content)
# 打印
# 观止

f = open("C:/code/test.txt", "r", encoding="UTF-8")
content = f.readline()
print(f"第一行内容：{content}")  # 打印 第一行内容：观止
content = f.readline()
print(f"第二行内容：{content}")  # 打印 第二行内容：study

f = open("C:/code/test.txt", "r", encoding="UTF-8")
content = f.readlines()
print(content)  # 打印 ['观止\n', 'study']
print(type(content))  # 打印 <class 'list'>

# 每一个line临时变量，就记录了文件的一行数据
for line in open("C:/code/test.txt", "r", encoding="UTF-8"):
    print(line)
# 打印
# 观止
#
# study

f = open("C:/code/test.txt", "r", encoding="UTF-8")
# 需要执行代码
f.close()

with open("C:/code/test.txt", "r", encoding="UTF-8") as f:
  f.readlines()
````

### 3.write

直接调用 `write` ，内容并未真正写入文件，而是会积攒在程序的内存中，称之为缓冲区

- 当调用 `flush` 的时候，内容会真正写入文件
- `close()` 方法，附带flush()方法的功能

这样做是避免频繁的操作硬盘，导致效率下降（攒一堆，一次性写磁盘）

````python
f = open("C:/code/test.txt", "w")
# 文件如果不存在，使用”w”模式，会创建新文件
# 文件如果存在，使用”w”模式，会将原有内容清空
f.write('hello world')
f.flush()

# 使用a模式，文件不存在会创建文件,文件存在会在最后追加内容写入文件
f = open("C:/code/test.txt", "a")
f.write('study')
f.flush()
````
