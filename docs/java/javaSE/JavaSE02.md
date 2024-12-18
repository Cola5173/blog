# JavaSE

:::details 学习参考资料：

- [JavaSE 教程](https://www.bilibili.com/video/BV1YP4y1o75f)

:::

## 2.1.Java程序基础

从最基本的Java程序基础开始

### 2.1.1.程序代码基本结构

示例代码如下：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!!!!");
    }
}
```

这段代码实现的功能很简单，就是将 Hello World 输出到控制台。

目前只需要记住固定的模式即可，创建的源文件的名称为 `Main.java` ，然后编写的代码在第一行：

```java
public class Main {
  
}
```

:::warning 注意事项：

- 区分大小写
- 括号成对出现

:::

整个 Java 程序的入口点，称为`主方法`，主方法的模式是固定的的：

```java
public static void main(String[] args) {
    
}
```

任何想要的操作，可以编写在主方法中，比如先打印Hello World!，然后再打印YYDS!到控制台。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        System.out.println("YYDS!");
    }
}
```

分号代表换行。

### 2.1.2.注释

在编写代码的时候，需要标记这段代码是什么意思，写注释说明，分别有如下的注释方式：

```java:line-numbers
/**
 * 文档注释
 */
public class Main {
    public static void main(String[] args) {
        // 单行注释
        System.out.println("Hello World!!!!");
        /*
        多行代码注释
        line 1
        line 2
         */
        System.out.println("java is the best language ever!!!!!");
    }
}
```

### 2.1.3.变量与常量

`变量`，代表一个具体的值，并且变量的值是可以发生变化的，声明一个变量的格式如下：

```java
[数据类型] [变量名称];
```

- 数据类型：代表这个变量名称的类型，是整数(`int`)、小数(`double`)等
- 名称：随便取，但需要注意以下要求
    - 标识符可以由大小写字母、数字、下划线(_)和美元符号($)组成，但是不能以数字开头。
    - 变量不能重复定义，大小写敏感，比如A和a就是两个不同的变量。
    - 不能有空格、@、#、+、-、/ 等符号。
    - 应该使用有意义的名称，达到见名知意的目的（一般我们采用英文单词），最好以小写字母开头。
    - 不可以是 true 和 false。
    - 不能与Java语言的关键字或是基本数据类型重名，关键字列表如下：
      <img src="https://oss.itbaima.cn/internal/markdown/2023/03/01/I6nCh49qzyvoZBm.png">

没必要刻意去进行记忆，在学习的过程中逐步认识到这些关键字。

如果需要定义一个变量 `a` ，可以：

```java
public static void main(String[] args) {
    int a;    //声明一个整数类型变量a
    a = 10;   //使用时再赋值
}
```

或者

```java
public static void main(String[] args) {
    int a = 10;   //直接初始变量并赋值为10
}
```

还可以一次定义多个变量：

```java
public static void main(String[] args) {
    int a, b;   //定义变量a和变量b，中间使用逗号隔开就行了
}
```

或者

```java
public static void main(String[] args) {
    int a;   //分两句进行声明
    int b;
}
```

变量的值也可以在中途进行修改：

```java
public static void main(String[] args) {
    int a = 666;
    a = 777;
    System.out.println(a);   //这里打印得到的值就是777了
}
```

变量的值也可以直接指定为其他变量的值：

```java
public static void main(String[] args) {
    int a = 10;
    int b = a;   //直接让b等于a，那么a的值就会给到b
    System.out.println(b);   //这里输出的就是10了
}
```

有时候希望变量的值一直保持不变，可以将其指定为常量(`final`)，这里介绍Java中第一个需要认识的关键字：

```java
public static void main(String[] args) {
    final int a = 666;   //在变量前面添加final关键字，表示这是一个常量
    a = 777;    //常量的值不允许发生修改
}
```

至此，Java的基础语法部分介绍完毕，下一部分将开始介绍Java中的几大基本数据类型。

## 2.2.基本数据类型

程序中可能需要各种各样的数据，比如整数、小数、字符等等，这一部分属于Java中的八大基本数据类型。

