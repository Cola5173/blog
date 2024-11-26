# JavaSE

:::details 学习参考资料：

- [JavaSE 教程](https://www.bilibili.com/video/BV1YP4y1o75f)

:::

前面已经学习了面向过程编程，也可以自行编写出简单的程序了。接着就需要认识 **面向对象程序设计**（Object Oriented
Programming）它是我们在Java语言中要学习的重要内容。

面向对象是新手成长的一道分水岭，有的人秒懂，有的人直到最后都无法理解。

## 3.1.类与对象

类的概念我们在生活中其实已经听说过很多了。

人类、鸟类、鱼类...
所谓类，就是对一类事物的描述，是抽象的、概念上的定义，比如鸟类，就泛指所有具有鸟类特征的动物。比如人类，不同的人，有着不同的性格、不同的爱好、不同的样貌等等，但是他们根本上都是人，所以说可以将他们抽象描述为人类。

**对象**是某一类事物实际存在的每个个体，因而也被称为`实例`（instance）我们每个人都是人类的一个实际存在的个体。

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/19/U2P7qWOtRz5bhFY.png" alt="人类">

所以说，类就是抽象概念的人，而对象，就是具体的某一个人。

* A：是谁拿走了我的手机？
* B：是个人。（某一个类）
* A：我还知道是个人呢，具体是谁呢？
* B：是XXX。（具体某个对象）

而在Java中，也可以像这样进行编程，**可以定义一个类，然后进一步创建许多这个类的实例对象**。像这种编程方式，称为面向对象编程。

### 3.1.1.类的定义与对象创建

可以创建一个类，既然是人类，那么肯定有人相关的一些属性，比如名字、性别、年龄等等，那么怎么才能给这个类添加一些属性呢？

可以将这些属性直接作为类的成员变量（成员变量相当于是这个类所具有的属性，每个实例创建出来之后，这些属性都可能会各不相同）定义到类中：

```java
public class Person {   //这里定义的人类具有三个属性，名字、年龄、性别
    String name;   //直接在类中定义变量，表示类具有的属性
    int age;
    String sex;
}
```

实际上这些变量只有在一个具体的对象中才可以使用。

那么现在人类的属性都规定好了，就可以尝试创建一个实例对象了，实例对应的应该是一个具体的人：

```java
new 类名();//使用new关键字来创建某个类的对象，注意new后面需要跟上 类名()
```

实际上整个流程为：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/19/dSM4XDBV7qkIUlb.png" alt="创建对象流程">

目前只是创建了对象，并没有操作对象。

### 3.1.2.对象的使用

可以使用一个变量来指代某个对象，只不过引用类型的变量，存储的是对象的引用，而不是对象本身：

```java
public static void main(String[] args) {
  	//创建一个变量指代我们刚刚创建好的对象，变量的类型就是对应的类名
  	//p存放的是对象的引用，而不是本体，可以通过对象的引用来间接操作对象
    Person p = new Person();
}
```

对象类型的变量存放的是对象的引用：

```java
public static void main(String[] args) {
    Person p1 = new Person();
    Person p2 = p1;
}
```

将变量p2赋值为p1的值，那么实际上只是传递了对象的引用，而不是对象本身的复制，这跟我们前面的基本数据类型有些不同，p2和p1都指向的是同一个对象：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/19/GBPaNZsr2MSKvCq.png" alt="指针引用">

来测试一下：

```java
public static void main(String[] args) {
    Person p1 = new Person();
    Person p2 = p1;
    System.out.println(p1 == p2);    //使用 == 可以判断两个变量引用的是不是同一个对象
}
```

有了对象的引用之后，可以进行操作了：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/19/cEJ1CWshtQFbZzy.png" alt="使用对象">

可以直接访问对象的一些属性，也就是在类中定义好的那些，对于不同的对象，这些属性都具体存放值也会不同。

还可以修改对象的名字，不同对象的属性是分开独立存放的，每个对象都有一个自己的空间，修改一个对象的属性并不会影响到其他对象：

```java
public static void main(String[] args) {
    Person p1 = new Person();
    Person p2 = new Person();
    p1.name = "小明";   //修改的是第一个对象的属性
    p2.name = "大明";   //修改的是第二个对象的属性
    System.out.println(p1.name);  //获取的是第一个对象的属性
}
```

也可以不对任何对象进行引用：

```java
public static void main(String[] args) {
    Person p1 = null;  //null是一个特殊的值，它表示空，也就是不引用任何的对象
}
```

如果不引用任何的对象，那肯定是不应该去通过这个变量去操作所引用的对象的（都没有引用对象，操作谁）。

如果直接创建对象，那么对象的属性都会存在初始值：

- 基本类型，那么默认是统一为0
- boolean的话，默认值为false
- 引用类型，那么默认是null

### 3.1.3.方法创建与使用

可以为创建的这些对象设定不同的属性值，比如每个人的名字都不一样，性别不一样，年龄不一样等等。只不过光有属性还不行，对象还需要具有一定的行为，就像我们人可以行走，可以跳跃，可以思考一样。

而对象也可以做出一些行为，通过定义**方法**来实现（在C语言中叫做函数）。

方法的定义如下：

```java
返回值类型 方法名称() {
		方法体...
}
```

- 返回值类型：
    - 方法完成任务之后，得到的结果的数据类型（可以是基本类型，也可以是引用类型）。当然，如果没有返回值，只是完成任务，那么可以使用void表示没有返回值
- 方法名称：
    - 见明知义，规则跟变量的命名差不多，也是尽量使用小写字母开头的单词，如果是多个单词，一般使用驼峰命名法最规范

```java:line-numbers
public class Person {
    String name;
    int age;
    String sex;

    /**
     * 自我介绍只需要完成就行，没有返回值，所以说使用void
     */
    void hello() {
        System.out.println("我叫 " + name + " 今年 " + age + " 岁了！");
    }
}
```

如何使用这个方法呢？只需要通过对象去调用即可：

```java:line-numbers
public static void main(String[] args) {
    Person p1 = new Person();
    p1.name = "adam";
    p1.age = 18;
    p1.sex = "male";

    p1.hello();
}
```

如果要让人类学会加法运算，需要别人给人类提供两个参与加法运算的值才可以，这里就要用到参数了。计算完成了，只需要使用`return`
关键字来返回一个int类型的结果就可以了：

```java:line-numbers
//在调用方法时，需要外部传入参数才可以
//参数的定义需要在小括号内部编写，类似于变量定义，需要填写 类型和参数名称，多个参数用逗号隔开
int sum(int a, int b){
    int c = a + b;
    return c;   //return后面紧跟需要返回的结果，将计算结果丢出
  	//带返回值的方法，是一定要有一个返回结果的！否则无法通过编译！
}
```

方法定义时编写的参数，称为**形式参数**，而调用方法实际传入的参数，称为**实际参数**
。实际上参数的传递，会在调用方法的时候，对参数的值进行复制，方法中的参数变量，不是我们传入的变量本身。

使用`return`关键字之后，方法就会直接结束并返回结果，在这之后编写的任何代码，都是不可到达的。

### 3.1.4.方法进阶使用

如果想要在方法中访问到当前对象的属性，那么可以使用`this`关键字，来明确表示当前类的示例对象本身：

```java
void setName(String name) {
    this.name = name;   //让当前对象的name变量值等于参数传入的值
}
```

一个类中可以包含多个同名的方法，但是**需要的形式参数不一样**，方法的返回类型，可以相同，也可以不同，但是仅返回类型不同，是不允许的！

```java
int sum(int a, int b){
    return a + b;
}

double sum(double a, double b){    //为了支持小数加法，可以进行一次重载
    return a + b;
}
```

方法之间是可以相互调用的：

```java
void test(){
    System.out.println("我是test");   //实际上这里也是调用另一个方法
}

void say(){
    test();   //在一个方法内调用另一个方法
}
```

### 3.1.5.构造方法

在对象创建时，可以使用构造方法（构造器）来实现在对象创建时就为其指定名字、年龄、性别：

```java
public class Person {
    String name;
    int age;
    String sex;

    Person(String name, int age, String sex){   //跟普通方法是一样的
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}
```

在自定义一个构造方法之后，会覆盖掉默认的那一个无参构造方法，除非手动重载一个无参构造，否则要创建这个类的对象，必须调用自己定义的构造方法。

### 3.1.6.静态变量和静态方法

`static`（静态）是属于这个类的，是所有对象共享的内容。通过使用`static`
关键字来声明一个变量或一个方法为静态的，一旦被声明为静态，那么通过这个类创建的所有对象，操作的都是同一个目标。一个对象改变了静态变量的值，那么其他的对象读取的就是被改变的值。

```java
public class Person {
    String name;
    int age;
    String sex;
    static String info;    //这里我们定义一个info静态变量
}
```

一般情况下，并不会通过一个具体的对象去修改和使用静态属性，而是通过这个类去使用：

```java
public static void main(String[] args) {
    Person.info = "让我看看";
    System.out.println(Person.info);
}
```

同样的，我们可以将方法标记为静态：

```java
static void test(){
    System.out.println("我是静态方法");
}
```

静态方法属于类，所以在静态方法中无法获取成员变量的值也无法使用 `this` 关键字：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/20/cWCrJgnkXFL63y2.png" alt="静态">

那么，静态变量，是在什么时候进行初始化的呢❓

一开始是将`.class`文件丢给JVM去执行的，而每一个`.class`
文件是一个类。在Java中使用一个类之前，JVM并不会在一开始就去加载它，而是在需要时才会去加载（优化）一般遇到以下情况时才会会加载类：

* 访问类的静态变量，或者为静态变量赋值
* new 创建类的实例（隐式加载）
* 调用类的静态方法
* 子类初始化时
* 其他的情况会在讲到反射时介绍

所有被标记为静态的内容，会在类刚加载的时候就分配，而不是在对象创建的时候分配，所以说静态内容一定会在第一个对象初始化之前完成加载。

## 3.2.包和访问控制

### 3.2.1.包声明和导入

包是用来区分类的位置，对类进行分类。

包的命名规则同样是英文和主子的组合，最好是一个域名的格式，`.` 是用于分割包的，对应多个文件夹：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/21/stOGnxaPirZvjLF.png" alt="package">

`package` 关键字是用于指定当前类所处的包的，注意，所处的包和对应的目录是一一对应的。

`import` 关键字导入我们需要使用的类，当然，只有在类不在同一个包下时才需要进行导入，如果一个包中有多个类，可以使用*
表示导入这个包中全部的类：

```java
package com.test;

import com.test.entity.Person;   //使用import关键字导入其他包中的类
import com.test.entity.*;

public class Main {
    public static void main(String[] args) {
        Person person = new Person();   //只有导入之后才可以使用，否则编译器不知道这个类从哪来的
    }
}
```

### 3.2.2.访问权限控制

实际上Java中是有访问权限控制的，可以为成员变量、成员方法、静态变量、静态方法甚至是类指定访问权限，不同的访问权限，有着不同程度的访问限制：

* `private` - 私有，标记为私有的内容无法被除当前类以外的任何位置访问。
* `什么都不写` - 默认，默认情况下，只能被类本身和同包中的其他类访问。
* `protected` - 受保护，标记为受保护的内容可以能被类本身和同包中的其他类访问，也可以被子类访问（子类我们会在下一章介绍）
* `public` - 公共，标记为公共的内容，允许在任何地方被访问。

总结如下表：

| 当前类       | 	同一个包下的类	 | 不同包下的子类	 | 不同包下的类 |
|-----------|-----------|----------|--------|
| public    | 	✅	       | ✅	       | ✅      |	✅|
| protected | 	✅	       | ✅        | 	✅	    | ❌        |
| 默认	       | ✅	        | ✅        | 	❌	    | ❌         |
| private	  | ✅	        | ❌        | 	❌	    | ❌        |

## 3.3.封装、继承和多态

封装、继承和多态是面向对象编程的三大特性。

- `封装`，把对象的属性和方法结合成一个独立的整体，隐藏实现细节，并提供对外访问的接口。
- `继承`，从已知的一个类中派生出一个新的类，叫子类。子类实现了父类所有非私有化的属性和方法，并根据实际需求扩展出新的行为。
- `多态`，多个不同的对象对同一消息作出响应，同一消息根据不同的对象而采用各种不同的方法。

正是这三大特性，让Java程序更加生动形象。

### 3.3.1.类的封装

封装的目的是为了保证变量的安全性，使用者不必在意具体实现细节，而只是通过外部接口即可访问类的成员。

因此在编写类时一般将成员变量私有化，外部类需要使用Getter和Setter方法来查看和设置变量：

```java
public class Person {
    private String name;    //现在类的属性只能被自己直接访问
    private int age;
    private String sex;
  
  	//构造方法也要声明为公共，否则对象都构造不了
  	public Person(String name, int age, String sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    //想要知道这个对象的名字，必须通过getName()方法来获取，并且得到的只是名字值，外部无法修改
    public String getName() {
        return name;    
    }

    public String getSex() {
        return sex;
    }

    public int getAge() {
        return age;
    }
}
```

外部只能通过调用定义的方法来获取成员属性。

封装思想其实就是把实现细节给隐藏了，外部只需知道这个方法是什么作用，而无需关心实现，要用什么由类自己来做，不需要外面来操作类内部的东西去完成，封装就是通过访问权限控制来实现的。

### 3.3.2.类的继承

在定义不同类的时候存在一些相同属性，为了方便使用可以将这些共同属性抽象成一个父类，在定义其他子类时可以继承自该父类，减少代码的重复定义，子类可以使用父类中非私有的成员。

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/21/zlZ9JXAjvxpawPF.png" alt="继承">

实际上这些划分出来的类，本质上还是人类，也就是说人类具有的属性，这些划分出来的类同样具有，但是，这些划分出来的类同时也会拥有他们自己独特的技能。

类的继承可以不断向下，但是同时只能继承一个类，同时，标记为`final`的类不允许被继承。

当一个类继承另一个类时，属性会被继承，可以直接访问父类中定义的属性，除非父类中将属性的访问权限修改为`private`
，那么子类将无法访问（但是依然是继承了这个属性的）

如果父类存在一个有参构造方法，子类必须在构造方法中调用：

```java:line-numbers
public class Person {
    protected String name;   //因为子类需要用这些属性，所以说我们就将这些变成protected，外部不允许访问
    protected int age;
    protected String sex;
    protected String profession;

  	//构造方法也改成protected，只能子类用
    protected Person(String name, int age, String sex, String profession) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.profession = profession;
    }

    public void hello(){
        System.out.println("["+profession+"] 我叫 "+name+"，今年 "+age+" 岁了!");
    }
}
```

子类需要按照同样的方式调用父类的构造方法：

```java
public class Student extends Person{
    //因为学生职业已经确定，所以说学生直接填写就可以了
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");//使用super代表父类，父类的构造方法就是super()
    }

    public void study(){
        System.out.println("我的名字是 "+name+"，我在学习！");
    }
}
```

在使用子类时，可以将其当做父类来使用：

```java
public static void main(String[] args) {
    Person person = new Student("小明", 18, "男");//这里使用父类类型的变量，去引用一个子类对象（向上转型）
    person.hello();//父类对象的引用相当于当做父类来使用，只能访问父类对象的内容
}
```

可以使用instanceof关键字来对类型进行判断：

```java
public static void main(String[] args) {
    Person person = new Student("小明", 18, "男");
    if(person instanceof Student) {
        System.out.println("对象是 Student 类型的");
    }
    if(person instanceof Person) {
        System.out.println("对象是 Person 类型的");
    }
}
```

### 3.3.3.顶层Object类

实际上所有类都默认继承自Object类，所有类都包含Object类中的方法：

```java:line-numbers
public class Object {

    private static native void registerNatives();   //标记为native的方法是本地方法，底层是由C++实现的
    static {
        registerNatives();   //这个类在初始化时会对类中其他本地方法进行注册，本地方法不是我们SE中需要学习的内容，我们会在JVM篇视频教程中进行介绍
    }

    //获取当前的类型Class对象
    public final native Class<?> getClass();

    //获取对象的哈希值
    public native int hashCode();

  	//判断当前对象和给定对象是否相等，默认实现是直接用等号判断，也就是直接判断是否为同一个对象
  	public boolean equals(Object obj) {
        return (this == obj);
    }
  
    //克隆当前对象，可以将复制一个完全一样的对象出来，包括对象的各个属性
    protected native Object clone() throws CloneNotSupportedException;

    //将当前对象转换为String的形式，默认情况下格式为 完整类名@十六进制哈希值
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }

    //唤醒一个等待当前对象锁的线程
    public final native void notify();

    //唤醒所有等待当前对象锁的线程
    public final native void notifyAll();

    //使得持有当前对象锁的线程进入等待状态
    public final native void wait(long timeout) throws InterruptedException;

    //同上
    public final void wait(long timeout, int nanos) throws InterruptedException {
        ...
    }

    //同上
    public final void wait() throws InterruptedException {
        ...
    }

    //当对象被判定为已经不再使用的“垃圾”时，在回收之前，会由JVM来调用一次此方法进行资源释放之类的操作
    protected void finalize() throws Throwable { }
}
```

### 3.3.4.方法的重写

方法的重载是为某个方法提供更多种类，而方法的重写是覆盖原有的方法实现，比如不希望使用Object类中提供的equals方法，那么将其重写：

```java
public class Person{
    ...

    @Override   //重写方法可以添加 @Override 注解
    public boolean equals(Object obj) {   //重写方法要求与父类的定义完全一致
        if(obj == null) return false;   //如果传入的对象为null，那肯定不相等
        if(obj instanceof Person) {     //只有是当前类型的对象，才能进行比较，要是都不是这个类型还比什么
            Person person = (Person) obj;   //先转换为当前类型，接着我们对三个属性挨个进行比较
            return this.name.equals(person.name) &&    //字符串内容的比较，不能使用==，必须使用equals方法
                    this.age == person.age &&       //基本类型的比较跟之前一样，直接==
                    this.sex.equals(person.sex);
        }
        return false;
    }
}
```

有时候为了方便查看对象的各个属性，我们可以将Object类提供的toString方法重写了：

```java
@Override
public String toString() {    //使用IDEA可以快速生成
    return "Person{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", sex='" + sex + '\'' +
            ", profession='" + profession + '\'' +
            '}';
}
```

静态方法不支持重写，因为它是属于类本身的，但是它可以被继承。

基于这种方法可以重写的特性，**对于一个类定义的行为，不同的子类可以出现不同的行为**。这其实就是面向对象编程中多态特性的一种体现。

如果不希望子类重写某个方法，可以在方法前添加`final`关键字，表示这个方法已经是最终形态。

### 3.3.5.抽象类

抽象类可以将类进一步抽象，让某些方法完全由子类来实现，父类中不需要提供实现：

```java:line-numbers
//通过添加abstract关键字，表示这个类是一个抽象类
public abstract class Person {
    protected String name;   //大体内容其实普通类差不多
    protected int age;
    protected String sex;
    protected String profession;

    protected Person(String name, int age, String sex, String profession) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.profession = profession;
    }

    public abstract void exam();   //抽象类中可以具有抽象方法，也就是说这个方法只有定义，没有方法体
}
```

而具体的实现，需要由子类来完成，而且如果是子类，必须要实现抽象类中所有抽象方法：

```java:line-numbers
public class Worker extends Person{
    public Worker(String name, int age, String sex) {
        super(name, age, sex, "工人");
    }

    @Override
    public void exam() {   //子类必须要实现抽象类所有的抽象方法，这是强制要求的，否则会无法通过编译
        System.out.println("我是工人，做题我并不擅长，只能得到 D");
    }
}
```

抽象类由于不是具体的类定义（它是类的抽象）可能会存在某些方法没有实现，因此无法直接通过new关键字来直接创建对象。要使用抽象类，只能去创建它的子类对象。当然，抽象类的子类也可以是一个抽象类。

抽象方法的访问权限不能为`private`，因为抽象方法一定要由子类实现，如果子类都访问不了，那么还有什么意义呢？所以说不能为私有。

### 3.3.6.接口

接口甚至比抽象类还抽象，只代表某个确切的功能！也就是只包含方法的定义，甚至都不是一个类！

接口一般只代表某些功能的抽象，接口包含了一些列方法的定义，类可以实现这个接口，表示类支持接口代表的功能（类似于一个插件，只能作为一个附属功能加在主体上，同时具体实现还需要由主体来实现）

```java
public interface Study {    //使用interface表示这是一个接口
    void study();    //接口中只能定义访问权限为public抽象方法，其中public和abstract关键字可以省略
}
```

可以让类实现这个接口：

```java
public class Student extends Person implements Study {   //使用implements关键字来实现接口
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override
    public void study() {    //实现接口时，同样需要将接口中所有的抽象方法全部实现
        System.out.println("我会学习！");
    }
}
```

接口不同于继承，接口可以同时实现多个。

接口是一个类的功能列表，作为附加功能存在，一个类可以附加很多个功能，接口的使用和继承的概念有一定的出入，顶多说是多继承的一种替代方案。

从Java8开始，接口中可以存在方法的默认实现：

```java
public interface Study {
    void study();

    default void test() {   //使用default关键字为接口中的方法添加默认实现
        System.out.println("我是默认实现");
    }
}
```

接口不同于类，接口中不允许存在成员变量和成员方法，但是可以存在静态变量和静态方法。

最后来介绍一下Object类中提供的克隆方法，为啥要留到这里才来讲呢？因为它需要实现接口才可以使用：

```java:line-numbers
public class Student extends Person implements Study, Cloneable {   //首先实现Cloneable接口，表示这个类具有克隆的功能
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override
    public Object clone() throws CloneNotSupportedException {   //提升clone方法的访问权限
        return super.clone();   //因为底层是C++实现，我们直接调用父类的实现就可以了
    }

    @Override
    public void study() {
        System.out.println("我会学习！");
    }
}
```

原对象和克隆对象，是两个不同的对象，但是他们的各种属性都是完全一样的。

```java
public static void main(String[] args) throws CloneNotSupportedException {  //这里向上抛出一下异常，还没学异常，所以说照着写就行了
    Student student = new Student("小明", 18, "男");
    Student clone = (Student) student.clone();   //调用clone方法，得到一个克隆的对象
    System.out.println(student);
    System.out.println(clone);
    System.out.println(student == clone);//false
}
```

克隆操作可以完全复制一个对象的所有属性，但是像这样的拷贝操作其实也分为浅拷贝和深拷贝。

* 浅拷贝： 对于类中基本数据类型，会直接复制值给拷贝对象；对于引用类型，只会复制对象的地址，而实际上指向的还是原来的那个对象，拷贝个基莫。
* 深拷贝： 无论是基本类型还是引用类型，深拷贝会将引用类型的所有内容，全部拷贝为一个新的对象，包括对象内部的所有成员变量，也会进行拷贝。

那么clone方法出来的克隆对象，是深拷贝的结果还是浅拷贝的结果呢❓

```java
public static void main(String[] args) throws CloneNotSupportedException {
    Student student = new Student("小明", 18, "男");
    Student clone = (Student) student.clone();
    System.out.println(student.name == clone.name);//true
}
```

虽然Student对象成功拷贝，但是其内层对象并没有进行拷贝，依然只是对象引用的复制，所以Java为的`clone`方法只会进行**浅拷贝**。

## 3.4.枚举类

枚举类是用于一个类有多种状态：

```java
public enum Status {
    RUNNING("睡觉"), STUDY("学习"), SLEEP("睡觉");   //无参构造方法被覆盖，创建枚举需要添加参数（本质就是调用的构造方法）

    private final String name;    //枚举的成员变量
    Status(String name){    //覆盖原有构造方法（默认private，只能内部使用！）
        this.name = name;
    }

    public String getName() {   //获取封装的成员变量
        return name;
    }
}
```

使用很简单：

```java
    public static void main(String[] args) {
        System.out.println(Status.RUNNING.getName());
    }
```