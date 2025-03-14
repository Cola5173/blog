# Docker

:::details 参考资料：

- [黑马程序员Docker快速入门到项目部署](https://www.bilibili.com/video/BV1HP4118797)
- [Docker 笔记](https://b11et3un53m.feishu.cn/wiki/MWQIw4Zvhil0I5ktPHwcoqZdnec)

:::

## Dockerfile

如果需要部署自己的 Java 项目，把它打包为一个镜像该怎么做呢？

---

### 1、镜像结构

---

要想构建自己的镜像，必须先了解镜像的结构。

镜像之所以能让快速跨操作系统部署应用而忽略其运行环境、配置，就是因为镜像中包含了程序运行需要的系统函数库、环境、配置、依赖。

因此，自定义镜像本质就是依次准备好程序运行的基础环境、依赖、应用本身、运行配置等文件，并且打包而成。

那因此，打包镜像也是分成这么几步：

- 准备Linux运行环境（java项目并不需要完整的操作系统，仅仅是基础运行环境即可）
- 安装并配置JDK
- 拷贝jar包
- 配置启动脚本

上述步骤中的每一次操作其实都是在生产一些文件，镜像就是一堆文件的集合。但是，镜像文件不是随意堆放的，而是按照操作的步骤分层叠加而成。

每一层形成的文件都会单独打包并标记一个唯一id，称为 `Layer`（层）。这样，如果构建时用到的某些层其他人已经制作过，就可以直接拷贝使用这些层，而不用重复制作。例如，第一步中需要的Linux运行环境。逐层搭建，最终整个Java项目的镜像结构如图所示：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/docker/04.png" alt="image-layers" style="margin: auto;zoom: normal">

---

### 2、Dockerfile

---

[Dockerfile](https://docs.docker.com/reference/dockerfile/) 是用于构建 Docker 镜像的脚本文件，其中的语法比较多，比较常用的有：

| 命令           | 含义                         | 示例                          |
|--------------|----------------------------|-----------------------------|
| `FROM`       | 指定基础镜像                     | FROM centos:6               |
| `ENV`        | 设置环境变量，可在后面指令使用            | ENV key value               |
| `COPY`       | 拷贝本地文件到镜像的指定目录             | COPY ./xx.jar /tmp/app.jar  |
| `RUN`        | 执行Linux的shell命令，一般是安装过程的命令 | RUN yum install gcc         |
| `EXPOSE`     | 指定容器运行时监听的端口，是给镜像使用者看的     | EXPOSE 8080                 |
| `ENTRYPOINT` | 镜像中应用的启动命令，容器运行时调用         | ENTRYPOINT java -jar xx.jar |

例如，要基于Ubuntu镜像来构建一个Java应用，其Dockerfile内容如下：

````dockerfile
# 指定基础镜像
FROM ubuntu:16.04

# 配置环境变量，JDK的安装目录、容器内时区
ENV JAVA_DIR=/usr/local
ENV TZ=Asia/Shanghai

# 拷贝jdk和java项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar

# 设定时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 安装JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8 \
    
# 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin

# 指定项目监听的端口
EXPOSE 8080

# 入口，java项目的启动命令
ENTRYPOINT ["java", "-jar", "/app.jar"]
````

如果每次制作 java 镜像都需要 Linux 系统环境、JDK 环境，这两层去重复制作前两层镜像，是很麻烦的。所以，就有人提供了基础的系统加JDK环境，我们在此基础上制作java镜像，就可以省去JDK的配置了：

````dockerfile
# 基础镜像
FROM openjdk:11.0-jre-buster

# 设定时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 拷贝jar包
COPY docker-demo.jar /app.jar

# 入口
ENTRYPOINT ["java", "-jar", "/app.jar"]
````

---

### 3、构建镜像

---

当 Dockerfile 文件写好以后，就可以执行命令，构建镜像：

````bash
# 进入镜像 Dockerfile 的目录
cd /root/demo

# 开始构建
docker build -t docker-demo:1.0 .
````

> 命令说明：
> - `docker build` : 就是构建一个docker镜像
> - `-t docker-demo:1.0` ：-t参数是指定镜像的名称（repository和tag）
> - `.` : 最后的点是指构建时Dockerfile所在路径，由于我们进入了demo目录，所以指定的是.代表当前目录，也可以直接指定Dockerfile目录：
> ````shell
> # 直接指定Dockerfile目录
> docker build -t docker-demo:1.0 /root/demo
> ````
