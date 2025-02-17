# Spring

:::details 参考资料：

- [黑马程序员SSM框架教程](https://www.bilibili.com/video/BV1Fi4y1S7ix)

:::

[Spring](https://spring.io/) 是一个框架，为了简化开发而生，以 **IOC**（`inverse of control`：控制反转bean的创建权）和 **AOP**（`aspect oriented programming`：面向切面编程）为内核。

## 1、简介

### 1.1.目前项目中的问题

目前代码在编写过程中遇到的问题:

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/0101.png" alt="当前的问题" style="margin: auto;zoom:60%">

- 业务层需要调用数据层的方法，就需要在业务层 `new` 数据层的对象
- 如果数据层的实现类发生变化，那么业务层的代码也需要跟着改变

耦合度非常高，IOC 就是为了解决这个问题的，使用对象时，在程序中不要主动使用 `new` 产生对象，转换为**由外部提供对象**。

### 1.2.基础概念

Spring 提供了 IOC 容器，存放一个个 bean 对象。被创建或者被管理的对象在 IOC 容器中统称为 bean， IOC 容器负责对象的创建、初始化等一系列工作。

DI（`Dependency Injection`）依赖注入，是在容器中建立 bean 与 bean 之间的依赖关系的整个过程。

通过 IOC 和 DI 可以解决上述问题，充分解耦，实现：

- 使用 IOC 容器管理 bean
- 在 IOC 容器内将有依赖关系得到 bean 进行关系绑定（DI）

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/0102.png" alt="IOC 和 DI" style="margin: auto;zoom:60%">

### 1.3.IOC入门案例

需求：将 BookServiceImpl 和 BookDaoImpl 交给 Spring 管理，并从容器中获取对应的 bean 对象进行方法调用。

- 创建 Maven 项目

````xml
<dependencies>
    <!--spring的core-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
    <!--测试-->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
</dependencies>
````

- 创建类

````java
public interface BookDao {
    public void save();
}
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }
}
public interface BookService {
    public void save();
}
public class BookServiceImpl implements BookService {
    private BookDao bookDao = new BookDaoImpl();
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
````

- 添加 spring 配置文件

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/0103.png" alt="创建spring配置文件" style="margin: auto;zoom:60%">

完成 bean 的配置：

````xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <!--id：bean的唯一标识符-->
    <bean id="bookDao" class="com.cola.spring.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.cola.spring.service.impl.BookServiceImpl"/>
    
</beans>
````

- 使用 IOC

````java
public class AppSpring {
    public static void main(String[] args) {
        // 获取 IOC 容器
        ApplicationContext ctx = new ClassPathXmlApplicationContext("spring.xml");

        // 获取 bean 进行方法调用
        ctx.getBean(BookService.class).save();
    }
}
````

### 1.4.DI入门案例

IOC 的入门案例中，仍然存在对象 new 的操作，解决 `BookServiceImpl` 类中`new BookDaoImpl()` 的耦合问题，需要通过 `DI` 。

需求：在 `BookServiceImpl` 类中删除 `new` 对象的方式，使用 Spring 的 DI 完成 Dao 层的注入。

- 去除强耦合

````java
public class BookServiceImpl implements BookService {
    //删除业务层中使用new的方式创建的dao对象
    private BookDao bookDao;

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
````

- 提供 setter 方法

````java
public class BookServiceImpl implements BookService {
    //删除业务层中使用new的方式创建的dao对象
    private BookDao bookDao;

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
    //提供对应的set方法
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }
}
````

- 修改 spring 的配置文件，完成 DI

````xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--id：bean的唯一标识符-->
    <bean id="bookDao" class="com.cola.spring.dao.impl.BookDaoImpl"/>

