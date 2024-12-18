# JavaSE

:::details 学习参考资料：

- [JavaSE 教程](https://www.bilibili.com/video/BV1YP4y1o75f)

:::

## 5.1.泛型

### 5.1.1.泛型类

为了统计学生成绩，要求设计一个Score对象，包括课程名称、课程号、课程成绩，但是成绩分为两种，一种是以`优秀、良好、合格`
来作为结果，还有一种就是 `60.0、75.5、92.5`
这样的数字分数，可能高等数学这门课是以数字成绩进行结算，而计算机网络实验这门课是以等级进行结算，这两种分数类型都有可能出现，那么现在该如何去设计这样的一个Score类呢？

现在的问题就是，成绩可能是String类型，也可能是Integer类型，如何才能很好的去存可能出现的两种类型呢？

可以将一个类定义为一个泛型类：

```java
//泛型类需要使用<>，在里面添加1 - N个类型变量
public class Score<T> {
    String name;
    String id;
    T value;//T会根据使用时提供的类型自动变成对应类型

    //这里T可以是任何类型，但是一旦确定，那么就不能修改了
    public Score(String name, String id, T value) {
        this.name = name;
        this.id = id;
        this.value = value;
    }
}
```

泛型其实就一个待定类型，在定义时并不明确是什么类型，而是需要到使用时才会确定对应的泛型类型:

```java
public static void main(String[] args) {
    Score<String> score = new Score<String>("计算机网络", "EP074512", "优秀");
    //一旦类型明确，那么泛型就变成对应的类型了
    String value = score.value;
    System.out.println(value);
}
```

泛型将数据类型的确定控制在了编译阶段，在编写代码的时候就能明确泛型的类型，如果类型不符合，将无法通过编译！

因为是具体使用对象时才会明确具体类型，所以说静态方法中不能使用。

如果要让某个变量支持引用确定了任意类型的泛型，那么可以使用`?`通配符：

```java
public static void main(String[] args) {
    Test<?> test = new Test<Integer>();
    test = new Test<String>();
  	Object o = test.value;    //但是注意，如果使用通配符，那么由于类型不确定，所以说具体类型同样会变成Object
}
```

泛型变量不止可以只有一个，如果需要使用多个的话，也可以定义多个：

```java
public class Test<A, B, C> {   //多个类型变量使用逗号隔开
    public A a;
    public B b;
    public C c;
}
```

### 5.1.2.泛型与多态

不只是类，包括接口、抽象类，都是可以支持泛型的：

```java
public interface Study<T> {
    T test();
}
```

当子类实现此接口时，可以选择在实现类明确泛型类型，或是继续使用此泛型让具体创建的对象来确定类型：

```java:line-numbers
public class Main {
    public static void main(String[] args) {
        A a = new A();
        Integer i = a.test();
    }

    static class A implements Study<Integer> {   
      	//在实现接口或是继承父类时，如果子类是一个普通类，那么可以直接明确对应类型
        @Override
        public Integer test() {
            return null;
        }
    }
}
```

或者是继续摆烂，依然使用泛型：

```java:line-numbers
public class Main {
    public static void main(String[] args) {
        A<String> a = new A<>();
        String i = a.test();
    }

    static class A<T> implements Study<T> {   
      	//让子类继续为一个泛型类，那么可以不用明确
        @Override
        public T test() {
            return null;
        }
    }
}
```

继承也是同样的：

```java:line-numbers
static class A<T> {
    
}

static class B extends A<String> {

}
```

### 5.1.3.泛型方法

当某个方法（无论是是静态方法还是成员方法）需要接受的参数类型并不确定时，也可以使用泛型来表示：

```java:line-numbers
public class Main {
    public static void main(String[] args) {
        String str = test("Hello World!");
    }

    //在返回值类型前添加<>并填写泛型变量表示这个是一个泛型方法
    private static <T> T test(T t){   
        return t;
    }
}
```

泛型方法会在使用时自动确定泛型类型：

```java:line-numbers
public static void main(String[] args) {
    String[] strings = new String[1];
    Main main = new Main();
    main.add(strings, "Hello");
    System.out.println(Arrays.toString(strings));
}

private <T> void add(T[] arr, T t){
    arr[0] = t;
}
```

### 5.1.4.泛型的界限

现在有一个新的需求，现在没有String类型的成绩了，但是成绩依然可能是整数，也可能是小数，如果不希望用户将泛型指定为除数字类型外的其他类型，需要使用到泛型的上界定义：

```java:line-numbers
//设定类型参数上界，必须是Number或是Number的子类
public class Score<T extends Number> {   
    private final String name;
    private final String id;
    private final T value;

    public Score(String name, String id, T value) {
        this.name = name;
        this.id = id;
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

只需要在泛型变量的后面添加`extends`关键字即可指定上界，使用时，具体类型只能是指定的上界类型或是上界类型的子类，不得是其他类型。否则一律报错：

<img src="https://oss.itbaima.cn/internal/markdown/2022/09/27/rLnjHp73tdFSPUM.png" alt="泛型上界">

下界仅适用于通配符，对于类型变量来说是不支持的：

```java
public static void main(String[] args) {
    Score<? extends Number> score = new Score<>("数据结构与算法基础", "EP074512", 10);
    Number o = score.getValue();
}
```

### 5.1.5.类型擦除

泛型到底是如何实现的呢，程序编译之后的样子是什么样的？

```java
public abstract class A <T>{
    abstract T test(T t);
}
```

实际上在Java中并不是真的有泛型类型，一个泛型类型编译之后，实际上会直接使用默认的类型：

```java
public abstract class A {
    abstract Object test(Object t);  //默认就是Object
}
```

如果给类型变量设定了上界，那么会从默认类型变成上界定义的类型：

```java
public abstract class A <T extends Number>{   //设定上界为Number
    abstract T test(T t);
}

//编译之后：
public abstract class A {
    abstract Number test(Number t);
}
```

泛型其实仅仅是在编译阶段进行类型检查，当程序在运行时，并不会真的去检查对应类型，所以哪怕不去指定类型也可以直接使用，只不过此时编译器会给出警告。

由于类型擦除，在使用时，编译后的代码是进行了强制类型转换的：

```java
public static void main(String[] args) {
    A<String> a = new B();
    String  i = a.test("10");     //因为类型A只有返回值为原始类型Object的方法
}
```

编译之后：

```java
public static void main(String[] args) {
    A a = new B();
    String i = (String) a.test("10");   //依靠强制类型转换完成的
}
```

类型擦除机制目的是为了方便使用后面集合类（不然每次都要强制类型转换）同时为了向下兼容采取的方案。