### 2.2.1.计算机中的二进制表示

但是先需要了解，在计算机中是如何去表示数据的呢？

在计算机中，所有的内容都是**二进制**形式表示。因为计算机是电子的，电平信号只有高位和低位，可以暂且理解为通电和不通电，高电平代表1，低电平代表0，由于只有0和1，因此只能使用2进制表示数字！

在Java中，无论是小数还是整数，都有符号（和C语言不同，C语言有无符号数）所以，首位就作为符号位。

### 2.2.2.整数类型

在Java中，整数类型包括以下几个：

* byte 字节型 （8个bit，也就是1个字节）范围：-128~+127
* short 短整形（16个bit，也就是2个字节）范围：-32768~+32767
* int 整形（32个bit，也就是4个字节）最常用的类型：-2147483648 ~ +2147483647
* long 长整形（64个bit，也就是8个字节）范围：-9223372036854775808 ~ +9223372036854775807

其实这几种变量都可以正常表示整数：

```java
public static void main(String[] args) {
    short a = 10;
    System.out.println(a);
}
```

因为都可以表示整数，所以可以将小的整数类型值传递给大的整数类型：

```java
public static void main(String[] args) {
    short a = 10;
    int b = a;   //小的类型可以直接传递给表示范围更大的类型
    System.out.println(b);
}
```

反之会出现报错：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/16/NLZlDgxz3ci5Idr.png" alt="整数类型大到小报错">

这是由于在将小的整数类型传递给大的整数类型时发生了**隐式类型转换**
，只要是从存储范围小的类型到存储范围大的类型，都支持隐式类型转换，它可以自动将某种类型的值，转换为另一种类型，比如上面就是将short类型的值转换为了int类型的值。

隐式类型转换不仅可以发生在整数之间，也可以是其他基本数据类型之间，后面会逐步介绍。

实际上为变量赋一个常量数值时，也发生了隐式类型转换，比如：

```java
public static void main(String[] args) {
   byte b = 10;    //这里的整数常量10，实际上默认是int类型，但是由于正好在对应类型可以表示的范围内，所以直接转换为byte类型的值
}
```

由于直接编写的整数常量值默认为 `int` ，需要特别注意一下，比如下面这种情况：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/16/76GgjWYz4DPBy1p.png" alt="int类型整数报错">

按照 `long` 类型的规定，实际上是可以表示这么大的数字的，但直接在代码中写的的常量数字，默认情况下是 `int`
类型。如果需要将其表示为一个long类型的常量数字，那么需要在后面添加大写或是小写的L才可以。

```java
public static void main(String[] args) {
    long a = 922337203685477580L;   //这样就可以正常编译通过了
}
```

针对于这种很长的数字，为了提升辨识度，可以使用下划线分割每一位：

```java
public static void main(String[] args) {
   int a = 1_000_000;    //当然这里依然表示的是1000000，没什么区别，但是辨识度会更高
}
```

### 2.2.3.浮点类型

在Java中也可以轻松地使用小数：

* float：单精度浮点型 （32bit，4字节）
* double：双精度浮点型（64bit，8字节），默认的小数类型常量

可以直接创建浮点类型的变量：

```java
public static void main(String[] args) {
    double a = 10.5, b = 66;   //整数类型常量也可以隐式转换到浮点类型
}
```

由于 `float` 类型的精度不如 `double` ，如果直接给其赋一个 `double` 类型的值，会直接出现错误。

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/x7bOzyIacpDowKk.png" alt="float错误">

使用 `float` 需要在后面添加大写或小写的F来表示这是一个float类型的常量值：

```java
public static void main(String[] args) {
    float f = 9.9F;
    double a = f;    //隐式类型转换，由于double精度更大，所以可以直接接收float类型的值
    System.out.println(a);
}
```

只不过由于精度问题，最后的打印结果：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/1JqHY2so6Qwz4WX.png" alt="精度问题">

隐式类型转换规则：byte→short(char)→int→long→float→double