    <!--配置server与dao的关系-->
    <!--
            property标签表示配置当前bean的属性
            name="bookDao"中`bookDao`的作用是让Spring的IOC容器在获取到名称后，将首字母大写，前面加set找对应的`setBookDao()`方法进行对象注入
            ref="bookDao"中`bookDao`的作用是让Spring能在IOC容器中找到id为`bookDao`的Bean对象给`bookService`进行注入
    -->
    <bean id="bookService" class="com.cola.spring.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"/>
    </bean>
</beans>
````

## 2、IOC

### 2.1.bean基础配置

class属性能不能写接口 `BookDao` 的类全名呢?

- 不行，接口是没办法创建对象

````xml
    <!--name:为bean指定别名，别名可以有多个，使用逗号，分号，空格进行分隔-->
    <bean id="bookService" name="service service4 bookEbi" class="com.itheima.service.impl.BookServiceImpl">
        <!--ref进行依赖注入，该bean必须在IOC中-->
        <property name="bookDao" ref="bookDao"/>
    </bean>

    <!--scope：为bean设置作用范围，可选值为单例singloton（默认），非单例prototype-->
    <bean id="bookDao" name="dao" class="com.itheima.dao.impl.BookDaoImpl"/>
````

`scope` 属性为单例模式，就避免了对象的频繁创建与销毁，达到了 bean 对象的高复用。

bean在容器中是单例的，会不会产生线程安全问题?

* 如果对象是有状态对象，即该对象有成员变量可以用来存储数据的，
* 因为所有请求线程共用一个bean对象，所以会存在线程安全问题。
* 如果对象是无状态对象，即该对象没有成员变量没有进行数据存储的，
* 因方法中的局部变量在方法调用完成后会被销毁，所以不会存在线程安全问题。

### 2.2.bean实例化

Spring IOC 创建 bean 有三种方法：

- 构造方法（常用）
- 静态工厂（了解）
- 实例工厂（了解）

Spring 是通过默认的无参构造器实现 bean 的实例化的，如果重写了含参的构造方法，需要显式声明无参的构造方法。

### 2.3.bean生命周期

Spring 中对 bean生命周期控制提供了两种方式控制：

````xml
<bean id="bookDao" class="com.cola.spring.dao.impl.BookDaoImpl" init-method="init" destroy-method="destory"/>
````

对于bean的生命周期控制在bean的整个生命周期中所处的位置如下:

* 初始化容器
    * 创建对象(内存分配)
    * 执行构造方法
    * 执行属性注入(set操作)
    * 执行bean `init-method` (初始化方法)
* 使用bean
    * 执行业务操作
* 关闭/销毁容器
    * 执行bean `destroy-method` （销毁方法）

## 3、DI

优先选择使用 setter 注入

### 3.1.setter 注入

- 引用类型：

````java
public class BookServiceImpl implements BookService {
    private BookDao bookDao;
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }
}
````

````xml
<bean id="bookService" class="com.itheima.service.impl.BookServiceImpl">
	<property name="bookDao" ref="bookDao"/>
</bean>

<bean id="bookDao" class="com.itheima.dao.imipl.BookDaoImpl"/>
````

- 简单数据类型：

````java
public class BookDaoImpl implements BookDao {

    private String databaseName;
    private int connectionNum;

    public void setConnectionNum(int connectionNum) {
        this.connectionNum = connectionNum;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public void save() {
        System.out.println("book dao save ..."+databaseName+","+connectionNum);
    }
}
````

````xml
<bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl">
    <property name="databaseName" value="mysql"/>
    <!--value:后面跟的是简单数据类型，对于参数类型，Spring在注入的时候会自动转换-->
    <property name="connectionNum" value="10"/>
</bean>
````

### 3.2.构造器注入

- 引用类型：

````java
public class BookServiceImpl implements BookService{
    private BookDao bookDao;
    private UserDao userDao;

    public BookServiceImpl(BookDao bookDao,UserDao userDao) {
        this.bookDao = bookDao;
        this.userDao = userDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
        userDao.save();
    }
}
````

````xml
<bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl"/>
<bean id="bookService" class="com.itheima.service.impl.BookServiceImpl">
    <!--name属性对应的值为构造函数中方法形参的参数名，必须要保持一致-->
    <constructor-arg name="bookDao" ref="bookDao"/>
    <constructor-arg name="userDao" ref="userDao"/>
</bean>
````

- 简单类型：

````java
public class BookDaoImpl implements BookDao {
    private String databaseName;
    private int connectionNum;

