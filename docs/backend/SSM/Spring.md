# Spring

:::details 学习参考资料：

- [SSM框架教程](https://www.bilibili.com/video/BV1WZ4y1P7Bp)
  :::

## 1.简介

[Spring](https://spring.io/)是分层的 Java SE/EE full-stack 轻量级开源框架，以 **IOC**（inverse of control：控制反转bean的创建权）和
**AOP**（aspect
oriented programming：面向切面编程）为内核。

提供了展现层（**SpringMVC**）和持久层（**Spring JDBCTemplate**）以及业务层事务管理等众多企业级应用技术，还能整合开源世界众多著名的第三方框架和类库，逐渐成为使用最多的Java
EE企业应用开源框架。

Spring 的优势：

- 方便解耦，简化开发：
    - 通过 Spring 提供的 IOC 容器，可以将对象间的依赖关系交给由 Spring
      进行控制，避免硬编码造成的过度耦合。用户也不必再为单例模式类、属性文件解析等这些很底层的需求编写代码，可以更专注于上层的应用。
- AOP 编程的支持
    - 面向切面编程，许多不容易用传统的 OOP 实现的功能可以通过 AOP 轻松实现
- 声明式事务的支持
- 方便程序的测试
    - 可以用非容器依赖的编程方式进行几乎所有的测试工作，随手就可以编写测试代码
- 集合各种优秀框架
    - Struts、Hibernate、Quartz等
- 降低 Java EE API 的使用难度
    - Spring 对一些 API 进行了封装，可以简单的直接调用

## 2.快速入门

### 2.1.开发步骤

- 导入Spring框架对应的jar包
- 编写对应的类
- 创建xml配置文件，注册为bean
- 通过Spring容器获取bean

### 2.2.入门程序

1. 导入jar包：

```xml
<!--spring-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.1.12</version>
</dependency>
```

2. 编写实现类

```java
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("save running");
    }
}
```

3. 编写xml配置文件，注册bean

在 `resources` 目录下，新增 `applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.fkx.spring.dao.impl.UserDaoImpl"/>
</beans>
```

4. 通过Spring容器获取bean

```java
public class UserDaoTest {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserDao userDao = (UserDao) applicationContext.getBean("userDao");
        userDao.save();
    }
}
```

## 3.配置文件

### 3.1.bean标签

将 bean 的创建交给 Spring，默认情况下调用类重的无参构造函数，若没有无参构造方法则无法成功创建 bean

| 标签名            | 含义                                                                       |
|----------------|--------------------------------------------------------------------------|
| id             | bean实例在Spring容器中的唯一标识                                                    |
| class          | bean的全限定名称                                                               |
| scope          | bean的作用范围：singleton（默认值，单例），prototype（多例），request、session、global session |
| init-method    | 指定类的初始化方法                                                                |
| destroy-method | 指定类中销毁方法名称                                                               |

- scope：
    - singleton，加载应用就创建bean，应用在，bean在，销毁容器，bean就无了
    - prototype，使用对象时，创建新的对象实例，只要bean在使用中，就一直活着，当对象长时间不用时，会被 Java 的垃圾回收器回收

### 3.2.依赖注入

现在 spring 容器可以成功管理 bean 了，那么如何将 bean 注入到其它得到类中呢？比如， service 中的类如何使用 dao ， controller
怎么获取到 service ？

就是通过**依赖注入**（DI，`dependency injection`）完成的，是 Spring 框架核心 IOC 的具体体现，通过以下两种方法：

- 构造方法

  ```java
  public class UserServiceImpl implements UserService {
    private UserDao userDao;
  
      public UserServiceImpl() {
      }
  
      public UserServiceImpl(UserDao userDao) {
          this.userDao = userDao;
      }
  
      @Override
      public void save() {
          userDao.save();
      }
  }
  ```
  spring的xml配置文件中配置：

  ```xml
    <bean id="userDao" class="com.fkx.spring.dao.impl.UserDaoImpl"/>
    <bean id="userService" class="com.fkx.spring.service.impl.UserServiceImpl">
        <constructor-arg name="userDao" ref="userDao"/>
    </bean>
  ```
- set方法
  ```java
  public class UserServiceImpl implements UserService {
    private UserDao userDao;
  
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
  
    @Override
    public void save() {
        userDao.save();
    }
  }
  ```
  spring的xml配置文件中配置：

  ```xml
  <bean id="userDao" class="com.fkx.spring.dao.impl.UserDaoImpl"/>
  <bean id="userService" class="com.fkx.spring.service.impl.UserServiceImpl">
       <property name="userDao" ref="userDao"/>
  </bean>
  ```

将 Dao 注入到 Service 中。

上面的操作都是注入引用的 bean，除了对象的引用可以注入，普通数据类型、集合等都可以在spring容器中进行注入：

注入数据的三种数据类型：

- 普通数据类型
  ```java
    public class UserDaoImpl implements UserDao {
      private String userName;
      private int age;
  
      public void setAge(int age) {
          this.age = age;
      }
  
      public void setUserName(String userName) {
          this.userName = userName;
      }  
    }
  ```
  ```xml
    <bean id="userDao" class="com.fkx.spring.dao.impl.UserDaoImpl">
        <property name="userName" value="bob"/>
        <property name="age" value="25"/>
    </bean>
  ```

- 引用数据类型
- 集合数据类型

```java
@Data
public class User {
    private String name;
    private int age;
}
```

```java
@Data
public class UserDaoImpl implements UserDao {

    private List<String> list;
    private Map<String, User> map;
    private Properties properties;

    @Override
    public void save() {
        System.out.println(list);
        System.out.println(map);
        System.out.println(properties);
        System.out.println("save running");
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userDao" class="com.fkx.spring.dao.impl.UserDaoImpl">
        <property name="list">
            <list>
                <value>a</value>
                <value>b</value>
                <value>c</value>
            </list>
        </property>
        <property name="map">
            <map>
                <entry key="a" value-ref="userA"/>
                <entry key="b" value-ref="userB"/>
            </map>
        </property>
        <property name="properties">
            <props>
                <prop key="a">A</prop>
                <prop key="b">B</prop>
                <prop key="c">C</prop>
            </props>
        </property>
    </bean>
    <bean id="userA" class="com.fkx.spring.domain.User">
        <property name="name" value="adam"/>
        <property name="age" value="23"/>
    </bean>
    <bean id="userB" class="com.fkx.spring.domain.User">
        <property name="name" value="bob"/>
        <property name="age" value="24"/>
    </bean>
</beans>
```

### 3.3.引入其它的配置文件

在实际的开发中，Spring 配置内容非常多，可以在 Spring 的主配置文件中通过 `import` 标签进行加载：

```txt
<import resource="applicationContext-xxx.xml"/>
```

### 3.4.ApplicationContext的继承体系

`applicationContext` ：接口类型，代表应用上下文，可以通过它的实例获得 Spring 容器中的 bean 对象

`ApplicationContext` 的实现类：

- ClassPathXmlApplicationContext：它是从类的根路径下加载配置文件
- FileSystemXmlApplicationContext：磁盘路径上加载配置文件
- AnnotationConfigApplicationContext：使用注解配置容器对象

## 4.注解开发

之前的都是通过 xml 进行配置，影响开发效率，采用注解代替 xml 配置文件，提高开发效率：

常见的注解有：

| 注解               | 说明                                |
|------------------|-----------------------------------|
| `@Component`     | 类上用于实例化bean                       |
| `@Controller`    | web类上用于实例化bean                    |
| `@Service`       | service层类上用于实例化bean               |
| `@Repository`    | dao层类上用于实例化bean                   |
| `@Autowired`     | 使用在字段上用于根据类型依赖注入                  |
| `@Qualifier`     | 结合@Autowired一起使用用于根据名称进行依赖注入      |
| `@Resource`      | 相当于@Autowired+@Qualifier，按照名称进行DI |
| `@Value`         | 注入普通属性                            |
| `@Scope`         | 标注bean的作用范围                       |
| `@PostConstruct` | 使用在方法上，bean的初始化方法                 |
| `@PreDestroy`    | 使用在方法上，bean的销毁方法                  |

