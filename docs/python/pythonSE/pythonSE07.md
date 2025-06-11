# 异常

::: details 参考资料：

- [黑马程序员python教程](https://www.bilibili.com/video/BV1qW4y1a7fU)

:::

## 一、了解异常

程序运行的过程中出现了错误。

程序运行过程中，监测到一个错误导致程序无法继续执行，会抛出错误原因的提示，也称之为 `bug` ：

````python
with open("/Users/cola1213/Downloads/00.txt", "r", encoding="utf-8") as f:
    context = f.read()
    print(context)
````

出现的提示信息为：

````txt
/Users/cola1213/Library/Caches/pypoetry/virtualenvs/beehive-bVkm5Sc1-py3.12/bin/python /Users/cola1213/cola/codes/PycharmProjects/pythonStudy/05/08.py 
Traceback (most recent call last):
  File "/Users/cola1213/cola/codes/PycharmProjects/pythonStudy/05/08.py", line 4, in <module>
    with open("/Users/cola1213/Downloads/00.txt", "r", encoding="utf-8") as f:
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: '/Users/cola1213/Downloads/00.txt'

Process finished with exit code 1
````

## 二、捕获异常

### 2.1.为什么要捕获异常

世界上没有完美的程序，捕获在程序运行过程中可能发生的异常，避免程序中止，提前准备处理可能出现的异常。

在真实工作中, 我们肯定不能因为一个小的BUG就让整个程序全部奔溃，而是对BUG进行提醒, 整个程序继续运行。

### 2.2.捕获常规异常

基本语法：

````python
try:
    可能发生错误的代码
except:
    如果出现异常执行的代码
    
# 未发生错误try全部代码都会执行
# 未发生错误不会执行except中的代码
# 发生错误try中只会执行到报错行为止的代码
# 发生错误会执行except中的代码
````

示例代码：

````python
try:
    with open("/Users/cola1213/Downloads/00.txt", "r", encoding="utf-8") as f:
        context = f.read()
        print(context)
except:
    print("文件不存在")
````

### 2.3.捕获特定异常

捕获指定类型的异常，如果捕获到的异常和指定的异常不一致，则无法捕获。基本语法：

````python
try:
    可能发生错误的代码
except 待捕获异常名 as 别名:
    如果出现异常执行的代码
````

示例代码：

````python
try:
    with open("/Users/cola1213/Downloads/00.txt", "r", encoding="utf-8") as f:
        context = f.read()
        print(context)
except ArithmeticError as e:
    print("算术异常")
````

### 2.4.捕获多个异常

示例代码：

````python
try:
    a = 1 / 0
except FileNotFoundError as fe:
    print("文件不存在2")
except ArithmeticError as ae:
    print("算术异常2")
except Exception as e:
    print("其他异常2")
````

### 2.5.异常else

else表示的是如果没有异常要执行的代码，示例代码：

````python
try:
    1
except Exception as e:
    print("其他异常")
else:
    print("没有异常")
````

### 2.6.异常的finally

finally 是指，无论是否异常都要执行的代码，示例代码：

````python
try:
    f = open("/Users/cola1213/Downloads/00.txt", "r", encoding="utf-8")
except:
    print("文件不存在4")
    f = open("/Users/cola1213/Downloads/00.md", "r", encoding="utf-8")
    print(f'open right file, file path:{f.name}')
else:
    print("文件存在")
finally:
    f.close()
    print("文件关闭")
````

## 三、异常的传递

异常是具有传递性的，比如下面的函数，当 `f1()` 中发生异常且没处理，会将异常传递到 `f2()`， 当 `f2()` 也没有捕获处理异常，异常就会被 `main` 方法捕获并处理：

````python
def f1():
    print("this is f1")
    1 / 0
    print("this is f1 over")

def f2():
    print("this is f2")
    f1()
    print("this is f2 over")
    
if __name__ == '__main__':
    try:
        f2()
    except ArithmeticError as ae:
        print("算术异常")
````

最终执行结果为：

````text
this is f2
this is f1
算术异常
````

利用异常具有传递性的特点, 当我们想要保证程序不会因为异常崩溃的时候, 就可以在主函数中设置异常捕获。由于无论在整个程序哪里发生异常, 最终都会传递到主函数中, 这样就可以确保所有的异常都会被统一捕获。
