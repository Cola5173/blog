# Docker

:::details 参考资料：

- [黑马程序员Docker快速入门到项目部署](https://www.bilibili.com/video/BV1HP4118797)
- [Docker 笔记](https://b11et3un53m.feishu.cn/wiki/MWQIw4Zvhil0I5ktPHwcoqZdnec)

:::

## 示例和命令

----

### 1、示例

---

#### 1.1.安装MySQL
利用 Docker 来安装 MySQL 软件（但开发中，docker 只部署服务应用，数据库不会采用 docker 安装），如果是利用传统方式部署MySQL，大概的步骤有：

- 搜索并下载MySQL安装包
- 上传至Linux环境
- 编译和配置环境
- 安装

而使用 Docker安装，仅仅需要一步即可，在命令行输入下面的命令：

````shell
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql
````

运行效果如图：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/docker/02.png" alt="docker 安装 MySQL 结果" style="margin: auto;zoom: normal">

MySQL 安装完毕！通过任意客户端工具即可连接到MySQL.

#### 1.2.命令解读

````shell
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql
````

> 解读：
> - `docker run -d` ：创建并运行一个容器，`-d` 是让容器以后台进程运行
> - `--name mysql`  : 给容器起个名字叫mysql，也可以叫别的
> - `-p 3306:3306` : 设置端口映射，
>   - 格式： `-p 宿主机端口:容器内端口`，示例中就是将宿主机的 3306 映射到容器内的 3306 端口
>   - 容器是隔离环境，外界不可访问，但是可以将宿主机端口映射容器内到端口，当访问宿主机指定端口时，就是在访问容器内的端口了
>   - 容器内端口往往是由容器内的进程决定，例如MySQL进程默认端口是3306，因此容器内端口一定是3306；而宿主机端口则可以任意指定，一般与容器内保持一致
> - `-e TZ=Asia/Shanghai` : 配置容器内进程运行时的一些参数
>   - 格式：-e KEY=VALUE，KEY和VALUE都由容器内进程决定
>   - 案例中，TZ=Asia/Shanghai是设置时区；MYSQL_ROOT_PASSWORD=123是设置MySQL默认密码
> - `mysql` : 设置镜像名称，Docker会根据这个名字搜索并下载镜像
>   - 格式：REPOSITORY:TAG，例如mysql:8.0，其中REPOSITORY可以理解为镜像名，TAG是版本号
>   - 在未指定TAG的情况下，默认是最新版本，也就是mysql:latest

::: danger 注意：
**镜像的名称不是随意的**，而是要到 DockerRegistry 中寻找，镜像运行时的配置也不是随意的，要参考镜像的帮助文档，这些在 DockerHub 网站或者软件的官方网站中都能找到。
:::

---

### 2、命令

---

#### 2.1.常见的命令

比较常见的命令有：

| 命令               | 含义              | 官方介绍地址                                                                            |
|------------------|-----------------|-----------------------------------------------------------------------------------|
| `docker pull`    | 拉取镜像            | [docker pull](https://docs.docker.com/reference/cli/docker/image/pull/)           |
| `docker push`    | 推送镜像            | [docker push](https://docs.docker.com/reference/cli/docker/image/push/)           |
| `docker images`  | 查看本地镜像          | [docker images](https://docs.docker.com/reference/cli/docker/image/ls/)           |
| `docker rmi`     | 删除本地镜像          | [docker rmi](https://docs.docker.com/reference/cli/docker/image/rm/)              |
| `docker run`     | 创建并运行容器（不能重复创建） | [docker run](https://docs.docker.com/reference/cli/docker/container/run/)         |
| `docker stop`    | 停止指定容器          | [docker stop](https://docs.docker.com/reference/cli/docker/container/stop/)       |
| `docker start`   | 启动指定容器          | [docker start](https://docs.docker.com/reference/cli/docker/container/start/)     |
| `docker restart` | 重新启动指定容器        | [docker restart](https://docs.docker.com/reference/cli/docker/container/restart/) |
| `docker rm`      | 删除指定容器          | [docker rm](https://docs.docker.com/reference/cli/docker/container/rm/)           |
| `docker ps`      | 查看容器            | [docker ps](https://docs.docker.com/reference/cli/docker/container/ls/)           |
| `docker logs`    | 查看容器运行日志        | [docker logs](https://docs.docker.com/reference/cli/docker/container/logs/)       |
| `docker exec`    | 进入容器            | [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)       |
| `docker save`    | 保存镜像到本地压缩文件     | [docker save](https://docs.docker.com/reference/cli/docker/image/save/)           |
| `docker load`    | 加载本地压缩文件到镜像     | [docker load](https://docs.docker.com/reference/cli/docker/image/load/)           |
| `docker inspect` | 查看容器详细信息        | [docker inspect](https://docs.docker.com/reference/cli/docker/inspect/)           |

用一副图来表示这些命令的关系：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/docker/03.png" alt="docker 命令" style="margin: auto;zoom: normal">

默认情况下，每次重启虚拟机都需要手动启动 Docker 和 Docker 中的容器。通过命令可以实现开机自启（但是在公司，申请了服务器就是一直运行的，直到组内不需要这台服务器了）：

````shell
# Docker开机自启
systemctl enable docker

# Docker容器开机自启
docker update --restart=always [容器名/容器id]
````

#### 2.2.数据卷命令

数据卷的相关命令有：

| 命令                      | 含义       | 官方介绍地址                                                                                |
|-------------------------|----------|---------------------------------------------------------------------------------------|
| `docker volume create`  | 创建数据卷    | [docker volume create](https://docs.docker.com/reference/cli/docker/volume/create/)   |
| `docker volume ls`      | 查看所有数据卷  | [docker volume ls](https://docs.docker.com/reference/cli/docker/volume/ls/)           |
| `docker volume rm`      | 删除指定的数据卷 | [docker volume rm](https://docs.docker.com/reference/cli/docker/volume/rm/)           |
| `docker volume inspect` | 查看指定的数据卷 | [docker volume inspect](https://docs.docker.com/reference/cli/docker/volume/inspect/) |
| `docker volume prune`   | 清除数据卷    | [docker volume inspect](https://docs.docker.com/reference/cli/docker/volume/prune/)   |

::: danger 注意：
容器与数据卷的挂载要在创建容器时配置，对于创建好的容器，是不能设置数据卷的。而且创建容器的过程中，数据卷会自动创建。

其实很少使用这个命令，一般都是在创建运行容器的时候，就同时设置好了数据卷。
:::

直接将容器目录与宿主机指定目录挂载：

````shell
# 挂载本地目录
-v 本地目录:容器内目录

# 挂载本地文件
-v 本地文件:容器内文件
````

::: danger 注意：
本地目录或文件必须以 `/` 或 `./` 开头，如果直接以名字开头，会被识别为数据卷名而非本地目录名。
:::

教学演示，删除并重新创建mysql容器，并完成本地目录挂载：

- 挂载 /root/mysql/data 到容器内的 /var/lib/mysql目录
- 挂载 /root/mysql/init 到容器内的 /docker-entrypoint-initdb.d目录（初始化的SQL脚本目录）
- 挂载 /root/mysql/conf 到容器内的 /etc/mysql/conf.d目录（这个是MySQL配置文件目录）

````bash
# 1.删除原来的MySQL容器
docker rm -f mysql

# 2.进入root目录
cd ~

# 3.创建并运行新mysql容器，挂载本地目录
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  -v ./mysql/data:/var/lib/mysql \
  -v ./mysql/conf:/etc/mysql/conf.d \
  -v ./mysql/init:/docker-entrypoint-initdb.d \
  mysql
````
