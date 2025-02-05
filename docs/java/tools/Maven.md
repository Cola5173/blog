# Maven

:::details 参考资料：

- [Maven教程](https://www.bilibili.com/video/BV1JN411G7gX)

:::

Maven 的本质是一个项目管理工具，是 Java 语言编写的，将项目开发和管理过程抽象成一个项目对象模型（POM）。

## 1、简介

只有蓝色区域的才是 maven ：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven01.png" alt="maven结构" style="margin: auto">

Maven 提供标准、统一的项目结构，标准化、跨平台的自动化项目构建方式，更加方便快捷的管理项目依赖的资源包，避免依赖版本冲突问题。

### 1.1.仓库

**仓库**是用于存储各种资源，包含各种 jar 包。又分为本地仓库和远程仓库：

- 本地仓库：自己电脑上存储资源的仓库，连接远程仓库获取资源
- 远程仓库：非本机电脑上的仓库，为本地仓库提供资源
    - 中央仓库：MAVEN 团队维护，存储所有资源的仓库
    - 私服：部门/公司范围内存储资源的仓库，保存具有版权的资源，一定范围内共享，对内共享，不对外开放

### 1.2.坐标

**坐标**是用于定位仓库中的资源，是唯一的资源标识。主要由三个组成：

- groupId：定义当前资源的隶属组织名（通常是域名反写，例如：org.mybatis）
- artifactId：定义当前资源的项目名称（通常是模块名称，例如CRM、SMS）
- version：定义当前资源的版本号

### 1.3.pom和标准目录结构

Maven 的项目都有一个 `pom.xml` 文件，是这个 Maven 工程的核心配置文件。

Maven 项目的标准目录结构均为：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven06.png" alt="maven项目目录结构" style="margin: auto;zoom: 100%">

- src：源码目录
    - main：主体程序
        - java：Java部分代码
        - resources：配置文件
    - test：测试程序目录
        - java：Java部分代码
        - resources：配置文件
- target：存放构建操作输出结果

## 2、安装和配置

Maven [官网地址](https://maven.apache.org/) 中找到 [download](https://maven.apache.org/download.cgi) 下载即可。

下载后解压，放入相关的目录下，就为安装成功：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven02.png" alt="maven解压" style="margin: auto">

需要配置 Maven 的环境变量：

- 依赖 Java ，需要配置 JAVA_HOME
- 设置 MAVEN 自身测运行环境，需要配置 MAVEN_HOME

  <img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven03.png" alt="maven环境变量配置" style="margin: auto">

测试环境配置结果：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven04.png" alt="测试mvn运行" style="margin: auto">

在 maven 的 conf 中的 `settings.xml` ，需要配置三个内容：

- Maven 启动后，会自动保存下载的资源到本地仓库，需要配置本地仓库路径：

  ````xml
  <!--自定义的位置-->
  <localRepository>D:\developer_tools\apache-maven-3.6.3\mvn_resp</localRepository>
  ````

- 镜像仓库，便于加速下载对应资源：

  ````xml
  <!--阿里云镜像仓库-->
     <mirror>  
	    <id>alimaven</id>  
	    <name>aliyun maven</name>  
	    <url>https://maven.aliyun.com/repository/public</url>
	    <mirrorOf>central</mirrorOf>          
	</mirror>
  ````

- jdk版本

  ````xml
  <profiles>
      <profile>
          <id>jdk-1.8</id>
  
          <activation>
              <activeByDefault>true</activeByDefault>
              <jdk>1.8</jdk>
          </activation>
  
          <properties>
              <maven.compiler.source>1.8</maven.compiler.source>
              <maven.compiler.target>1.8</maven.compiler.target>
              <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
          </properties>
      </profile>
  </profiles>
  ````

上述的的配置都是全局 setting ，还可以针对不同的用户配置自己的 setting 。

## 3、依赖管理

依赖指的是当前项目运行所需的 jar 包，一个项目可以设置多个依赖：

````xml
<!--dependencies中的依赖可以有多个-->
<dependencies>
    <!--具体的依赖 spring core-->
    <dependency>
        <groupId>org.springframework</groupId><!--群组id-->
        <artifactId>spring-context</artifactId><!--依赖所属项目id-->
        <version>6.0.10</version><!--依赖版本号-->
    </dependency>
    <!--aop-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aspects</artifactId>
        <version>6.0.10</version>
    </dependency>
</dependencies>
````

### 3.1.依赖传递

依赖具有传递性，指的是一个项目依赖的库（A）所依赖的其他库（B），这些库（B）也会被自动引入到项目中。

Maven 不仅会下载直接声明的依赖，还会下载这些依赖所需要的其他依赖，从而形成一个依赖树。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven07.png" alt="依赖传递" style="margin: auto;zoom: 50%">

### 3.2.依赖冲突

依赖冲突问题是指在使用 Maven 管理项目依赖时，多个依赖可能会引入不同版本的相同库，这样会导致版本冲突，甚至可能导致项目在运行时出现不可预期的错误。

Maven 在遇到依赖冲突时，会采用 最近优先原则（Nearest Wins），即它会选择离当前项目最近的那个版本作为最终的版本来使用。

假设有以下依赖结构：

````xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>A</artifactId>
    <version>1.0.0</version>
</dependency>

<dependency>
    <groupId>com.example</groupId>
    <artifactId>B</artifactId>
    <version>1.0.0</version>
</dependency>
````
- A 依赖 C:1.0.0
- B 依赖 C:2.0.0

Maven 会选择距离当前项目最近的版本来使用，由于 A 和 B 是直接依赖，那么会选择 C:2.0.0，因为 B 是在项目的最上层直接声明的。

### 3.3.解决依赖冲突

解决依赖冲突，有以下几种方法：

- 排除依赖

可以使用 `<exclusions>` 排除特定的依赖，不让某个库引入某个版本的依赖：

````xml
<!--不让A中的C依赖被引入-->
<dependency>
    <groupId>com.example</groupId>
    <artifactId>A</artifactId>
    <version>1.0.0</version>
    <exclusions>
        <exclusion>
            <groupId>com.example</groupId>
            <artifactId>C</artifactId>
        </exclusion>
    </exclusions>
</dependency>
````

- 强制指定版本

可以使用 `<dependencyManagement>` 来强制指定某个库的版本，确保整个项目中使用的是一致的版本：

````xml
<!--强制指定本项目中的C的版本-->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>C</artifactId>
            <version>2.0.0</version>
        </dependency>
    </dependencies>
</dependencyManagement>
````

- 可选依赖

可以通过 `<optional>true</optional>` 标签使得此依赖不会自动传递给其他的依赖，也不会出现在依赖树中。

不需要修改本项目的 pom.xml 文件，只需在 A 的 pom.xml 文件中，确保 C 被标记为可选依赖。这样，C:1.0.0 就不会作为传递依赖传递到本项目中：

````xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>C</artifactId>
    <version>1.0.0</version>
    <!-- 标记为可选依赖 -->
    <optional>true</optional> 
</dependency>
````

### 3.4.依赖范围

依赖范围（Dependency Scope） 是 Maven 中用来控制依赖的生命周期和可用范围，它决定了一个依赖在构建过程中何时可用，以及是否包含在最终的构建产物中。

常见的依赖范围：

| **依赖范围**            | **描述**                             | **适用场景**                                  | **生命周期**                                                | **是否包含在最终打包中** |
|---------------------|------------------------------------|-------------------------------------------|---------------------------------------------------------|----------------|
| `compile`<br/> (默认) | 编译时、测试时、运行时都有效，最常用的范围              | 编译、测试和运行时都需要的依赖                           | `compile`、`test`、`runtime`、`package`、`install`、`deploy` | Y              |
| `provided`          | 由容器提供的依赖，在运行时不需要打包                 | 用于编写 Web 应用或其他容器应用，容器提供相关库（如 Servlet API） | `compile`、`test`                                        | N              |
| `runtime`           | 仅在运行时需要，编译时不需要                     | 运行时需要的依赖（如 JDBC 驱动）                       | `runtime`、`test`、`package`、`install`、`deploy`           | Y              |
| `test`              | 仅在测试时需要                            | 测试代码中的依赖（如 JUnit、Mockito）                 | `test`                                                  | N              |
| `system`            | 手动指定路径的依赖，通常不从 Maven 仓库下载          | 系统级别的库（如本地库）                              | `compile`、`test`、`runtime`、`package`                    | Y              |
| `import`            | 用于引入外部 BOM（Bill of Materials），管理版本 | 版本管理和依赖管理                                 | 仅在 `dependencyManagement` 中有效                           | N              |

- **适用场景**：描述了该依赖范围的典型使用情况
- **生命周期**：列出了该依赖在 Maven 构建生命周期中有效的阶段
- **是否包含在最终打包中**：指明该依赖是否会包含在最终的构建产物（例如 JAR 或 WAR 文件）中

通过合理使用依赖范围，可以精确控制不同依赖的生命周期和作用范围，从而避免不必要的依赖被包含在最终构建中，减小构建的体积，同时提高构建效率。

## 4、生命周期和插件

### 4.1.生命周期

Maven 的生命周期（Lifecycle）是指在构建项目过程中，执行的所有阶段（Phase）的集合。这些阶段按照一定的顺序执行，每个阶段负责完成项目构建的特定任务，如编译、测试、打包、部署等。

Maven 的生命周期分为三个主要的生命周期：

- clean：清理生命周期，负责清理项目构建过程中生成的临时文件和构建产物

| 阶段         | 	描述                      |
|------------|--------------------------|
| pre-clean	 | 在清理之前执行，用于执行任何前期工作       |
| clean      | 	删除生成的目标文件（如 target 文件夹） |
| post-clean | 	在清理后执行，用于进行任何后续操作       |

- default：默认生命周期，是 Maven 的核心生命周期，负责从源代码编译到项目打包和安装的整个过程

| **阶段**     | **描述**                                 |
|------------|----------------------------------------|
| `validate` | 验证项目的结构是否合法，检查项目是否满足所有的基本条件（如必要的文件、配置） |
| `compile`  | 编译源代码                                  |
| `test`     | 运行测试用例                                 |
| `package`  | 将编译后的代码打包成一个 JAR、WAR 或其他格式的文件          |
| `verify`   | 运行所有的验证步骤，检查代码是否符合质量标准                 |
| `install`  | 将构建产物安装到本地仓库，以供其他项目使用                  |
| `deploy`   | 将构建产物部署到远程仓库（通常是共享的 Maven 仓库）          |

- site：站点生命周期，用于生成项目的文档和站点

| **阶段**        | **描述**                       |
|---------------|------------------------------|
| `pre-site`    | 在生成站点之前执行                    |
| `site`        | 生成项目的文档和报告（如 Javadoc、代码覆盖率等） |
| `post-site`   | 在站点生成之后执行                    |
| `site-deploy` | 将生成的站点部署到指定位置，通常是远程 Web 服务器  |

Maven 的生命周期是按照一定的顺序执行的。比如，默认生命周期的执行顺序如下：

```
validate -> compile -> test -> package -> verify -> install -> deploy
```

在执行一个目标时，Maven 会按照生命周期的阶段顺序依次执行相关阶段。

例如，当你运行 `mvn clean install` 时，Maven 会先执行 `clean` 生命周期中的所有阶段，然后再执行 `default` 生命周期中的阶段，直到执行到 `install`。

### 4.2.插件

Maven 的插件（Plugin）是执行构建任务的关键组件，提供了各种各样的构建、测试、部署、文档生成等任务的执行能力。每个阶段会绑定一些常见的插件目标，插件是 Maven 自动化构建过程的核心。

Maven 插件通常由以下几个部分组成：

- 插件的组标识符（Group ID）和版本（Version）：插件的坐标类似于依赖项，可以在 pom.xml 文件中声明
- 插件目标（Goal）：每个插件包含多个目标，每个目标执行不同的任务
- 插件配置（Configuration）：插件可以有配置项，允许用户自定义插件行为

## 5、IDEA

在日常开发中，是通过 IDEA 使用 Maven ，仍需配置：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven05.png" alt="测试mvn运行" style="margin: auto">

### 5.1.聚合

Maven 聚合（Aggregation）是指通过在父项目的 pom.xml 中引用多个子模块，使得这些子模块可以作为一个整体进行构建和管理。

聚合并不意味着直接将子模块的代码合并到父模块中，而是通过一个父项目来管理多个模块的构建过程，主要用于将多个相关的模块（子项目）组织在一起，并在父项目中统一构建。

聚合通过 modules 元素来实现，modules 中列出了所有的子模块。父项目的 pom.xml 文件通常会包含以下内容：

````xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!-- 说明这是一个聚合项目 -->
    <packaging>pom</packaging> 

    <!--<modules> 标签列出了所有的子模块 module-a 和 module-b -->
    <modules>
        <module>module-a</module>
        <module>module-b</module>
    </modules>
</project>
````

一旦设置好了聚合结构，就可以在父项目的目录中执行 Maven 命令，自动构建所有子模块。

聚合的常见用途：

- 管理多个模块的构建：在大型项目中，通常会有多个相互独立的模块（例如，核心模块、API模块、Web模块等），可以在父项目中统一管理这些模块的构建和依赖
- 版本管理：子模块的版本可以从父项目继承，因此可以确保所有模块使用相同的版本
- 构建生命周期统一：通过父项目管理所有子模块的构建生命周期（例如，编译、测试、打包等），简化了构建过程

### 5.2.继承

在 Maven 中，继承是指子项目通过 pom.xml 文件继承父项目的配置、依赖和插件等，避免了在每个子项目中重复配置相同的内容。

Maven 通过在子项目的 pom.xml 中使用 `<parent>` 标签来实现继承关系，子模块 module-a 的 pom.xml ：


````xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent-project</artifactId>
        <version>1.0-SNAPSHOT</version>
        <!-- 继承父项目 -->
        <relativePath>../pom.xml</relativePath> 
    </parent>

    <artifactId>module-a</artifactId>
</project>
````

在这个例子中，module-a 作为子项目，通过 `<parent>` 标签继承了父项目的配置（如依赖、插件），而不需要在自己的 pom.xml 文件中重复定义。

### 5.3.属性

在 Maven 中，属性（Properties）是一种用来存储和管理项目配置信息的机制。在 pom.xml 中定义一些可复用的值，后续可以在不同的地方引用这些属性，避免在多个地方硬编码相同的值，增加项目的灵活性和可维护性。

在 pom.xml 中通常定义在 `<properties>` 元素中，定义好属性后，可以在 pom.xml 中的任意地方通过 ${propertyName} 的形式引用该属性：

````xml
<properties>
    <!-- 定义属性 -->
    <java.version>1.8</java.version> 
</properties>
````

在其他地方引用这个属性时，可以使用 ${java.version}：

````xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <!-- 使用属性 -->
                <source>${java.version}</source> 
                <target>${java.version}</target> 
            </configuration>
        </plugin>
    </plugins>
</build>
````

Maven 也支持从外部（如操作系统的环境变量）传递属性。在运行 Maven 命令时，可以通过 -D 参数定义属性值。例如：

````bash
mvn clean install -Djava.version=1.8
````

### 5.4.常用的按键

在开发过程中，都是在 IDEA 使用 Maven ，需要知道的一些常见按钮为：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/maven08.png" alt="idea的maven" style="margin: auto">

- 跳过测试
- 查看依赖关系树
- 执行构建

## 6、命令

在日常开发中，需要在终端控制台使用的一些命令：

````shell
# 会删除 target 目录中所有的编译产物、依赖文件等，通常在开始新的构建前使用
mvn clean

# 将项目打包为 JAR、WAR 或其他指定格式的构件，并输出到 target 目录
mvn package

# 将打包好的项目安装到本地仓库中
mvn install

# 清理项目并重新构建，常用于从头开始构建一个干净的项目
mvn clean install

# 查看项目的依赖树
mvn dependency:tree

# 跳过测试代码的编译和测试的执行
mvn clean install -Dmaven.test.skip=true

# 跳过测试的执行，不会跳过编译测试代码的过程
mvn clean install -DskipTests
````
