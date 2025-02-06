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




# A

````
````

````
````

````
````

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/0101.png" alt="当前的问题" style="margin: auto;zoom:60%">
