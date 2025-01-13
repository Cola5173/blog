# Spring

:::details 参考资料：

- [Spring 核心教程](https://www.bilibili.com/video/BV1Kv4y1x7is)

:::

[Spring](https://spring.io/) 是一个框架，为了简化开发而生，以 **IOC**（inverse of control：控制反转bean的创建权）和
**AOP**（aspect oriented programming：面向切面编程）为内核。

## 1、IOC

### 1.1.IOC理论介绍

之前编写的整个程序其实是依靠各个部分相互协作，共同完成一个操作，比如要展示借阅信息列表，那么首先需要使用Servlet进行请求和响应的数据处理，然后请求的数据全部交给对应的Service（业务层）来处理，当Service发现要从数据库中获取数据时，再向对应的Mapper发起请求。

它们之间就像连接在一起的齿轮，谁也离不开谁：

<img src="https://oss.itbaima.cn/internal/markdown/2022/10/08/YQRP2idIS5skHJ4.png" alt="齿轮" style="margin: auto">

就像一个团队，每个人的分工都很明确，流水线上的一套操作必须环环相扣，这是一种高度耦合的体系。

但是这样存在一个很严重的问题，之前写好的代码，实现的功能，需要全部推翻，改成新的功能，那么我们就不得不去修改某些流水线上的模块，但是这样一修改，会直接导致整个流水线的引用关系大面积更新。

于是引入了 IOC ，Service的实现类，不再由我们决定，而是让程序自己决定。所有的实现类对象，全部交给程序来管理，所有对象之间的关系，也由程序来动态决定，这样就引入了IoC理论。

IOC是Inversion of Control的缩写，翻译为：“控制反转”，把复杂系统分解成相互合作的对象，这些对象类通过封装以后，内部实现对外部是透明的，从而降低了解决问题的复杂度，而且可以灵活地被重用和扩展。

<img src="https://oss.itbaima.cn/internal/markdown/2022/10/08/XsYQRk93CHewISB.png" alt="ioc" style="margin: auto">

可以将对象交给IoC容器进行管理，比如当我们需要一个接口的实现时，由它根据配置文件来决定到底给我们哪一个实现类，这样，我们就可以不用再关心我们要去使用哪一个实现类了，我们只需要关心，给到我的一定是一个可以正常使用的实现类，能用就完事了，反正接口定义了啥，我只管调。

有了IoC容器加持之后：

````java
public static void main(String[] args) {
		A a = new A();
  	a.test(IoC.getBean(Service.class));   //瞎编的一个容器类，但是是那个意思
  	//比如现在在IoC容器中管理的Service的实现是B，那么我们从里面拿到的Service实现就是B
}

class A{
    private List<Service> list;   //一律使用Service，具体实现由IoC容器提供
    public Service test(Service b){
        return null;
    }
}

interface Service{ }   //使用Service做一个顶层抽象

class B implements Service{}  //B依然是具体实现类，并交给IoC容器管理
````

当具体实现类发生修改时，我们同样只需要将新的实现类交给IoC容器管理，这样我们无需修改之前的任何代码：

````java
interface Service{ }

class D implements Service{}   //现在实现类变成了D，但是之前的代码并不会报错
````

即使我们的底层实现类发生了修改，也不会导致与其相关联的类出现错误，而进行大面积修改，通过定义**抽象+容器管理**
的形式，我们就可以将原有的强关联解除。

高内聚，低耦合，是现代软件的开发的设计目标。而Spring框架就给我们提供了这样的一个IoC容器进行对象的的管理，一个由Spring
IoC容器实例化、组装和管理的对象，我们称其为Bean。

### 1.2.入门程序

使用Spring首要目的是为了使得软件项目进行解耦，而不是为了去简化代码！Spring并不是一个独立的框架，它实际上包含了很多的模块：

<img src="https://oss.itbaima.cn/internal/markdown/2022/11/21/KT2XhuCNVmcSvi5.png" alt="spring framework" style="margin: auto">

首先要去学习的就是Core Container，也就是核心容器模块，只有了解了Spring的核心技术，才能真正认识这个框架为我们带来的便捷之处。

导入依赖可就以使用了，Spring核心框架的Maven依赖坐标：

````xml
<!--spring core-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.10</version>
</dependency>
````

Spring 6要求使用的Java版本为17及以上，这个 `context` 中包含了如下依赖：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/Spring01.png" alt="spring6.0.10" style="margin: auto">

这里出现的都是 Spring 核心相关的内容，如AOP、Beans、Core、SpEL。

Spring 会给提供 IoC 容器用于管理 Bean，但是得先编写一个配置文件，通过配置文件告诉容器管理哪些 Bean 以及 Bean 的属性、依赖关系等。

需要在 resource 中创建一个 Spring 配置文件：

````xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
````

如果需要使用 Spring 提供的 IoC 容器，就需要创建一个应用程序上下文，它代表的就是IoC容器，它会负责实例化、配置和组装Bean：

````java
public static void main(String[] args) {
    //ApplicationContext是应用程序上下文的顶层接口，它有很多种实现，这里我们先介绍第一种
    //因为这里使用的是XML配置文件，所以说我们就使用 ClassPathXmlApplicationContext 这个实现类
    ApplicationContext context = new ClassPathXmlApplicationContext("test.xml");  //这里写上刚刚的名字
}
````

比如要让 IoC 容器帮助管理一个Student对象（Bean），首先先将 Student 类定义出来：

````java
package com.fkx.spring.bean;

public class Student {
    public void hello() {
        System.out.println("Hello World!");
    }
}
````

在 `test.xml` 中配置：

````xml
<!--配置bean，交给ioc-->
<bean name="student" class="com.fkx.spring.bean.Student"/>
````

这个对象不需要手动创建了，而是由IoC容器自动进行创建并提供，可以直接从上下文中获取到：

````java
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("test.xml");

    //使用getBean方法来获取对应的对象（Bean）
    Student student = (Student) context.getBean("student");   
    student.hello();
}
````

这里得到的Student对象是由Spring通过反射机制帮助我们创建的，流程为：

<img src="https://oss.itbaima.cn/internal/markdown/2022/11/22/sjLiFokU1f3CvH5.png" alt="ioc创建bean流程" style="margin: auto">

### 1.3.注册和配置bean

实际上配置文件可以有很多个，并且这些配置文件是可以相互导入的：

````xml
<!--导入配置文件-->
<import resource="test.xml"/>
````

要配置一个Bean，只需要添加：

````xml
<!--写清楚bean的类-->
<bean class="com.test.bean.Student"/>
````

可以看到类的旁边出现了Bean的图标，表示Bean已经注册成功：

<img src="https://oss.itbaima.cn/internal/markdown/2022/11/22/SRV3znQJH4A7vDl.png" alt="注册bean成功">

可以根据类型向容器索要Bean实例对象了：

````java
public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("test.xml");
  	//getBean有多种形式，其中第一种就是根据类型获取对应的Bean
  	//容器中只要注册了对应类的Bean或是对应类型子类的Bean，都可以获取到
    Student student = context.getBean(Student.class);
    student.hello();
}
````

