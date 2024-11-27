# JavaSE

:::details 学习参考资料：

- [JavaSE 教程](https://www.bilibili.com/video/BV1YP4y1o75f)

:::

## 4.1.基本类型包装类

Java中的基本数据类型却不是面向对象的，如果想通过对象的形式去使用他们，Java提供的基本类型包装类，使得Java能够更好的体现面向对象的思想，同时也使得基本类型能够支持对象操作！

### 4.1.1.包装类介绍

所有的包装类层次结构如下：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/22/mulb5VdvBLiWNe2.png" alt="包装类层次结构">

包装类实际上就是将我们的基本数据类型，封装成一个类（运用了封装的思想）：

```java
private final int value;  //类中实际上就靠这个变量在存储包装的值

public Integer(int value) {
    this.value = value;
}
```

包装类型支持**自动装箱**，可以直接将一个对应的基本类型值作为对应包装类型引用变量的值，也支持自动拆箱：

```java
public static void main(String[] args) {
    Integer i = 10;//装箱
    int a = i;//拆箱
}
```

包装类是一个类，不是基本类型，所以说两个不同的对象，那么是不相等的：

```java
public static void main(String[] args) {
    Integer a = new Integer(10);
    Integer b = new Integer(10);

    System.out.println(a == b);    //虽然a和b的值相同，但是并不是同一个对象，所以说==判断为假
}
```

那么自动装箱的呢？

```java
public static void main(String[] args) {
    Integer a = 10, b = 10;
    System.out.println(a == b);
}
```

通过自动装箱转换的Integer对象，如果值相同，得到的会是同一个对象，这是因为：

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)   //这里会有一个IntegerCache，如果在范围内，那么会直接返回已经提前创建好的对象
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

`IntegerCache` 会默认缓存 -128~127 之间的所有值，如果直接让 -128~
127之间的值自动装箱为Integer类型的对象，那么始终都会得到同一个对象。如果超出这个缓存范围的话，就会得到不同的对象了。

### 4.1.2.特殊包装类

`BigInteger` 可以表示非常大的数字：

```java
public static void main(String[] args) {
    BigInteger i = BigInteger.valueOf(Long.MAX_VALUE);
    i = i.pow(100);   //long的最大值来个100次方吧
    System.out.println(i);
}
```

`BigDecimal` 可以实现小数的精确计算:

```java
public static void main(String[] args) {
    BigDecimal i = BigDecimal.valueOf(10);
    i = i.divide(BigDecimal.valueOf(3), 100, RoundingMode.CEILING);
  	//计算10/3的结果，精确到小数点后100位
  	//RoundingMode是舍入模式，就是精确到最后一位时，该怎么处理，这里CEILING表示向上取整
  	//无限循环的小数，必须要限制长度，否则会出现异常
    System.out.println(i);
}
```

## 4.2.数组

### 4.2.1.一维数组

数组是相同类型数据的有序集合，代表任何相同类型的一组内容（包括引用类型和基本类型）其中存放的每一个数据称为数组的一个元素：

```java
类型[] 变量名称 = new 类型[数组大小];
类型 变量名称[] = new 类型[数组大小];  //支持C语言样式，但不推荐！

类型[] 变量名称 = new 类型[]{...};  //静态初始化（直接指定值和大小）
类型[] 变量名称 = {...};   //同上，但是只能在定义时赋值
```

创建出来的数组每个位置上都有默认值，如果是引用类型，就是null，如果是基本数据类型，就是0，或者是false，跟对象成员变量的默认值是一样的：

```java
public static void main(String[] args) {
    int[] array = new int[10];
    array[0] = 888;//直接给对应下标位置的元素赋值
    System.out.println("数组的第一个元素为："+array[0]);//数组的下标是从0开始
}
```

数组本身也是一个对象，数组对象也是具有属性的，比如长度：

```java
public static void main(String[] args) {
    int[] array = new int[10];
    System.out.println("当前数组长度为："+array.length);//length属性是int类型的值，表示当前数组长度，长度是在一开始创建数组的时候就确定好的
}
```

`length` 是在一开始就确定的，而且是 `final` 类型的，不允许进行修改，也就是说数组的长度一旦确定，不能随便进行修改，如果需要使用更大的数组，只能重新创建。

### 4.2.2.多维数组

存放数组的数组，相当于将维度进行了提升，比如下面的就是一个2x10的数组：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/22/kRcO1aGY6fMBiu9.png" alt="多维数组">

在访问多维数组时，需要使用多次[]运算符来得到对应位置的元素：

```java
public static void main(String[] args) {
    int[][] arr = new int[][]{
                                {1, 2},
            					{3, 4},
            					{5, 6}
            				};
    for (int i = 0; i < 3; i++) {    //要遍历一个二维数组，那么我们得一列一列一行一行地来
        for (int j = 0; j < 2; j++) {
            System.out.println(arr[i][j]);
        }
    }
}
```