### 2.2.4.字符类型

`char` （字符类型，6个bit，2字节，不带符号，范围是0 ~ 65535），可以表示计算机中的任意一个字符（包括中文、英文、标点等一切可以显示出来的字符）。

实际上每个数字在计算机中都会对应一个字符：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/Z7AiBPNO6ylML4z.png" alt="ASCII表">

比如我们的英文字母A要展示出来，那就是一个字符的形式，而其对应的ASCII码值为65，所以说当char为65时，打印出来的结果就是大写的字母A了：

```java
public static void main(String[] args) {
    char c = 65;
    System.out.println(c);// 打印出来的结果为：A
}
```

或者也可以直接写一个字符常量值赋值：

```java
public static void main(String[] args) {
    char c = 'A';    //字符常量值需要使用单引号囊括，并且内部只能有一个字符
    System.out.println(c);
}
```

不过，`ASCII` 表中只有 128 个字符，只包含了一些基础的字符，那么多中文字符（差不多有6000多个），用ASCII编码表肯定是没办法全部表示的，但如果现在需要在电脑中使用中文。这时，就需要扩展字符集了。

:::details 编码

可以使用两个甚至多个字节来表示一个中文字符，这样能够表示的数量就大大增加了，GB2132方案规定当连续出现两个大于127的字节时（注意不考虑符号位，此时相当于是第一个bit位一直为1了），表示这是一个中文字符（所以为什么常常有人说一个英文字符占一字节，一个中文字符占两个字节），这样就可以表示出超过7000种字符了，不仅仅是中文，甚至中文标点、数学符号等，都可以被正确的表示出来。

不过这样能够表示的内容还是不太够，除了那些常见的汉字之外，还有很多的生僻字，比如龘、錕、釿、拷这类的汉字，后来干脆直接只要第一个字节大于127，就表示这是一个汉字的开始，无论下一个字节是什么内容（甚至原来的128个字符也被编到新的表中），这就是Windows至今一直在使用的默认GBK编码格式。

虽然这种编码方式能够很好的解决中文无法表示的问题，但是由于全球还有很多很多的国家以及很多很多种语言，所以最终目标是能够创造一种可以表示全球所有字符的编码方式，整个世界都使用同一种编码格式，这样就可以同时表示全球的语言了。所以这时就出现了一个叫做
**ISO的（国际标准化组织）组织，来定义一套编码方案来解决所有国家的编码问题，这个新的编码方案就叫做Unicode**
（准确的说应该是规定的字符集，包含了几乎全世界所有语言的字符），规定每个字符必须使用两个字节，即用16个bit位来表示所有的字符（也就是说原来的那128个字符也要强行用两位来表示）

但是这样的话实际上是很浪费资源的，因为这样很多字符都不会用到两字节来保存，肯定不能直接就这样去表示，这会导致某些字符浪费了很多空间，需要一个更加好用的具体的字符编码方式。所以最后就有了UTF-8编码格式（它是Unicode字符集的一个编码规则），区分每个字符的开始是根据字符的高位字节来区分的，比如用一个字节表示的字符，第一个字节高位以“0”开头；用两个字节表示的字符，第一个字节的高位为以“110”开头，后面一个字节以“10开头”；用三个字节表示的字符，第一个字节以“1110”开头，后面俩字节以“10”开头；用四个字节表示的字符，第一个字节以“11110”开头，后面的三个字节以“10”开头：

:::

### 2.2.5.布尔类型

布尔类型是Java中的一个比较特殊的类型，存放的是状态，它有下面的两个状态：

* true - 真
* false - 假

布尔类型（boolean）只有true和false两种值，也就是要么为真，要么为假，布尔类型的变量通常用作流程控制判断语句。布尔类型占据的空间大小并未明确定义，而是根据不同的JVM会有不同的实现。

```java
public static void main(String[] args) {
    boolean b = true;   //值只能是true或false
    System.out.println(b);
}
```

## 2.3.运算符

前面学习了基本数据类型，但是光有这些基本数据类型还不够，还需要让这些数据之间进行运算，才可以真正意义上发挥计算机的作用。