不过有些时候，Bean的获取可能会出现歧义，比如，分别注册两个子类的Bean：

````java
public class ArtStudent extends Student{
  	public void art(){
        System.out.println("我爱画画");
    }
}
````

````java
public class SportStudent extends Student{
		public void sport(){
        System.out.println("我爱运动");
    }
}
````

````xml
<!--注册bean，按照类型-->
<bean class="com.test.bean.ArtStudent"/>
<bean class="com.test.bean.SportStudent"/>
````

但是此时在获取Bean时却是索要的它们的父类：

````java
Student student = context.getBean(Student.class);
student.hello();
````

运行时得到如下报错：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/SSM/Spring02.png" alt="运行失败" style="margin: auto">

出现了一个Bean定义不唯一异常，因为需要的类型是Student，但是此时有三个Bean定义都满足这个类型，此时IoC容器不知道返回哪一个Bean，所以就只能抛出异常了。

如果需要一个Bean并且使用类型进行获取，那么必须要指明类型并且不能出现歧义：

````java
ArtStudent student = context.getBean(ArtStudent.class);
student.art();
````

那要是两个Bean的类型都是一样的呢？这种情况下，可以为Bean指定一个名称用于区分：

````xml
<!--给bean取名字，区分-->
<bean name="art" class="com.test.bean.ArtStudent"/>
<bean name="sport" class="com.test.bean.SportStudent"/>
````

name属性就是为这个Bean设定独一无二的名称（id属性也可以，跟name功能相同，但是会检查命名是否规范，否则会显示黄标），不同的Bean名字不能相同，否则报错。

IoC容器创建的Bean是只有一个还是每次索要的时候都会给我们一个新的对象？在主方法中连续获取两次Bean对象：

````java
Student student1 = context.getBean(Student.class);
Student student2 = context.getBean(Student.class);
//true，默认为单例模式，对象始终为同一个
System.out.println(student1 == student2);   
````

每次从IoC容器获取到的对象，始终都是同一个，默认情况下，通过IoC容器进行管理的Bean都是单例模式的，这个对象只会被创建一次。

如果希望每次拿到的对象都是一个新的，也可以将其作用域进行修改：

````xml
<!--一共有两种作用域，singleton，默认情况下就是这一种，还有prototype，表示为原型模式（多例模式也行）-->
<bean class="com.fkx.spring.bean.ArtStudent" scope="prototype"/>
````

实际上，当Bean的作用域为单例模式时，那么会在一开始（容器加载配置时）就被创建，之后拿到的都是这个对象。而处于原型模式下，只有在获取时才会被创建，也就是说，单例模式下，Bean会被IoC容器存储，只要容器没有被销毁，那么此对象将一直存在，而原型模式是在要用的时候直接new了一个对象，并不会被保存。

如果希望单例模式下的Bean不用一开始就加载，而是一样等到需要时再加载（加载后依然会被容器存储，之后一直使用这个对象了，不会再创建新的），也可以开启懒加载：

````xml
<!--懒加载，只有在真正第一次使用时才会创建对象-->
<bean class="com.fkx.spring.bean.SportStudent" lazy-init="true"/>
````

单例模式下Bean是由IoC容器加载，但是加载顺序并不清楚，如果需要维护Bean的加载顺序（比如某个Bean必须要在另一个Bean之前创建），可以使用
`depends-on`来设定前置加载Bean，这样被依赖的Bean一定会在之前加载，比如Teacher应该在Student之前加载：

````xml
<!--先加载teacher，再加载student-->
<bean name="teacher" class="com.test.bean.Teacher"/>
<bean name="student" class="com.test.bean.Student" depends-on="teacher"/>
````

### 1.3.依赖注入

````
````

````
````

````
````

````
````

````
````

````
````

````
````