    public BookDaoImpl(String databaseName, int connectionNum) {
        this.databaseName = databaseName;
        this.connectionNum = connectionNum;
    }

    public void save() {
        System.out.println("book dao save ..."+databaseName+","+connectionNum);
    }
}
````

````xml
<bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl">
    <constructor-arg name="databaseName" value="mysql"/>
    <constructor-arg name="connectionNum" value="666"/>
</bean>
````

### 3.3.集合注入

````java
public class BookDaoImpl implements BookDao {

    private int[] array;

    private List<String> list;

    private Set<String> set;

    private Map<String,String> map;

    private Properties properties;

     public void save() {
        System.out.println("book dao save ...");

        System.out.println("遍历数组:" + Arrays.toString(array));

        System.out.println("遍历List" + list);

        System.out.println("遍历Set" + set);

        System.out.println("遍历Map" + map);

        System.out.println("遍历Properties" + properties);
    }
	//setter....方法省略，自己使用工具生成
}
````

- 数组：

````xml
<property name="array">
    <array>
        <value>100</value>
        <value>200</value>
        <value>300</value>
    </array>
</property>
````

- List：

````xml
<property name="list">
    <list>
        <value>itcast</value>
        <value>itheima</value>
        <value>boxuegu</value>
        <value>chuanzhihui</value>
    </list>
</property>
````

- Set

````xml
<property name="set">
    <set>
        <value>itcast</value>
        <value>itheima</value>
        <value>boxuegu</value>
        <value>boxuegu</value>
    </set>
</property>
````

- Map

````xml
<property name="map">
    <map>
        <entry key="country" value="china"/>
        <entry key="province" value="henan"/>
        <entry key="city" value="kaifeng"/>
    </map>
</property>
````

- Properties：

````xml
<property name="properties">
    <props>
        <prop key="country">china</prop>
        <prop key="province">henan</prop>
        <prop key="city">kaifeng</prop>
    </props>
</property>
````
---

## 4、注解开发

可以发现，虽然 spring 可以控制 bean 的生成，但是使用起来还是比较复杂的。主要是要写很多的配置文件，现在的 spring 已经支持纯注解开发。

### 4.1.纯注解开发

- 配置类：

````java
@Configuration // 当前类为配置类
@ComponentScan("com.cola.spring") // 设定扫描路径，此注解只能添加一次，多个数据请用数组格式
public class SpringConfig {
}
````

- dao：

````java
@Repository
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }

    @PostConstruct //在构造方法之后执行，替换 init-method
    public void init() {
        System.out.println("init ...");
    }

    @PreDestroy //在销毁方法之前执行,替换 destroy-method
    public void destroy() {
        System.out.println("destroy ...");
    }
}
````

- service:

````java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
````

### 4.2.DI注解开发

- 按照名称注入对象：

````java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    @Qualifier("bookDao1") //不能独立使用，必须和@Autowired一起使用
    private BookDao bookDao;
    
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
````

- 简单类型注入：

````java
@Repository("bookDao")
public class BookDaoImpl implements BookDao {
    @Value("itheima")
    private String name;
    public void save() {
        System.out.println("book dao save ..." + name);
    }
}
````

- 读取properties配置文件：

````java
@Configuration
@ComponentScan("com.itheima")
@PropertySource("jdbc.properties") //如果读取的配置文件有多个，可以使用`@PropertySource`的属性来指定多个，不支持通配符
public class SpringConfig {
}
````

- 读取配置文件中的内容

````java
@Repository("bookDao")
public class BookDaoImpl implements BookDao {
    @Value("${name}")
    private String name;
    public void save() {
        System.out.println("book dao save ..." + name);
    }
}
````

### 4.3.管理第三方bean

- 制作为Spring管理的一个bean对象

````java
@Configuration
public class SpringConfig {
	@Bean
    public DataSource dataSource(){
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost:3306/spring_db");
        ds.setUsername("root");
        ds.setPassword("root");
        return ds;
    }
}
````

## 5、AOP

AOP（`Aspect Oriented Programming`），面向切面编程，在不改原有代码的前提下对其进行增强。



# A

````
````

````
````



<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/0101.png" alt="当前的问题" style="margin: auto;zoom:60%">
