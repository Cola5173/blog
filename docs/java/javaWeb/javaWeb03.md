# Java网络编程

:::details 学习资料：

- [JavaWeb 教程](https://www.bilibili.com/video/BV1CL4y1i7qR)

:::

## 1、Tomcat服务器

Tomcat（汤姆猫）是一个典型的Web应用服务器软件，通过运行Tomcat服务器，可以快速部署Web项目，并交由Tomcat进行管理，只需要直接通过浏览器访问我们的项目即可。

进行一个简单的环境搭建，需要在Tomcat官网下载最新的Tomcat服务端程序：[Apache Tomcat®](https://tomcat.apache.org)，下载速度可能有点慢

- 下载：64-bit Windows zip

下载完成后，解压，并放入桌面，接下来需要配置一下环境变量，打开高级系统设置，打开环境变量，添加一个新的系统变量，变量名称为
JRE_HOME ，填写JDK的安装目录+/jre

设置完成后，进入 tomcat 文件夹 bin 目录下，并在当前位置打开 CMD 窗口，将 startup.sh 拖入窗口按回车运行，如果环境变量配置有误，会提示，若没问题，服务器则正常启动。

如果出现乱码，说明编码格式配置有问题，我们修改一下服务器的配置文件，打开 conf 文件夹，找到 logging.properties 文件，将
ConsoleHandler 的默认编码格式修改为 GBK 编码格式：

````properties
java.util.logging.ConsoleHandler.encoding = GBK
````

重新启动服务器，也可以正常显示中文了。

整个Tomcat目录下：

- bin：所有可执行文件，包括启动和关闭服务器的脚本
- conf：服务器配置文件目录
- lib：Tomcat服务端运行的一些依赖
- logs：所有的日志信息
- temp：存放运行时产生的一些临时文件
- work：工作目录，Tomcat会将jsp文件转换为java文件
- webapp：所有的Web项目都在这里，每个文件夹都是一个Web应用程序

## 2、Servlet

通过实现 `Servlet` 来进行动态网页响应，不再是直接由 Tomcat 服务器发送编写好的静态网页内容（HTML文件），而是由通过 Java
代码进行动态拼接的结果，它能够很好地实现动态网页的返回。

### 2.1.创建Servlet

首先引入相关依赖：

````xml

<dependencies>
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>6.0.0</version>
    </dependency>
</dependencies>
````

只需要实现 Servlet 类即可，并添加注解 `@WebServlet` 来进行注册：

````java
@WebServlet("/test")
public class TestServlet implements Servlet {
		...实现接口方法
}
````

现在就可以去访问一下页面：http://localhost:8080/test/test

发现，直接访问此页面是没有任何内容的，这是因为还没有为该请求方法编写实现。

### 2.2.生命周期

一个Servlet是如何运行的，Servlet中的方法各自是在什么时候被调用的：

````java
@WebServlet("/test")
public class TestServlet implements Servlet {

    public TestServlet(){
        System.out.println("我是构造方法！");
    }

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("我是init");
    }

    @Override
    public ServletConfig getServletConfig() {
        System.out.println("我是getServletConfig");
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("我是service");
    }

    @Override
    public String getServletInfo() {
        System.out.println("我是getServletInfo");
        return null;
    }

    @Override
    public void destroy() {
        System.out.println("我是destroy");
    }
}
````

启动一次服务器，然后访问定义的页面，然后再关闭服务器，得到如下的顺序：

> 我是构造方法！
>
> 我是init
>
> 我是service
>
> 我是service（出现两次是因为浏览器请求了2次，有一次是请求favicon.ico，浏览器通病）
>
> 我是destroy

可以多次尝试去访问此页面，但是 `init` 和 `构造方法` 只会执行一次，而每次访问都会执行的是 `service` 方法，因此，一个Servlet的生命周期为：

- 执行构造方法完成 Servlet 初始化
- Servlet 初始化后调用 `init ()` 方法
- Servlet 调用 `service()` 方法来处理客户端的请求
- Servlet 销毁前调用 `destroy()` 方法
- Servlet 是由 JVM 的垃圾回收器进行垃圾回收

在 Web 应用程序运行时，每当浏览器向服务器发起一个请求时，都会创建一个线程执行一次 `service` 方法，来处理用户的请求，并将结果响应给用户。

在 service 方法中，有两个参数：

- `ServletRequest`，用户发起的 HTTP 请求，就被 Tomcat 服务器封装为了一个ServletRequest对象
- `ServletResponse`，返回给浏览器的HTTP响应报文实体类封装

HTTP请求报文中的所有内容，都可以从ServletRequest对象中获取：

````java
@Override
public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
    //将其转换为HttpServletRequest（继承自ServletRequest，一般是此接口实现）
    HttpServletRequest request = (HttpServletRequest) servletRequest;

    System.out.println(request.getProtocol());  //获取协议版本
    System.out.println(request.getRemoteAddr());  //获取访问者的IP地址
    System.out.println(request.getMethod());   //获取请求方法
    //获取头部信息
    Enumeration<String> enumeration = request.getHeaderNames();
    while (enumeration.hasMoreElements()) {
        String name = enumeration.nextElement();
        System.out.println(name + ": " + request.getHeader(name));
    }
}
````

`ServletResponse` 是服务端的响应内容，可以在这里填写想要发送给浏览器显示的内容：

````java
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        ....
        //转换为HttpServletResponse（同上）
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        //设定内容类型以及编码格式（普通HTML文本使用text/html，之后会讲解文件传输）
        response.setHeader("Content-type", "text/html;charset=UTF-8");
        //获取Writer直接写入内容
        response.getWriter().write("我是响应内容！");
        //所有内容写入完成之后，再发送给浏览器
    }
