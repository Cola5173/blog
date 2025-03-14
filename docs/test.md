# test

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/middleware/docker/01.png" alt="基本概念" style="margin: auto;zoom: normal">

````
````

| 命令           | 含义                         | 示例                          |
|--------------|----------------------------|-----------------------------|
| `FROM`       | 指定基础镜像                     | FROM centos:6               |
| `ENV`        | 设置环境变量，可在后面指令使用            | ENV key value               |
| `COPY`       | 拷贝本地文件到镜像的指定目录             | COPY ./xx.jar /tmp/app.jar  |
| `RUN`        | 执行Linux的shell命令，一般是安装过程的命令 | RUN yum install gcc         |
| `EXPOSE`     | 指定容器运行时监听的端口，是给镜像使用者看的     | EXPOSE 8080                 |
| `ENTRYPOINT` | 镜像中应用的启动命令，容器运行时调用         | ENTRYPOINT java -jar xx.jar |