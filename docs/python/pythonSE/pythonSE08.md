# 模块和包

::: details 参考资料：

- [黑马程序员python教程](https://www.bilibili.com/video/BV1qW4y1a7fU)

:::

## 一、模块

### 1.含义

`module`(模块)，是一个 python 文件，能定义函数、类和变量，也能包含可执行的代码。

可以认为不同的模块就是不同工具包，每一个工具包中都有各种不同的工具(如函数)，供我们使用进而实现各种不同的功能。

### 2.模块的导入

模块在使用前需要先导入，导入的语法如下：

````python 
[from moduleName] import [module|class|variable|function|*] [as aliasName]
````

常用的组合形式为：

````python
import moduleName
import moduleName as aliasName
from moduleName import class/variable/function
from moduleName import *
from moduleName import xxx as aliasName
````

示例代码(日常开发中，导入模块的代码，一般都是写在文件开头)：

````python
"import time module"
import time

print(f'now is: {time.strftime("%Y-%m-%d %H:%M:%S")}')

"import time module, only use time.sleep() function"
from time import sleep

sleep(2)
print(f'now is: {time.strftime("%Y-%m-%d %H:%M:%S")}')

from time import *

print(f'now is: {strftime("%Y-%m-%d %H:%M:%S")}')
sleep(5)
print(f'now is: {strftime("%Y-%m-%d %H:%M:%S")}')

import time as t

print(f'now is: {t.strftime("%Y-%m-%d %H:%M:%S")}')
````

### 3.自定义模块

python 中已经实现了很多模块，但是也可以自定义模块的实现，自己制作一个模块。

每个Python文件都可以作为一个模块，模块的名字就是文件的名字，也就是说将自己编写的文件导入另一个文件即可当作模块使用。

比如在 `my_module.py` 中定义两个函数：

````python
def add(x, y):
    return x + y


def sub(x, y):
    return x - y
````

在 `test.py` 中导入模块并使用函数：

````python
import my_module

print(my_module.add(1, 2))

print(my_module.sub(1, 2))
````

### 4.注意事项

⚠️ 当导入多个模块的时候，如果模块内有同名功能，后面导入的模块将会覆盖前面模块内同名的功能：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/08/01.png" alt="覆盖功能" style="margin: auto;zoom: normal">

⚠️ 在实际开发中，当一个开发人员编写完一个模块后，为了让模块能够在项目中达到想要的效果，开发人员可能会在在py文件中添加一些测试信息；此时，无论是当前文件，还是其他已经导入了该模块的文件，在运行的时候都会自动执行测试信息：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/08/02.png" alt="测试信息" style="margin: auto;zoom: normal">

解决办法是：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/08/03.png" alt="main解决" style="margin: auto;zoom: normal">

⚠️ 如果一个模块文件中有 `__all__` 变量，当使用 `from xxx import *` 导入时，只能导入这个列表中的元素：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/08/04.png" alt="all" style="margin: auto;zoom: normal">

## 二、包

当 Python 的模块太多了，就可能造成一定的混乱，此时可以通过 Python 包的功能来管理。

### 1.概念

从物理上看，包就是一个文件夹，在该文件夹下包含了一个 `__init__.py` 文件，该文件夹可用于包含多个模块文件.

从逻辑上看，包的本质依然是模块：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/08/05.png" alt="包" style="margin: auto;zoom: normal">

### 2.使用

在 pycharm 中，新建 package 即可，就会在这个 package 目录下显示一个 `__init__.py` 文件：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/python/pythonSE/08/06.png" alt="创建包" style="margin: auto;zoom: normal">

`__init__.py` 文件，控制着包的导入行为：

- 在 `__init__.py` 文件中添加 `__all__ = ['模块名']` ，控制允许导入的模块列表
- 与导入模块类似 `__all__` 只针对 `from 包名 import *` 而对其他方式无效

### 3.第三方包

第三方(其他人)开发的，Python没有内置，需要先安装才可以导入使用。

在Python程序的生态中，有非常多的第三方包（非Python官方），可以极大的帮助我们提高开发效率，如：

- 科学计算中常用的：`numpy` 
- 数据分析中常用的：`pandas` 
- 大数据计算中常用的：`pyspark`、`apache-flink`包
- 图形可视化常用的：`matplotlib`、`pyecharts` 
- 人工智能常用的：`tensorflow`

只需要使用Python内置的pip程序即可，在终端中输入如下指令即可通过网络快速安装第三方包：

````shell
pip install 包名称
````

由于pip是连接的国外的网站进行包的下载，下载速度经常很慢。我们可以通过如下命令，让其连接国内的网站进行包的安装：

````shell
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 包名称
# 网站为清华大学提供的一个网站，可供pip程序下载第三方包
````

如果经常使用上述方法过于麻烦，可直接配置成镜像源之后就不需要加连接：

````shell
python -m pip install --upgrade pip
# 升级pip版本，防止版本过低无法配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# 配置为全局镜像源
````