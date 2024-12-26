# golang环境安装

:::details 参考资料：

- [8小时转职Golang工程师](https://www.bilibili.com/video/BV1gf4y1r79E)
- [8小时转职Golang工程师，语雀文档](https://www.yuque.com/aceld/mo95lb)

:::

## 下载Go环境

进入：[Go官网downloads](https://golang.google.cn/dl/)
，下载版本为：[go1.23.4.windows-amd64.zip](https://golang.google.cn/dl/go1.23.4.windows-amd64.zip)

下载结束后，解压并放入自定义的目录：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/golang/golangse/golangse01_01.png" alt="解压">

## 配置环境变量

需要新建两个环境变量配置：

- `GOROOT` ，Go 环境所在目录的配置
- `GOPATH` ，Go 项目的工作目录，以后开发的代码就写在这个文件夹中

为了使所有的计算机用户都可以使用 Go 环境，就在系统变量之中配置。点击系统变量下的新建，在变量名一栏输入 GOROOT ，在变量值一栏输入 你解压文件所在的目录D:\路径\go。
最后点击确定，就将 GOROOT 新建完毕。

GOPATH 和 GOROOT 的配置略有不同，建议配置两个 GOPATH 目录，第一个用于放 Go 语言的第三方包，第二个用于放自己的开发代码。

然后将新建的 GOROOT 配置到 Path 这个环境变量中去，在系统变量中找到 Path，点击编辑->新建，输入 `%GOROOT%\bin` ，点击确定。并将所有母窗口的确定全部点下，确保环境变量生效。

## 校验

windows+R 输入 cmd 打开终端，输入go version，如果输出如下图所示，则安装成功。

````cmd
#查看Go版本
go version

#查看Go环境变量
go env
````

## 配置 GO111MODULE、GOPROXY、GOSUMDB

Go默认的GOPROXY的值是：GOPROXY=https://proxy.golang.org,direct。这个 goproxy 在使用 go get 安装第三方库的时候会报错，导致无法下载成功，所以必须要修改一下。

````cmd
#开启mod模式（项目管理需要用到）
go env -w GO111MODULE=on
#重新设置成七牛镜像源（推荐）或阿里镜像源（用原有的会比较慢）
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy

#关闭包的MD5校验
go env -w GOSUMDB=off

#查看环境变量
go env
````

## 查看配置的环境变量

可以在 cmd 终端查看：

````cmd
echo %GOPATH%
echo %GOROOT%
````

至此，环境安装完毕。