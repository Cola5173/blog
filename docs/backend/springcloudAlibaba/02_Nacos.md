# Nacos

:::details 参考资料：

- []()

:::

## 1.Nacos

### 1.1.介绍

[Nacos](https://nacos.io/docs/v2/what-is-nacos/) （/nɑ:kəʊs/） 是 `Dynamic Naming and Configuration Service`
的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

Nacos 是构建以“服务”为中心的现代应用架构的服务基础设施，致力于`发现`、`配置`和`管理`微服务。

Nacos 作为**注册中心**组件，为协调者。所有的微服务应用在启动过程中会将自身包含服务名称、主机 IP
地址和端口号等信息发送到注册中心中，然后上游的微服务在处理请求过程中，根据服务名称到注册中心中查找对应服务的所有实例 IP
地址和端口号来进行服务调用，整个过程如图中虚线所示。从而让分散的微服务系统之间能像一个整体一样对外提供请求处理能力。

<img src="https://sca.aliyun.com/img/user/quickstart/nacos/service-discovery.png" alt="服务注册于发现" style="display: block; margin: 0 auto; zoom: 100%">

Nacos 作为**配置管理中心**组件，统一管理配置文件：

<img src="https://sca.aliyun.com/img/user/quickstart/nacos/spring-cloud-config.png" alt="服务注册于发现" style="display: block; margin: 0 auto; zoom: 100%">

### 1.2.功能

Nacos 的关键特性功能包括:

- `服务发现和服务健康监测`

  支持基于 DNS 和基于 RPC 的服务发现，服务提供者使用 原生SDK、OpenAPI、或一个独立的 Agent TODO 注册 Service

  提供对服务的实时的健康检查，阻止向不健康的主机或服务实例发送请求

- `动态配置服务`

  以中心化、外部化和动态化的方式管理所有环境的应用配置和服务配置

  消除了配置变更时重新部署应用和服务的需要，让配置管理变得更加高效和敏捷

  提供了一个简洁易用的UI管理所有的服务和应用的配置

  提供包括配置版本跟踪、金丝雀发布、一键回滚配置以及客户端配置更新状态跟踪在内的一系列开箱即用的配置管理特性

- `动态 DNS 服务`

  支持权重路由，让您更容易地实现中间层负载均衡、更灵活的路由策略、流量控制以及数据中心内网的简单DNS解析服务

## 2.安装和部署Nacos

Nacos 服务是独立安装部署的，[下载最新的Nacos服务端程序](https://nacos.io/download/nacos-server/)
，采用版本为: [2.2.3.zip](https://github.com/alibaba/nacos/releases/download/2.2.3/nacos-server-2.2.3.zip)

下载成功：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/backend/springcloudAlibaba/nacos/01.png" alt="下载压缩包" style="display: block; margin: 0 auto; zoom: 100%">

解压：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/backend/springcloudAlibaba/nacos/02.png" alt="解压后" style="display: block; margin: 0 auto; zoom: 100%">

配置数据库，解压缩之后，在 `conf` 目录中会发现存在一个 `mysql-schema.sql` 文件，在本地的 MYSQL 中创建数据库 nacos
，导入解压文件夹中的nacos-mysql.sql脚本，结果：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/backend/springcloudAlibaba/nacos/03.png" alt="运行sql文件" style="display: block; margin: 0 auto; zoom: 100%">

修改 `conf` 路径下的配置文件 `application.properties` 中的数据库信息：

````properties
### Count of DB:
db.num=1

### Connect URL of DB:
db.url=jdbc:mysql://localhost:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=123456
````

进入 `bin` 目录下，启动命令：

````cmd
startup.cmd -m standalone
````

启动后：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/backend/springcloudAlibaba/nacos/04.png" alt="运行sql文件" style="display: block; margin: 0 auto; zoom: 100%">

访问地址为：http://10.40.160.231:8848/nacos/index.html ，无需用户名和密码，即可使用。

至此，Nacos的安装与部署完成。

## 3.服务注册与发现