### 4.2.3.可变长参数

可变长参数：

```java
public class Person {
    String name;
    int age;
    String sex;

    //可变长参数
    public void test(String... strings){

    }
}
```

在使用时，可以传入0 - N个对应类型的实参：

```java
public static void main(String[] args) {
    Person person = new Person();
    person.test("1！", "5！", "哥们在这跟你说唱"); //自由传入任意数量的字符串
}
```

实际上可变长参数本质就是一个数组，如果同时存在其他参数，那么可变长参数只能放在最后：

```java
public void test(int a, int b, String... strings){
    
}
```

这里最后我们再来说一个从开始到现在一直都没有说的东西：

```java
//这个String[] args到底是个啥？？？
public static void main(String[] args) {
    
}
```

实际上这个是在执行Java程序时，输入的命令行参数。

## 4.3.字符串

字符串类是一个比较特殊的类，它用于保存字符串，是一系列字符的序列。注意，字符串中的字符一旦确定，无法进行修改，只能重新创建。

### 4.3.1.String类

String本身也是一个类，只不过它比较特殊，每个用双引号括起来的字符串，都是String类型的一个实例对象：

```java
public static void main(String[] args) {
    String str = "Hello World!";
    String str2 = new String("Hello World!");  //这种方式就是创建一个新的对象
}
```

如果是直接使用双引号创建的字符串，如果内容相同，为了优化效率，那么始终都是同一个对象。但是如果使用构造方法主动创建两个新的对象，那么就是不同的对象了。

### 4.3.2.StringBuilder

字符串支持使用`+`和`+=`进行拼接操作，但是拼接字符串实际上底层需要进行很多操作，而`StringBuilder`
就是专门用于构造字符串的，可以使用它来对字符串进行拼接、裁剪等操作，它就像一个字符串编辑器，弥补了字符串不能修改的不足：

```java
public static void main(String[] args) {
    StringBuilder builder = new StringBuilder();//一开始创建时，内部什么都没有
    builder.append("AAA");//使用append方法来讲字符串拼接到后面
    builder.append("BBB");
    builder.delete(2, 4);//删除2到4这个范围内的字符
    System.out.println(builder.toString());
}
```

### 4.3.3.正则表达式

正则表达式(`regular expression)`描述了一种字符串匹配的模式（pattern），可以用来检查一个串是否含有某种子串、将匹配的子串替换或者从某个串中取出符合某个条件的子串等。

```java
public static void main(String[] args) {
    String str = "oooo";
  	//matches方法用于对给定正则表达式进行匹配，匹配成功返回true，否则返回false
    System.out.println(str.matches("o+"));   //+表示对前面这个字符匹配一次或多次，这里字符串是oooo，正好可以匹配
}
```

用于规定给定组件必须要出现多少次才能满足匹配的，我们一般称为限定符，限定符表如下：

| 字符    | 描述                                                               |
|-------|------------------------------------------------------------------|
| *     | 匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。***** 等价于 {0,}。           |
| +     | 匹配前面的子表达式一次或多次。例如，zo+ 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。    |
| ?     | 匹配前面的子表达式零次或一次。                                                  |
| {n}   | n 是一个非负整数。匹配确定的 n 次。例如，o{2} 不能匹配 "Bob" 中的 o，但是能匹配 "food" 中的两个 o。 |
| {n,}  | n 是一个非负整数。至少匹配n 次。                                               |
| {n,m} | m 和 n 均为非负整数，其中 n <= m。最少匹配 n 次且最多匹配 m 次。                        |

如果我们想要表示一个范围内的字符，可以使用方括号：

```java
public static void main(String[] args) {
    String str = "abcabccaa";
    System.out.println(str.matches("[abc]*"));//表示abc这几个字符可以出现 0 - N 次
}
```

对于普通字符来说，可以下面的方式实现多种字符匹配：

| 字符     | 描述                                    |
|--------|---------------------------------------|
| [ABC]  | 匹配 [...] 中的所有字符                       |
| [^ABC] | 匹配除了 [...] 中字符的所有字符                   |
| [A-Z]  | [A-Z] 表示一个区间，匹配所有大写字母，[a-z] 表示所有小写字母。 |
| .      | 匹配除换行符（\n、\r）之外的任何单个字符，相等于 [^\n\r]    |
| [\s\S] | 匹配所有。\s 是匹配所有空白符，包括换行，\S 非空白符，不包括换行。  |
| \w     | 匹配字母、数字、下划线。等价于 [A-Za-z0-9_]          |

实际上正则表达式内容非常多，如果需要完整学习正则表达式，可以到：[正则表达式-语法|菜鸟教程](https://www.runoob.com/regexp/regexp-syntax.html)

正则表达式并不是只有Java才支持，其他很多语言比如JavaScript、Python等等都是支持正则表达式。

## 4.4.内部类

