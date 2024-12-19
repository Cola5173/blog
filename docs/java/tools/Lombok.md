# Lombok极速上手

:::details 参考资料：

- [Lombok 代码简化框架 极速上手 已完结（IDEA 2024 最新版）4K蓝光画质+杜比音效 从入门到上瘾_](https://www.bilibili.com/video/BV1gb421J7ok/?spm_id_from=333.999.0.0&vd_source=4bafaafda0bd3c09e8f2fee0406b0edb)
- [柏码知识库 | Lombok 极速上手 (itbaima.cn)](https://www.itbaima.cn/document/iqbc2haub31bwqtz?segment=1#doc1-Lombok极速上手)

:::

我们发现，在以往编写项目时，尤其是在类进行类的内部成员字段封装时，需要编写大量的get/set方法，如果字段名称发生改变，又要挨个进行修改，甚至当字段变得很多时，构造方法的编写会非常的麻烦：

```java
public class Account {
    private int id;
    private String name;
    private String gender;
    private String password;
    private String description;
    ....
}
```

依次编写类中所有字段的Getter和Setter还有构造方法简直是灾难，万一发生了字段名称变化，甚至还得一个个的修改！

那么有没有一种更加完美的方案来处理这种问题呢？

通过使用Lombok（小辣椒）就可以做到，他就是专门用于简化 Java
编程中的样板代码，通过注解的方式，能够自动生成常见的代码，比如构造函数、getter和setter方法、toString方法，equals和hashCode方法等，使得开发者能够更专注于业务逻辑，而不必重复编写冗长的代码。

[官网地址—Project Lombok](https://projectlombok.org/)

## 安装Lombok

使用 maven 构造项目，首先需要导入 Lombok 的依赖：

```xml

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.34</version>
    <scope>provided</scope>
</dependency>
```

只需要在测试的实体类上，添加 @Data 注解：

```java
import lombok.Data;

@Data
public class Account {
    private int id;
    private String name;
    private String gender;
    private String password;
    private String description;
}
```

接着测试一下，是否可以直接使用，@Data 会为我们的类自动生成 Getter 和 Setter 方法，我们可以直接调用：

```java
public class Main {
    public static void main(String[] args) {
        Account account = new Account();
        account.setId(1);
    }
}
```

## 使用 Lombok

接下来为大家介绍 Lombok 提供的主要注解。

### 类属性

首先是 @Getter ，用于自动生成 Getter 方法，定义如下：

```java
@Target({ElementType.FIELD, ElementType.TYPE}) // 可以添加在字段或者类上
@Retention(RetentionPolicy.SOURCE)
public @interface Getter {
	lombok.AccessLevel value() default lombok.AccessLevel.PUBLIC; //自动生成的Getter的访问权限级别
	AnyAnnotation[] onMethod() default {}; //用于添加额外的注解
	boolean lazy() default false; //懒加载功能
	....
}
```

它最简单的用法，就是直接添加到类上或者字段上：

```java
@Getter //添加到类上时，将为类中所有字段添加Getter方法
public class Account {
    private int id;
    @Getter //当添加到字段上时，仅对此字段有效
    private String name;
    private String gender;
}
```

假设我们这里将 @Getter 编写在类上，那么生成得到的代码为：

```JAVA
import lombok.Generated;

public class Account {
    private int id;
    private String name;
    private String gender;

    public Account() {}

    @Generated
    public int getId() {
        return this.id;
    }
	...
}
```

很方便，使用也很灵。但是注意它存在一定的命名规则，如果该字段名为 foo，则将其直接按照字段名称命名为 getFoo，但是注意，如果字段的类型为
boolean，则会命名为 isFoo，这是比较特殊的地方。

接下来看 Getter 注解的其它属性，首先是访问权限，默认情况下为 public，但是有时候可能我们只希望生成一个 private 的 get
方法，此时我们可以对其进行修改：

- PUBLIC - 对应public关键字

- PACKAGE - 相当于不添加任何访问权限关键字
- PRIVATE - 对应private关键字
- PROTECTED - 对应protected关键字
- MODULE - 仅限模块内使用，与PACKAGE类似，相当于不添加任何访问权限关键字
- NONE - 表示不生成对应的方法，这很适合对类中不需要生成的字段进行排除

```java
@Getter(AccessLevel.PRIVATE)   //为所有字段生成private的Getter方法
public class Account {
    private int id;
    @Getter(AccessLevel.NONE)   //不为name生成Getter方法，字段上的注解优先级更高
    private String name;
    private int age;
}
```

得到的结果就是：

```java
@Getter(AccessLevel.PRIVATE)   //为所有字段生成private的Getter方法
public class Account {
    private int id;
    @Getter(AccessLevel.NONE)   //不为name生成Getter方法，字段上的注解优先级更高
    private String name;
    private int age;
}
```

我们接着来看它的 `onMethod` 属性，这个属性用于添加一些额外的注解到生成的方法上，比如我们要为Getter方法添加一个额外的
`@Deprecated` 表示它不推荐使用，那么：

```java
@Getter
public class Account {
    private int id;
    @Getter(onMethod_ = { @Deprecated })
    private String name;
    private int age;
}
```

此时得到的代码为：

```java
public class Account {
    ...

    /** @deprecated */
    @Deprecated   //由Lombok额外添加的注解
    public String getName() {
        return this.name;
    }
}
```

最后我们再来看看它的 `lazy` 属性，这是用于控制懒加载，就是在一开始的时候此字段没有值，当我们需要的时候再将值添加到此处。

只不过它有一些要求，我们的字段必须是 private 且 final 的：

```java
public class Account {
    @Getter(lazy = true)
    private final String name = "你干嘛";
}
```

生成的代码为：

```java
public class Account {
  	//这里会自动将我们的字段修改为AtomicReference原子类型，以防止多线程环境下出现的问题
    private final AtomicReference<Object> name = new AtomicReference();

    ...

    //当我们调用getName才会去初始化字段的值，为了保证初始化只进行一次，整个过程与懒汉式单例模式一致
    public String getName() {
        Object $value = this.name.get();
        if ($value == null) {   //判断值是否为null，如果是则需要进行懒初始化
            synchronized(this.name) {    //对我们的字段加锁，保证同时只能进一个
                $value = this.name.get();
                if ($value == null) {    //再次进行一次判断，因为有可能其他线程后进入
                    String actualValue = "你干嘛";
                    $value = "你干嘛" == null ? this.name : "你干嘛";
                    this.name.set($value);
                }
            }
        }
				//返回得到的结果
        return (String)($value == this.name ? null : $value);
    }
}
```

至此，有关 `@Getter `注解相关的内容我们就介绍完毕了，我们接着来看 `@Setter` 注解，它与 `@Getter` 非常相似，用于生成字段对应的Setter方法。

它同样会根据字段名称来生成Setter方法，其他参数与 `@Getter` 用法一致，唯一一个不一样的参数为 `onParam` ，它可以在形参上的额外添加的自定义注解。

最后需要注意的是，如果我们手动编写了对应字段的Getter或是Setter方法（按照上述命名规则进行判断）那么Lombok提供的注解将不会生效，也不会覆盖我们自己编写的方法：

```java
public class Account {
    @Setter
    private String name;

    public void setName(int name) {   //即使上面添加Setter注解，这里也不会被覆盖，但是仅限于同名不同参的情况
        System.out.println("我是自定义的");
        this.name = name;
    }
}
```

如果出现同名不同参数的情况导致误判，我们也可以使用 `@Tolerate` 注解使Lombok忽略它的存在，继续生成。

Lombok 提供了一个 `@Accessors` 注解，用于配置 lombok 如何生成和查找 getters 和 setters。

### 构造方法

[柏码知识库 | Lombok 极速上手 (itbaima.cn)](https://www.itbaima.cn/document/iqbc2haub31bwqtz?segment=1#doc5-构造方法相关)

Lombok 也可以为我们自动生成对应的构造方法，它提供了三个用于处理构造方法的注解，首先是最简单的 `@AllArgsConstructor`
，它用于为类中所有的字段生成一个构造方法：

```java
@AllArgsConstructor// 只能添加到类上
public class Account {
    private int id;
    private String name;
    private int age;
}
```

之后会自动生成一个携带所有参数的构造器：

```java
public class Account {
    private int id;
    private String name;
    private int age;

    public Account(int id, String name, int age) {   //自动生成一个携带所有参数的构造方法
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
```

这个参数包含一些属性：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface AllArgsConstructor {
    //用于生成一个静态构造方法
    String staticName() default "";
    
    //用于在构造方法上添加额外的注解
    AnyAnnotation[] onConstructor() default {};
    
  	//设置构造方法的访问权限级别
  	AccessLevel access() default lombok.AccessLevel.PUBLIC;
    ...
}
```

这里的 `List.of()` 其实就是一种静态构造方法，通常用于快速构造对应的类对象，我们也可以像这样去编写，只需要将`staticName`
设置一个名字即可：

```java
@AllArgsConstructor(staticName = "with")
public class Account {
    ...
}
```

得到的结果为：

```java
public class Account {
    ...

    //强制生成一个带全部参数的private方法，不可修改
    private Account(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public static Account with(int id, String name, int age) {
        return new Account(id, name, age);
    }
}
```

在使用时，可以调用此静态构造方法来创建对象：

```java
Account account = Account.with(1, "小明", 18);
```

无参构造方法为 `@NoArgsConstructor` 注解即可，但是注意，当我们使用 `@NoArgsConstructor` 时类中不允许存在final类型的字段，否则会出现错误：

![QQ_1722937534148](https://image.itbaima.cn/markdown/2024/08/06/PiYOwgRElzM2yb1.png)

为此，`@NoArgsConstructor` 有一个 `force` 属性，它可以在创建无参构造时，为final类型的字段给一个默认值，这样就可以同时存在了：

```java
@NoArgsConstructor(force = true)   //强制开启
@AllArgsConstructor
public class Account {
    private final int id;   //字段必须初始化
    private String name;
    private int age;
}
```

构造方法的最后一个注解是 `@RequiredArgsConstructor` 用于生成那些需要初始化的参数的构造方法，也就是类中的哪些字段为 final
，只针对这些字段生成对应的构造方法，比如：

```java
@RequiredArgsConstructor
public class Account {
    private final int id;
    private String name;
    private final int age;
}
```

生成的结果为：

```java
public class Account {
    ...

    public Account(int id, int age) {   //只为fianl字段id和age生成了对应的构造方法
        this.id = id;
        this.age = age;
    }
}
```

### 打印对象

也可以使用 lombok 的 `@ToString` 注解为类生成 toString 方法：

```java
@ToString
@AllArgsConstructor
public class Account {
    private int id;
    private String name;
    private int age;
}
```

查看编译后的代码为：

```java
    @Generated
    public String toString() {
        return "Account(id=" + this.id + ", name=" + this.name + ", age=" + this.age + ")";
    }
```

`@ToString` 注解的参数如下：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface ToString {
    //是否在打印的内容中带上对应字段的名字
    boolean includeFieldNames() default true;
    
    //用于排除不需要打印的字段（这种用法很快会被移除，不建议使用）
    String[] exclude() default {};
    
    //和上面相反，设置哪些字段需要打印，默认打印所有（这种用法很快会被移除，不建议使用）
    String[] of() default {};
    
    //不仅为当前类中所有字段生成，同时还调用父类toString进行拼接
    boolean callSuper() default false;
    
    //默认情况下生成的toString会尽可能使用get方法获取字段值，我们也可以手段关闭这个功能
    boolean doNotUseGetters() default false;
    
    //开启后将只为字段或get方法上添加了@ToString.Includ注解的内容生成toString方法，白名单模式
    boolean onlyExplicitlyIncluded() default false;
    
    /**
     * 用于排除toString中的字段
     */
    @Target(ElementType.FIELD)
    @Retention(RetentionPolicy.SOURCE)
    public @interface Exclude {}
    
    /**
     * 用于手动包含toString中的字段
     */
    @Target({ElementType.FIELD, ElementType.METHOD})
    @Retention(RetentionPolicy.SOURCE)
    public @interface Include {
			 //配置字段打印顺序的优先级
       int rank() default 0;
       
       //配置一个自定义的字段名称进行打印
       String name() default "";
    }
}
```

### 比较

Lombok 的 `@EqualsAndHashCode` 注解可以为我们自动生成类属性的比较方法以及对应的HashCode计算：

```java
@EqualsAndHashCode
@AllArgsConstructor
public class Account {
    private int id;
    private String name;
    private int age;
}
```

编译后的文件为：

```java
public class Account {
    ...

    public boolean equals(Object o) {   //自动生成的equals重写方法，包含所有参数的比较
        ... 
    }

    protected boolean canEqual(Object other) {
        return other instanceof Account;
    }

    public int hashCode() {   //自动生成的hashCode重写方法
        ...
    }

    ...
}
```

该注解中的一些属性和 `@ToString` 注解差不多，使用的时候再具体看吧。

### 建造者

可以采用 `@Builder` 注解将一个类快速的转换为建造者模式：

```java
@Builder
@ToString
public class Account {
    int id;
    String name;
    int age;
}
```

使用：

```java
public static void main(String[] args) {
    Account account = Account.builder()
            .id(1)
            .name("小明")
            .age(18)
            .build();
    System.out.println(account);
}
```

### 资源释放

需要释放资源，在 java 7 中可以使用 `try-with-resource` 语法，减少了我们编写资源释放语句的成本：

```java
public static void main(String[] args) throws IOException {
  	//使用try-with-resource会自动生成close相关操作的代码
    try (FileInputStream in = new FileInputStream("test.exe")){
        byte[] bytes = in.readAllBytes();
        System.out.println(new String(bytes));
    }
}
```

但 lombok 为我们提供了更简单的注解 `@Cleanup` ，只需要在释放的资源变量之前使用：

```java
    @Test
    public void testCleanUp() throws IOException {
        //添加即可自动释放资源
        @Cleanup FileInputStream in = new FileInputStream("D:/03-codes/02-自己的代码/02-study/test.txt");
        byte[] bytes = in.readAllBytes();
        System.out.println(new String(bytes));
    }
```

查看编译的代码为：

```java
    @Test
    public void testCleanUp() throws IOException {
        FileInputStream in = new FileInputStream("D:/03-codes/02-自己的代码/02-study/test.txt");

        try {
            byte[] bytes = in.readAllBytes();
            System.out.println(new String(bytes));
        } finally {
            if (Collections.singletonList(in).get(0) != null) {
                in.close();
            }

        }

    }
```

### 异常处理

在很多需要处理异常的情形下，导致很多地方都需要写 throws 去抛出异常，lombok 提供了 `@SneakyThrows` 注解抛出异常：

```java
    @Test
    @SneakyThrows
    public void testSneakyThrows() {
        //添加即可自动释放资源
        @Cleanup FileInputStream in = new FileInputStream("D:/03-codes/02-自己的代码/02-study/test.txt");
        byte[] bytes = in.readAllBytes();
        System.out.println(new String(bytes));
    }
```

编译后的代码为：

```java
    @Test
    public void testSneakyThrows() {
        try {
            FileInputStream in = new FileInputStream("D:/03-codes/02-自己的代码/02-study/test.txt");

            try {
                byte[] bytes = in.readAllBytes();
                System.out.println(new String(bytes));
            } finally {
                if (Collections.singletonList(in).get(0) != null) {
                    in.close();
                }

            }

        } catch (Throwable var7) {
            Throwable $ex = var7;
            throw $ex;
        }
    }
```

### 非空判断

lombok 提供了 `@NonNUll` 注解去进行非空的判断：

```java
public static void test(@NonNull String text){
    System.out.println(text);
}
```

编译后的代码为：

```java
public static void test(@NonNull String text) {
    if (text == null) {
        throw new NullPointerException("text is marked non-null but is null");
    } else {
        System.out.println(text);
    }
}
```

除了方法的形式参数外，`@NonNull` 也可以添加到局部变量上 ，但是只会有一个警告效果。

### 锁

但其实使用很少，一般都是自己写

在多线程的时候，会涉及到并发的问题，但是可能出现的场景需求是，同一个代码内的两个方法使用两个锁对象，让两个方法的执行互相不影响，这个时候写的代码为：

```java
final Object lock1 = new Object(); 
final Object lock2 = new Object();

public void test(){
    synchronized (lock1) {
        
    }
}

public void test2(){
    synchronized (lock2) {

    }
}
```

但是这个样子写的很麻烦，lombok 为我们提供了一个 `@Synchronized`注解，它可以自动生成同步代码块：

```java
private final Object lock1 = new Object();

@Synchronized("lock1")  //直接指定作为锁的变量名称
public void test() {  }
```

编译后的代码为：

```java
public void test() {
    synchronized(this.lock1) {

    }
}
```

如果我们不填写锁名称，那么它会按照我们的方法性质添加一把默认的锁：

- 成员方法：统一使用一个名称为 `$lock` 的锁作为对象锁。
- 静态方法：统一使用一个名称为 `$LOCK` 的锁作为类锁。

除了 `@Synchronized `之外，Lombok也为我们提供了一个JUC版本，它采用ReentrantLock作为锁，注解名称为 `@Locked`：

### 日志

Lombok 为不同的日志框架提供了一个快速注解，有很多如下：

- @Log,
- @Log4j
- @Log4j2
- @Slf4j
- @XSlf4j
- @JBossLog
- @Flogger
- @CustomLog