比如：`+`，`- `，`×`，`÷`。

在Java中，同样可以使用这样的方式来进行运算。

### 2.3.1.赋值运算符

赋值运算符可以直接给某个变量赋值：

```java
public static void main(String[] args) {
    int a = 666;   //使用等号进行赋值运算
}
```

使用规则为： 赋值运算符的左边必须是一个可以赋值的目标，比如变量，右边可以是任意满足要求的值，包括变量。

当连续使用赋值运算符时，按照从右往左的顺序进行计算，首先是a =
777，计算完成后，a的值就变成了777，计算完成后，会得到计算结果（赋值运算的计算结果就是赋的值本身，就像1 + 1的结果是2一样，a =
1的结果就是1）此时继续进行赋值计算，那么b就被赋值为a = 777的计算结果，同样的也是 777 了。

```java
public static void main(String[] args) {
    int a;
    int b = a = 777;
}
```

### 2.3.2.算术运算符

算术运算符也就是初等数学中认识的这些运算符，包括加减乘除，当然Java还支持取模运算：

```java
public static void main(String[] args) {
    int a = 1 + 1;
    System.out.println(a);//2
}
```

不同类型之间也可以进行运算：

```java
public static void main(String[] args) {
    int a = 5;
    short b = 10;
    int c = a + b;
    //不同类型的整数一起运算，小类型需要转换为大类型，short、byte、char一律转换为int再进行计算（无论算式中有无int，都需要转换），结果也是int；
    //如果算式中出现了long类型，那么全部都需要转换到long类型再进行计算，结果也是long，反正就是依大的来
}
```

加法支持对字符串的拼接：

```java
public static void main(String[] args) {
    String str = "伞兵" + "lbw";   //可以使用加号来拼接两个字符串
    System.out.println(str);//伞兵lbw
}
```

字符串不仅可以跟字符串拼接，也可以跟基本数据类型拼接：

```java
public static void main(String[] args) {
    String str = "伞兵" + true + 1.5 + 'A';
    System.out.println(str);//伞兵true1.5A
}
```

乘除法也是支持的：

```java
public static void main(String[] args) {
    int a = 8, b = 2;
    System.out.println(a * b);   //乘法使用*表示乘号
  	System.out.println(a / b);   //除法就是一个/表示除号
}
```

两个整数在进行除法运算时，得到的结果也是整数（会直接砍掉小数部分，注意不是四舍五入）：

```java
public static void main(String[] args) {
    int a = 8, b = 5;
    System.out.println(a / b);//1
}
```

但是如果是两个小数一起计算的话，因为结果也是小数，所以说就可以准确得到结果：

```java
public static void main(String[] args) {
    double a = 8.0, b = 5.0;
    System.out.println(a / b);//1.6
}
```

取模操作：

```java
public static void main(String[] args) {
    int a = 10;
    System.out.println(a % 3);//1
}
```

注意，运算符之间是有优先级之分的，比如乘除法优先级高于加减法：

```java
public static void main(String[] args) {
    System.out.println(10 + 3 * 4);//22
}
```

| 优先级 | 	运算符               | 	结合性（出现同优先级运算符时） |
|-----|--------------------|------------------|
| 1   | 	-(负号) +(正号)	      | 从右向左             |
| 2   | 	* / %	            | 从左往右             |
| 3   | 	+(加法，包括字符串) -(减法) | 	从左往右            |
| 4   | 	=	                | 从右向左             |

比如：

```java
public static void main(String[] args) {
    int a = 10;
    int b = a = 8 * -a + 10;
    /*
        1. 正负号优先级最高，所有首先计算的是-a，得到-10
        2. 其次是乘除号优先级更高，所以说这里计算 8 * -10，得到 -80
        3. 然后是加减法，-80 + 10 = -70
        4. 最后是赋值运算，因为等号运算符从右往左结合，先算a = -70的结果就是 -70
        5. 最后b就是 -70
     */
    System.out.println(b);
}
```

