# Java网络编程

:::details 学习资料：

- [JavaWeb 教程](https://www.bilibili.com/video/BV1CL4y1i7qR)

:::

## 1、Tomcat服务器

Tomcat（汤姆猫）是一个典型的Web应用服务器软件，通过运行Tomcat服务器，可以快速部署Web项目，并交由Tomcat进行管理，只需要直接通过浏览器访问我们的项目即可。

进行一个简单的环境搭建，需要在Tomcat官网下载最新的Tomcat服务端程序：[Apache Tomcat®](https://tomcat.apache.org)，下载速度可能有点慢

- 下载：64-bit Windows zip

下载完成后，解压，并放入桌面，接下来需要配置一下环境变量，打开高级系统设置，打开环境变量，添加一个新的系统变量，变量名称为 JRE_HOME ，填写JDK的安装目录+/jre

设置完成后，进入tomcat文件夹bin目录下，并在当前位置打开CMD窗口，将startup.sh拖入窗口按回车运行，如果环境变量配置有误，会提示，若没问题，服务器则正常启动。