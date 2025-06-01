# 数据容器

::: details 参考资料：

- [黑马程序员python教程](https://www.bilibili.com/video/BV1qW4y1a7fU)

:::

「数据容器」是指，一种可以容纳多份数据的数据类型，容纳的每一份数据称之为1个元素。每一个元素，可以是任意类型的据数，如字符串、数字、布尔等。

根据特点的不同可分为5类：

- 列表（list）
- 元组（tuple）
- 字符串（str）
- 集合（set）
- 字典（dict）

## 一、list

### 1.格式

列表（`list`）的基本格式为：

````python
# 定义列表
变量名称 = [元素1, 元素2, 元素3, 元素4, 元素5]

# 定义空列表
变量名称 = []
变量名称 = list()
````

- 列表内每一个元素之间用, 逗号隔开；
- 列表可以一次存储多个数据，且可以为不同的数据类型，支持嵌套；

示例：

````python
my_list_1 = ["观止", 20, True, ["guanzhi", 20]]
my_list_2 = ["观止", 20, True]
print(my_list_2)
print(type(my_list_1))
# 输出
# ['观止', 20, True]
# <class 'list'>
````

### 2.下标索引

可以使用「下标索引」从列表中取出特定位置的数据：

- 列表中的每一个元素，都有其对应位置下标索引
- 要注意下标索引的取值范围(有值的位置)，超出范围(没值的位置)无法取出元素，并且会报错

正向索引：

````python
# 语法： 列表[下标索引]
my_list = ["李白", "章北海", "杜甫"]
print(my_list[0]) # 打印 李白
print(my_list[1]) # 打印 章北海
print(my_list[2]) # 打印 杜甫
````

反向索引：

````python
my_list = ["李白", "章北海", "杜甫"]
print(my_list[-1]) # 打印 杜甫
print(my_list[-2]) # 打印 章北海
print(my_list[-3]) # 打印 李白
````

如果列表是嵌套的列表，同样支持下标索引，且用法与上述类似:

````python
# 语法： 列表[外层列表下标索引][内层列表下标索引]
my_list = [["李白", "章北海"], ["罗辑", "杜甫"]]
print(my_list[0][0]) # 打印 李白
print(my_list[0][1]) # 打印 章北海
print(my_list[1][0]) # 打印 罗辑
print(my_list[1][1]) # 打印 杜甫
````

### 3.常用操作

列表提供了一系列方法：

| 使用方式              | 	作用                          |
|-------------------|------------------------------|
| 列表.append(元素)     | 	向列表中追加一个元素                  |
| 列表.extend(容器)     | 	将数据容器的内容依次取出，追加到列表尾部        |
| 列表.insert(下标, 元素) | 	在指定下标处，插入指定的元素              |
| del 列表[下标]	       | 删除列表指定下标元素                   |
| 列表.pop(下标)	       | 删除列表指定下标元素                   |
| 列表.remove(元素)     | 	从前向后，删除此元素第一个匹配项            |
| 列表.clear()	       | 清空列表                         |
| 列表.count(元素)      | 	统计此元素在列表中出现的次数              |
| 列表.index(元素)	     | 查找指定元素在列表的下标 找不到报错ValueError |
| len(列表)	          | 统计容器内有多少元素                   |

- 查询元素

````python
# 查找指定元素在列表的下标，如果找不到，报错ValueError
my_list = ["李白", "章北海", "罗辑", "杜甫"]
print(my_list.index("罗辑"))  # 打印 2
print(my_list.index("观止"))  # 打印 ValueError: '观止' is not in list
````

- 修改元素

````python
# 直接对指定下标（正向、反向下标均可）的值进行：重新赋值（修改）
my_list = ["李白", "章北海", "罗辑", "杜甫"]
my_list[0] = "观止"
my_list[-1] = "study"
print(my_list)  # 打印 ['观止', '章北海', '罗辑', 'study']
````

- 插入元素

````python
# 在指定的下标位置，插入指定的元素
my_list = ["李白", "章北海", "罗辑"]
my_list.insert(1, "观止")
print(my_list)  # 打印 ['李白', '观止', '章北海', '罗辑']
````

- 追加元素

````python
# 将指定元素，追加到列表的尾部
my_list = ["李白", "章北海", "罗辑"]
my_list.append("观止")
print(my_list)  # 打印 ['李白', '章北海', '罗辑', '观止']
# 将其它数据容器的内容取出，依次追加到列表尾部
my_list_1 = ["李白", "章北海"]
my_list_2 = ["罗辑", "观止"]
my_list_1.extend(my_list_2)
print(my_list_1)  # 打印 ['李白', '章北海', '罗辑', '观止']
````

- 删除元素

````python
# 语法一:del 列表[下标]
my_list = ["李白", "章北海", "罗辑"]
del my_list[0]
print(my_list)  # 打印 ['章北海', '罗辑']
# 语法二:列表.pop(下标)
my_list = ["李白", "章北海", "罗辑"]
my_list.pop(0)
print(my_list)  # 打印 ['章北海', '罗辑']
# 语法三:列表.remove(元素)，删除某元素在列表中的第一个匹配项
my_list = ["李白", "章北海", "罗辑", "李白"]
my_list.remove("李白")
print(my_list)  # 打印 ['章北海', '罗辑', '李白']
````

- 清空列表内容

````python
# 语法:列表.clear()
my_list = ["李白", "章北海", "罗辑"]
my_list.clear()
print(my_list)  # 打印 []
````

- 统计某元素在列表内的数量

````python
# 语法:列表.count(元素)
my_list = ["李白", "章北海", "罗辑", "李白"]
num = my_list.count("李白")
print(num)  # 打印 2
````

- 统计列表内有多少元素

````python
# 语法:len(列表)
my_list = ["李白", "章北海", "罗辑", "李白"]
print(len(my_list))  # 打印 4
````

### 4.列表的遍历

将容器内的元素依次取出进行处理的行为，称之为：

- 遍历
- 迭代

#### 4.1.while循环遍历

基本格式为：

````python
index = 0
while index < len(列表):
    元素 = 列表[index]
#    对元素进行处理
    index += 1 
````

示例：

````python
my_list = [1, 2, 3, 4]
index = 0
while index < len(my_list):
    num = my_list[index]
    print(num)
    index += 1
# 输出
# 1
# 2
# 3
# 4
````

#### 4.2.for循环遍历

依次取出元素并赋值到临时变量上,在每一次的循环中，可以对临时变量（元素）进行处理。基本格式：

````python
for 临时变量 in 数据容器:
    对临时变量（元素）进行处理
````

示例：

````python
my_list = [1, 2, 3, 4]
for x in my_list:
    print(x)
# 输出
# 1
# 2
# 3
# 4
````

#### 4.3.for与while对比

在循环控制上：

- while循环可以自定循环条件，并自行控制 
- for循环不可以自定循环条件，只可以一个个从容器内取出数据

在无限循环上：

- while循环可以通过条件控制做到无限循环 
- for循环理论上不可以，因为被遍历的容器容量不是无限的

在使用场景上：

- while循环适用于任何想要循环的场景 
- for循环适用于，遍历数据容器的场景或简单的固定次数循环场景

### 5.列表小结

列表特点:

- 可以容纳多个元素（上限为2**63-1、9223372036854775807个） 
- 可以容纳不同类型的元素（混装） 
- 数据是有序存储的（有下标序号） 
- 允许重复数据存在 
- 可以修改（增加或删除元素等）

## 二、tuple

「元素」同列表一样,但一旦定义完成，就不可修改，可以理解成只读的列表。

### 1.基本格式

元组的定义使用小括号，且使用逗号隔开各个数据，数据可以是不同的类型：

````python
# 定义元组
变量名称 = (元素1, 元素2, 元素3, 元素4, 元素5)
# 定义只有一个元素的元组
变量名称 = (元素1,)
# 定义空元组
变量名称 = ()
变量名称 = tuple()
````

使用示例：

- 元组只有一个数据，这个数据后面要添加逗号，否则不是元组

````python
my_tuple_1 = ("观止", 20, True, ("guanzhi", 20))
my_tuple_2 = ("观止", 20, True)
print(my_tuple_2)
print(type(my_tuple_1))
# 输出
# ('观止', 20, True)
# <class 'tuple'>

# 元组只有一个数据，这个数据后面要添加逗号，否则不是元组
my_tuple = ("观止")
print(type(my_tuple))  # 打印 <class 'str'>
my_tuple = ("观止",)
print(type(my_tuple))  # 打印 <class 'tuple'>

# 获取值方式与列表一致
# my_tuple = ((1, 2, 3), (4, 5, 6))
# print(my_tuple[0][0]) # 打印 1
````

### 2.元组的操作

元组由于不可修改的特性，所以其操作方法非常少：

| 方法            | 	作用                       |
|---------------|---------------------------|
| 元组.index(元素)	 | 查找某个数据，如果数据存在返回对应的下标，否则报错 |
| 元组.count(元素)  | 	统计某个数据在当前元组出现的次数         |
| len(元组)	      | 统计元组内的元素个数                |

示例：

````pyhton
# 1.查询元素
my_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
print(my_tuple.index(5))

# 2.统计某个数据在元组内出现次数
my_tuple = (1, 2, 3, 4, 5, 5, 5, 8, 9, 10)
print(my_tuple.count(5))

# 3.统计元组内元素个数
print(len(my_tuple))

# 4.不可以修改元组的内容，否则会直接报错
my_tuple = (1, True, "观止")
# my_tuple[0] = 5  # 报错 'tuple' object does not support item assignment

# 5.可以修改元组内的list的内容（修改元素、增加、删除、反转等）
my_tuple = (1, True, [2, 3, 4])
my_tuple[2][0] = 5
print(my_tuple)  # 打印 (1, True, [5, 3, 4])
````

### 3.元组小结

- 可以与列表一样使用for与while循环遍历； 
- 多数特性和list一致，不同点在于不可修改的特性； 
- 可以容纳多个数据； 
- 可以容纳不同类型的数据（混装）； 
- 数据是有序存储的（下标索引）； 
- 允许重复数据存在；
- 不可以修改（增加或删除元素等）；

## 三、str

「字符串」是字符的容器，一个字符串可以存放任意数量的字符；同元组一样,字符串是一个无法修改的数据容器。

### 1.索引取值

同列表、元组一样，字符串也可以通过下标进行访问：

````python
name = "julie"
# 从前向后，下标从0开始；
print(name[0]) #j
# 从后向前，下标从-1开始  
print(name[-2]) #i
````

### 2.操作

字符串中的常用操作为：

| 操作                          | 	说明                                    |
|-----------------------------|----------------------------------------|
| 字符串[下标]                     | 	根据下标索引取出特定位置字符                        |
| 字符串.index(字符串）              | 	查找给定字符的第一个匹配项的下标                      |
| 字符串.replace(字符串1, 字符串2)	    | 将字符串内的全部字符串1，替换为字符串2 不会修改原字符串，而是得到一个新的 |
| 字符串.split(字符串)	             | 按照给定字符串，对字符串进行分隔 不会修改原字符串，而是得到一个新的列表   |
| 字符串.strip() 字符串.strip(字符串)	 | 移除首尾的空格和换行符或指定字符串                      |
| 字符串.count(字符串)              | 	统计字符串内某字符串的出现次数                       |
| len(字符串)	                   | 统计字符串的字符个数                             |

示例：

````python
# 1. 查找指定元素在字符串的下标，如果找不到，报错ValueError
name = "xiaozhang"
print(name.index("z"))
# print(name.index("b")) # ValueError: substring not found
# 2. 将字符串中的指定元素替换成新的元素
new_name = name.replace("z", "Z")
print(name)  # xiaozhang
print(new_name)  # xiaoZhang
# 3. 将字符串按照指定的分隔符进行分割，返回一个列表对象
name = "guanzhi,study,20"
new_list = name.split(",")
print(name)  # 打印 guanzhi,study,20
print(new_list)  # 打印 ['guanzhi', 'study', '20']
print(type(new_list))  # 打印 <class 'list'>
# 4. 去除字符串前后的空格
name = "  guanzhi  "
new_name = name.strip()
print(new_name)  # 打印 guanzhi
# 5. 去除字符串的指定字符
name = "20guanzhi20"
new_name = name.strip("20")
print(name)  # 打印 20guanzhi20
print(new_name)  # 打印 guanzhi
# 6. 统计字符串中指定字符出现的次数
name = "20guanzhi20"
print(name.count("20"))  # 打印 2
# 7. 统计字符串的长度
name = "20guanzhi 20"
print(len(name))  # 打印 12
````

### 3.小结

同列表、元组一样，字符串也支持 `while` 循环和 `for` 循环进行遍历，特点：

- 只可以存储字符串；
- 长度任意（取决于内存大小）；
- 支持下标索引；
- 允许重复字符串存在；
- 不可以修改（增加或删除元素等）；
- 基本和列表、元组相同；

不同与列表和元组的在于：

- 字符串容器可以容纳的类型是单一的，只能是字符串类型； 

不同于列表，相同于元组的在于：

- 字符串不可修改；

## 四、slice

### 1.序列

「序列」是指内容连续、有序，可使用下表索引的一类数据容器：

- 列表、元组、字符串，均可视为序列

### 2.切片

「切片」是指，从一个序列中，取出一个子序列：

````python
# 切片
name = "julie"
# 语法： 列表[开始索引:结束索引:步长]
# - 开始索引表示截取的开始索引，可为空，默认为0
# - 结束索引表示截取的结束索引，可为空，默认为列表末尾索引
# - 步长表示截取的间隔，可为空，默认为1
print(name[0:4:2])  # jl
print(name[0:4])  # juli
````

### 3.基本用法

示例：

````python
my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# 下标1到5(不含5)
new_list = my_list[1:5]
print(new_list)  # [1, 2, 3, 4]

# 从头开始到最后结束，步长为1
new_list = my_list[:]
print(new_list)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 步长为2
new_list = my_list[::2]
print(my_list)  # [0, 2, 4, 6, 8, 10]

# 从头开始到5结束，步长为2
new_list = my_list[:5:2]
print(new_list)  # [0, 2, 4]

# 反转
new_list = my_list[::-3]
print(new_list)  # [10, 7, 4, 1]
````

## 五、set

集合（`set`）不支持元素的重复（自带祛重功能），并且元素无序。

### 1.基本格式

`set` 的格式为：

````python
# define set
a = {1, 2, 3, 4, 5}
# define empty set
b = set()
````

- 以 `{}` 为标识；
- `set` 内每一个元素之间用 `,` 隔开
- `set` 可以一次性存储多个元素，且可以为多个不同的数据类型，支持嵌套

### 2.遍历

`set` 不支持下标索引，所以不可以使用 `while` 循环：

````python
# iterate set
for i in a:
    print(i)
````

### 3.常用操作

- 单 set：

````python
my_set = {1, 1, 2}
# 1. add element to set
my_set.add(3)
print(my_set)  # {1, 2, 3}

# 2. remove element from set
my_set.remove(1)
print(my_set)  # { 2, 3}

# 3.  pop random element from set
my_set.pop()
print(my_set)

# 4. clear set
my_set.clear()
print(my_set)  # set()
````

- 双 set：

````python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
# 1. set1 - set2 (set1 not change, set2 not change)
set3 = set1.difference(set2)
print(set3)

# 2.  set1 - set2 (set1 change, set2 not change)
set1.difference_update(set2)
print(set1)

# 3. set1 & set2 (set1 not change, set2 not change)
set1 = {1, 2, 3}
set2 = {3, 4, 5}
set3 = set1.union(set2)
print(set3)
````

## 六、dict

`dict`(字典) 是键值对

### 1.基本格式

`dict` 的格式为：

````python
# define dict
my_dict = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
# define empty dict
my_dict = {}
my_dict = dict()
````

- 使用 `{}` 存储数据，每一个元素就是一个键值对；
- 每一个键值对包含 key 和 value ，用冒号分割
- 键值对之间用逗号分隔
- key 和 value 可以是任意类型的数据，key 不能为 dict
- key 不可重复，重复会对原有的数据进行覆盖

### 2.使用

| 操作              | 	说明                           |
|-----------------|-------------------------------|
| 字典[Key]	        | 获取指定Key对应的Value值              |
| 字典[Key] = Value | 	添加或更新键值对                     |
| 字典.pop(Key)     | 	取出Key对应的Value并在字典内删除此Key的键值对 |
| 字典.clear()      | 	清空字典                         |
| 字典.keys()	      | 获取字典的全部Key，可用于for循环遍历字典       |
| len(字典)	        | 计算字典内的元素数量                    |

示例：

````python
my_dict = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
# 1.  get value
print(my_dict.get("name"))  # John

# 2. add or update value
my_dict["name"] = "Jane"
my_dict["country"] = "China"
print(my_dict)  # {'name': 'Jane', 'age': 30, 'city': 'New York', 'country': 'China'}

# 3. delete value
name = my_dict.pop("name")
print(name)  # Jane
print(my_dict)  # {'age': 30, 'city': 'New York', 'country': 'China'}

# 4. get all keys
keys = my_dict.keys()
print(keys)  # dict_keys(['age', 'city', 'country'])

# 5. length  of dict
print(len(my_dict))  # 3

# 6. clear dict
my_dict.clear()
print(my_dict)  # {}
````

特点：

* 可以容纳多个数据
* 可以容纳不同类型的数据
* 每一份数据是Key-Value键值对
* 可以通过Key获取到Value，Key不可重复（重复会覆盖）
* 不支持下标索引
* 可以修改（增加或删除更新元素等）