### 2.3.3.括号运算符

可以通过添加括号的方式来提升某些运算的优先级：

```java
public static void main(String[] args) {
    int a = 10;
    int b = (a = 8) * (-a + 10);
    /*
        1. 括号的优先级是最高的，我们需要先计算括号中的内容，如果存在多个括号，就从左往右计算
        2. 首先是 a = 8，计算完成之后a变成8，并且运算结果也为8
        3. 然后是后面的加法，-a就是-8，加上10就是2
        4. 最后才是乘法，左边此时是8，右边是2，最后结果为16
     */
    System.out.println(b);
}
```

括号是可以嵌套的，这一点跟数学中也是一样的，只不过不需要使用方括号和花括号，一律使用小括号就行了。

括号除了可以用来提升运算优先级，也可以用作**强制类型转换**，比如希望将一个大的类型转换为一个小的类型：

```java
public static void main(String[] args) {
    int a = 10;
    short b = (short) a;//在括号中填写上强制转换的类型，就可以强制转换到对应的类型了
}
```

只不过强制类型转换存在一定的风险（溢出风险），比如：

```java
public static void main(String[] args) {
    int a = 128;   //已经超出byte的范围了
    byte b = (byte) a;  //此时强制类型转换为byte类型，那么只会保留byte能够表示的bit位
    System.out.println(b);//-128
}
```

### 2.3.4.自增自减运算符

当想要对一个变量进行这样的自增操作时，可以：

```java
public static void main(String[] args) {
    int a = 8;
    a++;   //自增运算符就是两个加号连在一起，效果跟上面是一样的，a都会自增1
  	a--;   //自减不用我多说了吧
    System.out.println(a);
}
```

需要注意的是，无论是自增还是自减，符号可以放在变量前or后，这两种方式的结果是不一样的：

```java
public static void main(String[] args) {
    int a = 8;
    int c = 8;
    int b = a++;   //先出结果，再自增
    int d = ++c;   //先自增，再出结果
    System.out.println(b);  //8
    System.out.println(d);  //9
}
```

自增自减运算符的优先级与正负号等价比如：

```java
public static void main(String[] args) {
    int a = 8;
    int b = -a++ + ++a; 
  	//我们首先来看前面的a，因为正负号和自增是同一个优先级，结合性是从右往左，所以说先计算a++
  	//a++的结果还是8，然后是负号，得到-8
  	//接着是后面的a，因为此时a已经经过前面变成9了，所以说++a就是先自增，再得到10
  	//最后得到的结果为 -8 + 10 = 2
    System.out.println(b);
}
```

有些时候希望以其他的数进行自增操作：

```java
public static void main(String[] args) {
    int a = 8;
    a += 4;   //加号和等号连在一起，与a = a + 4效果完全一样
    System.out.println(a);
}
```

### 2.3.5.位运算符

可以位运算符直接以二进制形式操作目标，位运算符包括：

* `&`：按位与，让这两个数每一位都进行比较，如果这一位两个数都是1，那么结果就是1，否则就是0
* `|`：按位或，其实就是只要任意一个为1（不能同时为0）那么结果就是1
* `^`：按位异或，只有两边不相同的情况下，结果才是1，也就是说一边是1一边是0的情况
* `~`：按位取反，如果这一位上是1，变成0，如果是0，变成1

```java
public static void main(String[] args) {
        int a = 9;//1001
        int b = 3;//0011
        System.out.println(a & b);//0001,1
        System.out.println(a | b);//1011,11
        System.out.println(a ^ b);//1010,10
   System.out.println(~b);//1100,-4
}
```

除了以上的四个运算符之外，还有位移运算符，比如：

```java
public static void main(String[] args) {
    byte c = 1 << 2;    //两个连续的小于符号，表示左移运算
    System.out.println(c);//4，0001------0100
    //左移操作每进行一次，结果就会x2，所以说，除了直接使用*进行乘2的运算之外
}
```

同样的，右移操作就是向右移动每一位咯：

