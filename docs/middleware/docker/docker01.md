# Docker

:::details 参考资料：

- [黑马程序员Docker快速入门到项目部署](https://www.bilibili.com/video/BV1HP4118797)
- [Docker 笔记](https://b11et3un53m.feishu.cn/wiki/MWQIw4Zvhil0I5ktPHwcoqZdnec)

:::

## 安装和概念

### 1、安装

参考安装 [Docker-Centos 官方文档](https://docs.docker.com/engine/install/centos/) ，步骤如下所示。

- 卸载旧版

首先如果系统中已经存在旧的Docker，则先卸载：

````shell
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine \
    docker-selinux 
````

- 配置 Docker 的 yum 库

````shell
# 首先要安装一个yum工具
yum install -y yum-utils

# 配置Docker的yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sed -i 's+https://download.docker.com+https://mirrors.tuna.tsinghua.edu.cn/docker-ce+' /etc/yum.repos.d/docker-ce.repo
````

- 最后安装

````shell
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
````

- 启动和校验

````shell
# 启动Docker
systemctl start docker

# 停止Docker
systemctl stop docker

# 重启
systemctl restart docker

# 设置开机自启
systemctl enable docker

# 执行docker ps命令，如果不报错，说明安装启动成功
docker ps

# 查看 docker 版本
docker -v

# 查看 docker compose 版本
docker compose version
````

### 2、概念

[Docker](https://www.docker.com/) 是一个开源的容器化平台，允许开发者将应用程序及其依赖项打包成标准化的单元（即容器），然后可以在任何支持 Docker 的环境中运行这些容器。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/docker/01.png" alt="基本概念" style="margin: auto;zoom: normal">

#### 2.1.容器

`Container`（容器）： 是一个轻量级的、可移植的运行时环境，它包含了应用程序及其所有依赖，包括代码、库、环境变量等。

容器是通过隔离的方式与主机操作系统共享内核资源，具有快速启动、轻量、便于移植等优点。

#### 2.2.镜像

`Image`（镜像）：是一个只读的模板，包含了操作系统、应用程序、依赖库、配置文件、运行环境等，用来创建 Docker 容器。

#### 2.3.Dockerfile

`Dockerfile` 是用于构建 Docker 镜像的脚本文件，它包含了一系列指令，定义了如何从一个基础镜像（如 ubuntu、alpine、openjdk 等）构建出自己的自定义镜像。

#### 2.4.Docker Compose

`Docker Compose` 是一个用于定义和运行多容器 Docker 应用的工具。

它使用 YAML 文件 来描述应用的服务、网络和存储等配置信息，然后通过一个命令 (docker-compose up) 启动所有容器，实现多容器的编排管理。

#### 2.5.数据卷

`Volume`（数据卷）是 Docker 提供的一种用于持久化数据的机制，它允许容器中的数据存储在宿主机上，以便容器重启、删除或升级后，数据仍然保留。

在 Docker 中，默认情况下，容器中的数据是临时的，如果容器被删除，数据也会丢失。但使用 Docker Volume，数据可以独立于容器存在，从而实现数据的持久化存储。