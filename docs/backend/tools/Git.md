# Git

[黑马程序员Git全套教程，完整的git项目管理工具教程](https://www.bilibili.com/video/BV1MU4y1Y7h5)

SVN 是集中式版本控制工具，版本库是集中存放在中央服务器的，team 里每个人 work 时从中央服务器下载代码，是必须联网才能工作，局域网或互联网，个人修改后然后提交到中央版本库。

GIT 是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。

![img](https://www.runoob.com/wp-content/uploads/2015/02/0D32F290-80B0-4EA4-9836-CA58E22569B3.jpg)



## 工作流程

- **clone** ：如果你要参与一个已有的项目，首先需要将远程仓库克隆到本地。
- **checkout** ：为了避免直接在 main 或 master 分支上进行开发，通常会创建一个新的分支。
- **add** ：在工作区中进行代码编辑、添加新文件或删除不需要的文件到暂存区。
- **commit** ：可以将代码提交到本地仓库，本地仓库保存修改的各个历史版本。
- **pull** ：从远程仓库合并拉取最新代码（fetch + merge）。
- **push** ：修改完毕代码后，将代码推送到远程仓库。

<img src=".\imgs\Git\image-20240822224750981.png" alt="image-20240822224750981" style="zoom:50%;" />



## 安装

安装过程很简单，傻瓜操作即可，之后就会出现，Git GUI（Git提供的图形界面工具 ），Git Bash（Git提供的命令行工具）。 

当安装 Git 后首先要做的事情是设置用户名称和 email 地址。这是非常重要的，因为每次 Git 提交都会使用该用户信息

配置用户信息：

```bash
git config --global user.name "kxfang2"
git config --global user.email "kxfang2@iflytek.com"
```

查看配置信息：

```bash
git config --global user.name
git config --global user.email
```



## 工作区状态

Git 工作目录下对于文件的修改（增加、删除、更新）会存在以下的几个状态，这些状态会随着我们执行 Git 的命令而发生变化：

<img src=".\imgs\Git\image-20240822225654930.png" alt="image-20240822225654930" style="zoom:50%;" />



## 分支

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离 开来进行重大的Bug修改、开发新的功能，以免影响开发主线。

当两个分支上对文件的修改可能会存在冲突，例如同时修改了同一个文件的同一行，这时就需要手动解决冲突。

在开发中，一般有如下分支使用原则和流程：

- master
  - 主分支，线上运行的分支
- develop
  - 开发部门的主要开发分支，阶段开发完成后，合并到 master 分支，准备上线
- feature/XXX





# Idea使用Git

真正的线上开发，都是使用 idea 去操作 Git 维护项目的代码，这个才是重点。

## 配置

配置好 IDEA 使用的 Git ：

<img src=".\imgs\Git\image-20240822230603887.png" alt="image-20240822230603887" style="zoom:50%;" />

点击 Test 按钮，可以测试是否配置成功。



## 实战

场景介绍：

​	假设我的本地已经有个项目了，但是并不是 Git 项目，需要将这个本地项目放到仓库里面，以供和其他的开发人员一起协作开发。

**创建远程仓库**：

​	登录到码云，新建仓库。

<img src=".\imgs\Git\image-20240822231433279.png" alt="image-20240822231433279" style="zoom:33%;" />

**初始化本地仓库**：

​	在 Idea 中打开本地项目，按照下面的操作执行

<img src=".\imgs\Git\image-20240822232017721.png" alt="image-20240822232017721" style="zoom: 33%;" />

**设置远程仓库**：

​	在终端中操作，执行：

```bash
git remote add origin https://gitee.com/fkx1213/git_dedmo.git
```

**commit到本地仓库**：

​	使用窗口的 `commit` ，`Amend` 是 Git 提交中的一个选项，允许你修改或更新最近一次提交，而不是创建一个新的提交记录。这个功能非常有用，特别是在你发现上一条提交中有一些遗漏或错误时，不需要创建新提交，只需要修改上一次提交即可。

**推送到远程仓库**：

<img src=".\imgs\Git\image-20240822234613457.png" alt="image-20240822234613457" style="zoom:50%;" />

![image-20240822234627366](.\imgs\Git\image-20240822234627366.png)

成功！！！！！！

<img src=".\imgs\Git\image-20240822234727807.png" alt="image-20240822234727807" style="zoom:33%;" />





# 命令

[Git 教程](https://www.bilibili.com/video/BV1HM411377j)

## reset

<img src=".\imgs\Git\image-20240822235710495.png" alt="image-20240822235710495" style="zoom:33%;" />