```java
public static void main(String[] args) {
    byte c = 8 >> 2;
    System.out.println(c);//2，1000----0010
    //右移操作可以快速进行除以2的计算
}
```

* 左移操作`<<`： 高位直接丢弃，低位补0
* 右移操作`>>`： 低位直接丢弃，符号位是什么高位补什么
* 右移操作`>>>`： 无符号右移是三个大于符号连在一起，移动会直接考虑符号位

### 2.3.6.关系运算符

关系判断的结果只可能是真或是假，所以说得到的结果是一个`boolean`类型的值。

关系判断运算符包括：

| 符号 | 含义                              |
|----|---------------------------------|
| >  | 大于                              |
| <  | 小于                              |
| == | 等于（注意是两个等号连在一起，不是一个等号，使用时不要搞混了） |
| != | 不等于                             |
| >= | 大于等于                            |
| <= | 小于等于                            |

### 2.3.7.逻辑运算符

通过对关系的判断得到真或是假的结果，但是只能进行简单的判断，如果此时想要判断a是否小于等于100且大于等于60，就没办法了：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/Z1yAPOKe8IVvFUt.png" alt="运算符报错">

为了解决这种问题，可以使用逻辑运算符，逻辑运算符包括：

```java
&&     与运算，要求两边同时为true才能返回true
||     或运算，要求两边至少要有一个为true才能返回true
!      非运算，一般放在表达式最前面，表达式用括号扩起来，表示对表达式的结果进行反转
```

三元运算符：

```java
判断语句 ? 结果1 : 结果2
```

## 2.4.流程控制

程序都是从上至下依次运行的，但这还远远不够，还需要更加高级的控制语句，用到选择结构来帮助我们完成条件的判断和程序的分支走向。

### 2.4.1.代码块和作用域

先来学习一下代码块和作用域，在一开始的程序中就出现了成对出现的花括号：

```java
public class Main {   //外层花括号
    public static void main(String[] args) {   //内层花括号开始
       
    }  //内层花括号结束
}
```

实际上这些被大括号囊括起来的内容，称为**块**
（代码块），一个代码块中可以包含多行代码，可以在里面做各种各样的事情，比如定义变量、进行计算等等:

```java
public static void main(String[] args) {   //现目前这个阶段，我们还是在主方法中编写代码，不要跑去外面写
    System.out.println("外层");
    {   //自由创建代码块
        int a = 10;
        System.out.println(a);
    }
}
```

创建的变量，实际上是有作用域的，并不是在任何地方都可以使用，比如：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/17/DdvU3aQmE25KbxM.png" alt="变量作用域">

变量的使用范围，仅限于其定义时所处的代码块，一旦超出对应的代码块区域，那么就相当于没有这个变量了。

```java
public static void main(String[] args) {
    int a = 10;   //此时变量在最外层定义
    {
        System.out.println(a);   //处于其作用域内部的代码块可以使用
    }
    System.out.println(a);   //这里肯定也可以使用
}
```

目前创建的变量都是**局部变量**，有范围限制，后续会陆续介绍其它的变量。

### 2.4.2.选择结构

如果只有在条件为真时，才执行某些代码，这种情况就需要使用到选择分支语句`if`语句：

```java
if (条件判断) 判断成功执行的代码;
```

`if`会进行判断，只有判断成功时才会执行紧跟着的语句，否则会直接跳过。

注意，如果想要在if中执行多行代码，需要使用代码块将这些代码囊括起来（实际上代码块就是将多条语句复合到一起）。如果只有一行代码，花括号可以直接省略，包括后面的
`else`、`while`、`for`语句都是这样的。

```java
public static void main(String[] args) {
    int a = 15;
    if(a > 10) {    //只有判断成功时，才会执行下面的代码块中内容，否则直接跳过
        System.out.println("a大于10");
        System.out.println("a的值为："+a);
    } else {   //当判断不成功时，会执行else代码块中的代码
        System.out.println("a小于10");
        System.out.println("a的值为："+a);
    }
    System.out.println("我是外层");
}
```

如果需要判断多个分支呢？使用`else-if`来完成：