````

### 2.3.@WebServlet

关于注解 `@WebServlet`：

````java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface WebServlet {
    String name() default "";//Servlet名称

    String[] value() default {};//urlPatterns和value实际上是同样功能

    String[] urlPatterns() default {};//代表当前Servlet的访问路径，它不仅仅可以是一个固定值，还可以进行通配符匹配

    //是否在Tomcat启动时就加载此Servlet，默认情况下，Servlet只有在被访问时才会加载，它的默认值为-1，表示不在启动时加载
    int loadOnStartup() default -1;

    WebInitParam[] initParams() default {};

    boolean asyncSupported() default false;

    String smallIcon() default "";

    String largeIcon() default "";

    String description() default "";

    String displayName() default "";
}
````

## 3、Cookie

Cookie，它可以在浏览器中保存一些信息，并且在下次请求时，请求头中会携带这些信息。

````java
Cookie cookie = new Cookie("test", "yyds");
resp.addCookie(cookie);
resp.sendRedirect("time");

for (Cookie cookie : req.getCookies()) {
    System.out.println(cookie.getName() + ": " + cookie.getValue());
}
````

在 `HttpServletResponse` 中添加 `Cookie` 之后，浏览器的响应头中会包含一个 `Set-Cookie` 属性。

同时，在重定向之后，请求头中，会携带此 `Cookie` 作为一个属性。

一个 `Cookie` 包含的信息如下：

- `name` ：Cookie的名称，一旦创建，名称便不可更改
- `value` ：Cookie的值，如果值为Unicode字符，需要为字符编码。如果为二进制数据，则需要使用BASE64编码
- `maxAge` ：失效的时间，单位秒
    - 如果为正数，则该Cookie在maxAge秒后失效
    - 如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie
    - 如果为 0，表示删除该Cookie
    - 默认为 -1
- `secure` ：该Cookie是否仅被使用安全协议传输，安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false。
- `path` ： Cookie的使用路径。
    - 如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie
    - 如果设置为“/”，则本域名下contextPath都可以访问该Cookie
    - 注意最后一个字符必须为“/”
- `domain` ：可以访问该Cookie的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”。
- `comment` ：该Cookie的用处说明，浏览器显示Cookie信息的时候显示该说明
- `version` ：Cookie使用的版本号。0表示遵循Netscape的Cookie规范，1表示遵循W3C的RFC 2109规范

我们发现，最关键的其实是name、value、maxAge、domain属性。

## 4、Session

由于HTTP是无连接的，那么如何能够辨别当前的请求是来自哪个用户发起的呢？

Session就是用来处理这种问题的，每个用户的会话都会有一个自己的Session对象，来自同一个浏览器的所有请求，就属于同一个会话。

Session是基于Cookie实现的，可以将Cookie保存到浏览器，当浏览器下次访问时，就会附带这些Cookie信息。

Session 会给浏览器设定一个叫做 `JSESSIONID` 的 Cookie，值是一个随机的排列组合，只要浏览器携带此 Cookie 访问服务器，服务器就会通过
Cookie 的值进行辨别，得到对应的Session对象，这样就可以追踪到底是哪一个浏览器在访问服务器。

在用户登录成功之后，将用户对象添加到Session中，只要是此用户发起的请求，都可以从HttpSession中读取到存储在会话中的数据：

````java
HttpSession session = req.getSession();
session.setAttribute("user", user);
````

同时，如果用户没有登录就去访问首页，就发送一个重定向请求，告诉用户，需要先进行登录才可以访问：

````java
HttpSession session = req.getSession();
User user = (User) session.getAttribute("user");
if(user == null) {
    resp.sendRedirect("login");
    return;
}
````

在访问的过程中，注意观察Cookie变化。

Session并不是永远都存在的，它有着自己的过期时间，默认时间为30分钟，若超过此时间，Session将丢失，可以在配置文件中修改过期时间：

````xml

<session-config>
    <session-timeout>1</session-timeout>
</session-config>
````

也可以在代码中使用invalidate方法来使Session立即失效：

````java
session.invalidate();
````

通过Session，就可以更好地控制用户对于资源的访问，只有完成登陆的用户才有资格访问首页。

## 5、Filter

来自浏览器的所有访问请求都会首先经过过滤器，只有过滤器允许通过的请求，才可以顺利地到达对应的Servlet。

并且过滤器可以添加很多个，就相当于添加了很多堵墙，我请求只有穿过层层阻碍，才能到达Servlet。

<img src="https://oss.itbaima.cn/internal/markdown/2023/03/06/md9X75EToshnH8I.jpg" alt="filter">

添加一个过滤器非常简单，只需要实现 Filter 接口，并添加 `@WebFilter` 注解：

````java
//路径的匹配规则和Servlet一致，这里表示匹配所有请求
@WebFilter("/*")   
public class TestFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        
    }
}
````

让请求可以顺利地到达对应的 Servlet ：

````java
filterChain.doFilter(servletRequest, servletResponse);
````

由于们整个应用程序可能存在多个过滤器，这行代码的意思实际上是将此请求继续传递给下一个过滤器，当没有下一个过滤器时，才会到达对应的Servlet进行处理。

过滤器的过滤顺序是按照类名的自然排序进行的。

## 6、Listener

如果希望在应用程序加载的时候，或是 Session 创建的时候，亦或是在 Request 对象创建的时候进行一些操作，可以使用监听器来实现。

监听Session的创建：

````java
@WebListener
public class TestListener implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        System.out.println("有一个Session被创建了");
    }
}
````

有关监听器相关内容，了解即可。