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