```java
public static void main(String[] args) {
    int score =  2;
    if(score >= 90)    //90分以上才是优秀
        System.out.println("优秀");
     else if (score >= 70)    //当上一级if判断失败时，会继续判断这一级
        System.out.println("良好");
     else if (score >= 60)
        System.out.println("及格");
     else    //当之前所有的if都判断失败时，才会进入到最后的else语句中
        System.out.println("不及格");
}
```

if分支语句还支持嵌套使用:

```java
public static void main(String[] args) {
    int score =  2;
    if(score < 60) {   //先判断不及格
        if(score > 30)    //在内层再嵌套一个if语句进行进一步的判断
            System.out.println("学习C++");
        else
            System.out.println("学习Java");
    }
}
```

`switch-case`更适用于多分支的情况：

```java
switch (目标) {   //传入一个目标，比如变量，或是计算表达式等
  case 匹配值:    //如果目标的值等于我们这里给定的匹配值，那么就执行case后面的代码
    代码...
    break;    //代码执行结束后需要使用break来结束，否则会溜到下一个case继续执行代码
  default:
    其他情况下执行的代码
}
```

比如现在我们要根据学生的等级进行分班，学生有ABC三个等级：

```java
public static void main(String[] args) {
    char c = 'A';
    switch (c) {
        case 'A':
            System.out.println("去尖子班！");
            break;
        case 'B':
            System.out.println("去平行班！");
            break;
        case 'C':
            System.out.println("去差生班！");
            break;
        default:   //其他情况一律就是下面的代码了
            System.out.println("去读职高，分流");
    }
}
```

`switch`可以精准匹配某个值，但是它不能进行范围判断。

### 2.4.3.循环结构

在某些时候，可能需要批量执行某些代码。可以使用for循环语句来多次执行：

```java
for (表达式1;表达式2;表达式3) 循环体;
```

* 表达式1：在循环开始时仅执行一次。
* 表达式2：每次循环开始前会执行一次，要求为判断语句，用于判断是否可以结束循环，若结果为真，那么继续循环，否则结束循环。
* 表达式3：每次循环完成后会执行一次。
* 循环体：每次循环都会执行一次循环体。

一个标准的for循环语句写法如下：

```java
for (int i = 0; i < 3; i++) {
    System.out.println("伞兵一号卢本伟准备就绪！");
    System.out.println("当前i的值为："+i);
}
```

这里的`i`仅仅是for循环语句中创建的变量，所以说其作用域被限制在了循环体中，一旦离开循环体，那么就无法使用了：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/18/2aO9Ro5yfMUvhNc.png" alt="循环结构i的局部变量域">

但是也可以将i的创建放到外面：

```java
public static void main(String[] args) {
    int i = 0;   //在外面创建变量i，这样全部范围内都可以使用了
    for (; i < 3; i++) {   //for循环的三个表达式并不一定需要编写
        System.out.println("伞兵一号卢本伟准备就绪！");
        System.out.println("当前i的值为："+i);
    }
    System.out.println("当前i的值为："+i);
}
```

for循环同样支持嵌套使用。实际上，for循环的三个表达式并不一定需要编写，甚至可以三个都不写：

```java
public static void main(String[] args) {
    for (;;)   //如果什么都不写，相当于没有结束条件，这将会导致无限循环
        System.out.println("伞兵一号卢本伟准备就绪！");
}
```

此时就会出现无限循环的情况（无限循环是很危险的，因为它会疯狂地消耗CPU资源来执行循环，可能很快CPU就满载了，一定要避免）。

也可以在循环过程中提前终止或是加速循环的进行，这里需要认识两个新的关键字：

- 可以使用`continue`关键字来跳过本轮循环，直接开启下一轮循环
- `break`关键字来提前终止整个循环，无论后续还有没有未执行的代码，都不会执行了，而是直接结束整个循环，跳出到循环外部

虽然使用break和continue关键字能够更方便的控制循环，但是注意在多重循环嵌套下，它只对离它最近的循环生效（就近原则）。

另外一个循环关键字，`while`相当于是一个简化版本，它只需要填写循环的维持条件即可，比如：

```java
while(循环条件) 循环体;
```

while循环更多的用在不明确具体的结束时机的情况下:

```java
public static void main(String[] args) {
    int i = 100;
    while (i > 0) {
        if(i < 10) break;
        System.out.println(i);
        i /= 2;
    }
}
```

也可以反转循环判断的时机，可以先执行循环内容，然后再做循环条件判断，这里要用到`do-while`语句：

```java
public static void main(String[] args) {
    int i = 0;   //比如现在我们想看看i不断除以2得到的结果会是什么，但是循环次数我们并不明确
    do {  //无论满不满足循环条件，先执行循环体里面的内容
        System.out.println("Hello World!");
        i++;
    } while (i < 10);   //再做判断，如果判断成功，开启下一轮循环，否则结束
}
```

## 2.5.实战练习

### 2.5.1.寻找水仙花数

题目： 水仙花数（Narcissistic number）也被称为超完全数字不变数（pluperfect digital invariant,
PPDI）、自恋数、自幂数、阿姆斯壮数或阿姆斯特朗数（Armstrong number），水仙花数是指**一个 3 位数，它的每个位上的数字的
3次幂之和等于它本身**。

例如：1^3 + 5^3+ 3^3 = 153。”

现在请你设计一个Java程序，打印出所有1000以内的水仙花数。

```java
/**
 * @author cola1213
 * @date 2024/11/25 23:51
 * @description 水仙花数
 **/
public class NarcissisticNumber {
    public static void main(String[] args) {
        int i = 100;
        int a;//百位数字
        int b;//十位数字
        int c;//个位数字
        while (i < 1000) {
            a = i / 100;
            b = i % 100 / 10;
            c = i % 10;
            // 判断是否是水仙花数
            if (i == a * a * a + b * b * b + c * c * c) {
                System.out.println(i + "是水仙花数");
            }
            i++;
        }
    }
}
```

### 2.5.2.打印九九乘法表

题目： 在的程序中，也打印出这样的一个乘法表出来，请你设计一个Java程序来实现它。

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/18/Iek7OnbRoTw46Cl.jpg" alt="九九乘法表">

```java
/**
 * @author cola1213
 * @date 2024/11/25 23:59
 * @description 九九乘法表
 **/
public class MultiplicationTable {
    public static void main(String[] args) {
        int ans;
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                ans = i * j;
                System.out.print(i + "×" + j + "=" + ans + " ");
            }
            System.out.println();
        }
    }
}
```

### 2.5.3.斐波那契数列

题目：斐波那契数列（Fibonacci sequence），又称黄金分割数列，因数学家莱昂纳多·斐波那契（Leonardo
Fibonacci）以兔子繁殖为例子而引入，故又称为“兔子数列”，指的是这样一个数列：1、1、2、3、5、8、13、21、34、……
在数学上，斐波那契数列以如下被以递推的方法定义：F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈
N）在现代物理、准晶体结构、化学等领域，斐波纳契数列都有直接的应用，为此，美国数学会从 1963
年起出版了以《斐波纳契数列季刊》为名的一份数学杂志，用于专门刊载这方面的研究成果。

斐波那契数列：1，1，2，3，5，8，13，21，34，55，89...，不难发现一个规律，实际上从第三个数开始，每个数字的值都是前两个数字的和，现在请你设计一个Java程序，可以获取斐波那契数列上任意一位的数字，比如获取第5个数，那么就是5。

```java
/**
 * @author cola1213
 * @date 2024/11/26 00:05
 * @description 斐波那契数列
 **/
public class FibonacciSequence {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入目标值target：");
        int target = scanner.nextInt();

        if (target <= 2) {
            System.out.println(1);
        } else {
            int a = 1;
            int b = 1;
            int ans = 0;
            for (int i = 3; i <= target; i++) {
                ans = a + b;
                a = b;
                b = ans;
            }
            System.out.println(ans);
        }
    }
}
```