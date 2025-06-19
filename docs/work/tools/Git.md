# Git

::: details 参考资料：

- [黑马程序员Git全套教程，完整的git项目管理工具教程](https://www.bilibili.com/video/BV1MU4y1Y7h5)

:::

## 1、简介

### 1.1.版本控制器

版本控制器（`Version Control System`，简称 VCS）是一种软件工具，用于管理和跟踪文件（特别是源代码）随着时间的变化所做的修改。它可以记录文件的历史记录，让多个开发者能够协作并确保每个人的修改都能被追踪和合并。

版本控制的主要功能包括：

- 历史记录管理：VCS 记录每次修改的版本，开发者可以查看和恢复到之前的任何版本
- 协作：多个开发者可以在同一项目上工作，VCS 会帮助管理不同人对同一文件的修改，避免冲突，并允许合并不同的修改
- 分支与合并：开发者可以创建分支，在分支上独立开发新功能或修复 bug，完成后再将更改合并回主分支
- 备份与恢复：可以防止文件丢失，并且能够恢复到某个特定时间点的状态

VCS 可以分为**集中式版本控制**（`Centralized Version Control`）和**分布式版本控制**（`Distributed Version Control`）两大类。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0201.png" alt="VCS分类" style="margin: auto;zoom:80%;">

### 1.2.集中式版本控制

在集中式版本控制系统中，所有的版本数据都存储在一个中心化的服务器上。**每个开发者的工作副本仅仅是从服务器获取的最新版本或历史版本的一份拷贝**，开发者必须与中央服务器进行交互来提交（commit）更改或更新（update）工作副本。

常见的集中式版本控制系统：

- Subversion (SVN)：较为传统且广泛使用的集中式版本控制系统
- CVS：早期的版本控制系统，也是集中式的，但已经逐渐被其他系统所替代

优点：

- 简单易懂：开发者只需关注本地的工作副本和与服务器的交互，操作相对简单
- 集中管理：所有版本数据存储在中央服务器上，便于统一管理

缺点：

- 依赖网络：所有操作都需要与服务器交互，如果没有网络连接，开发者就无法进行提交或更新操作
- 单点故障：如果中央服务器出现故障或丢失数据，那么所有开发者的工作历史都会受到影响

### 1.3.分布式版本控制

分布式版本控制系统不同于集中式系统，它允许**每个开发者都拥有一个完整的仓库副本**，包括整个项目的历史记录。开发者的本地仓库不仅是文件的工作副本，而且包含了所有的版本信息。因此，开发者可以在本地进行所有的操作（例如提交、查看历史、创建分支等），只有在需要与其他开发者协作时，才将更改推送到共享的远程仓库。

常见的分布式版本控制系统：

- Git：最流行的分布式版本控制系统，广泛应用于开源项目和企业开发
- Mercurial：与 Git 类似的分布式版本控制系统，但语法和功能略有不同
- Bazaar：另一个分布式版本控制系统，虽然使用不如 Git 和 Mercurial 普遍，但仍然有一定的应用

优点：

- 离线工作：开发者可以在本地仓库进行所有操作，不依赖于网络。只有在需要共享时，才将更改推送到远程仓库
- 更高效的分支管理：分布式系统中创建和合并分支非常轻松，适合复杂的开发工作流
- 数据冗余：每个开发者的本地仓库都有完整的项目历史，避免了单点故障的风险

缺点：

- 学习曲线较陡：分布式版本控制系统的工作流比集中式系统复杂，需要一定的学习和理解
- 管理难度：虽然每个开发者都有本地仓库，但如何有效地协调和合并不同开发者的更改，尤其是涉及多个远程仓库时，管理上可能会有更多挑战

## 2、安装

安装过程很简单，[官网下载地址_download](https://git-scm.com/downloads) ，双击下载的安装文件来安装 Git。

安装完成后在电脑桌面（也可以是其他目录）点击右键，如果能够看到如下两个菜单则说明Git安装成功：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0202.png" alt="安装结果" style="margin: auto;zoom:60%;">

- Git GUI（Git提供的图形界面工具 ）
- Git Bash（Git提供的命令行工具）

当安装 Git 后首先要做的事情是设置用户名称和 email 地址。这是非常重要的，因为每次 Git 提交都会使用该用户信息。

````bash
# 设置用户名和email
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"

# 查看配置信息
git config --global user.name
git config --global user.email
````

## 3、Git

### 3.1.基础知识

- 工作区（Working Directory）
   
    这是你**本地项目的实际目录**，包含了你正在编辑的文件，Git 在这个区域里跟踪文件的更改情况

- 暂存区（Staging Area / Index）
   
    也叫做索引，是 Git 记录哪些文件的更改准备提交到本地仓库的区域。当你使用 git add 命令时，文件会从工作区添加到暂存区

- 本地仓库（Local Repository）
   
    本地仓库就是你**本地机器上的 `.git` 目录**，其中**存储着项目的所有历史版本和分支信息**。提交操作会把暂存区的内容保存到本地仓库中

- 远程仓库（Remote Repository）
   
    这是托管代码的服务器或者云服务（比如 GitHub、GitLab、Bitbucket 等），所有开发者共享一个远程仓库，用来同步代码。

### 3.2.工作流程

- **clone** ：参与一个已有的项目，从远程仓库将代码克隆到本地
- **checkout** ：为了避免直接在 main 或 master 分支上进行开发，通常会创建一个新的分支
- **add** ：在工作区中进行代码编辑、添加新文件或删除不需要的文件到暂存区
- **commit** ：可以将代码提交到本地仓库，本地仓库保存修改的各个历史版本
- **pull** ：从远程仓库合并拉取最新代码（fetch + merge）
- **push** ：修改完毕代码后，将代码推送到远程仓库

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0203.png" alt="Git工作流程" style="margin: auto;zoom:70%;">

### 3.3.工作区状态

Git 工作目录下对于文件的修改（增加、删除、更新）会存在以下的几个状态，这些状态会随着我们执行 Git 的命令而发生变化：

- Untracked（未跟踪）
  
    **在工作区中新添加的文件**，Git 没有开始跟踪这个文件的更改。

- Modified（已修改）

    文件已经被修改，**但修改的内容尚未被添加到暂存区**

- Staged（已暂存）

  文件的修改已经通过 git add 命令添加到暂存区

-  Deleted（已删除）

   在工作区中删除了文件，但 Git 仍然在跟踪它们

- Renamed（重命名）

  重命名一个文件时，Git 会认为这是一个删除操作（旧文件）和一个新建操作（新文件），但 Git 会将其标记为重命名

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0204.png" alt="工作区状态" style="margin: auto;zoom:70%;">

### 3.4.分支

几乎所有的版本控制系统都支持分支，使用分支可以把你的工作从开发主线上分离开来进行重大的Bug修改、开发新的功能，以免影响开发主线。

当两个分支上对文件的修改可能会存在冲突，例如同时修改了同一个文件的同一行，这时就需要手动解决冲突。

在开发中，一般有如下分支使用原则和流程：

- master
  - 主分支，线上运行的分支
- develop
  - 开发部门的主要开发分支，阶段开发完成后，合并到 master 分支，准备上线

### 3.5.提交规范

在git提交代码的时候，需要遵守约定的规范，`提交动作: 消息主题`，举例：

```txt
feat: 增加用户注册的功能
```

提交动作代表的含义如下：

| 提交动作名    | 含义       | 举例                |
|----------|----------|-------------------|
| feat     | 新特性、新功能  | feat: 新增用户注册功能    |
| fix      | 修改bug    | fix: 修复明文密码存储     |
| style    | 代码格式修改   | style: 删除多余的空格    |
| docs     | 文档修改     | docs: 更新README文档  |
| refactor | 某个已有功能重构 | refactor: 数据库异步写入 |
| test     | 测试相关内容   | test: 增加用户模块测试    |

## 4、常见命令

记录开发中经常使用的一些 Git 命令：

````shell
# 查看本地仓库对应的远端仓库
git remote -v

# 查看 git 的全局配置项
git config --global --list

# 查看 git 的这个项目的本地配置项
git config --local --list

# 和远端仓库产生关联
git remote add origin URL

# 为单个项目开启代理
git config --local http.proxy http://127.0.0.1:7890
git config --local https.proxy http://127.0.0.1:1087

# 设置项目级别的用户名和邮箱（这样提交代码，就不会使用全局配置的公司用户名和邮箱咯）：
git config user.name "你的GitHub用户名"
git config user.email "你的GitHub邮箱"

# 删除远端的main分支
git push origin --delete main

# 查看标签
git tag

# 使用 git checkout 命令切换到分支的标签。例如，假设你要从 v1.0.0 标签创建分支：
git checkout tags/v1.0.0

# 在标签上创建一个新分支并切换到该分支：
git checkout -b new-branch-name
````

### 4.1.clone

当你首次开始一个 Git 项目时，需要从远程仓库克隆代码到本地：

````bash
git clone <远程仓库地址>
````

### 4.2.暂存区

在本地工作区，你可以自由地修改项目中的文件。Git 会自动跟踪文件的变化，但这些变化还不会被提交。

````bash
# 查看哪些文件发生了变化，以及哪些文件已添加到暂存区等待提交
git status

# 将修改添加到暂存区（可以指定单个文件，也可以使用 . 来添加所有文件）
git add <文件名>
git add .

# 将暂存区的内容提交到本地仓库，并附上描述性信息
git commit -m "提交信息"

# 查看提交历史
git log
````

### 4.3.本地仓库

本地仓库的代码，需要和远程仓库进行互动，比如推送最新本地代码到远程仓库 或 拉取远端最近代码到本地：

````bash
# 将本地代码提交到远程仓库
git push origin <分支名>

# 从远程仓库获取最新的代码并合并到本地仓库
git pull origin <分支名>
````

### 4.4.分支

分支是 Git 中的重要特性，允许你在独立的环境中开发新功能或者修复 bug，避免影响主分支（通常是 main 或 master）。

````bash
# 创建和切换到一个新分支
git checkout -b <分支名>

# 合并分支（先切换到目标分支，然后执行合并操作，比如将B分支代码合并到A分支）
git checkout <目标分支A>
git merge <被合并的分支B>
````

## 5、IDEA

日常开发都是在 IDEA 中使用 Git ，所以这部分才是最重要的⚠️⚠️⚠️⚠️

### 5.1.无远端项目

无远端项目，想要将本地项目推送到托管平台

在学习的过程中，经常会出现，写笔记写项目代码，写着写着想要把自己的成果保存下来，托管在 github 上。

我写过类似的文章，放入地址：[Github托管博客](../../other/blog/02)

### 5.2.已有远端项目

99% 都是基于已有远端项目，然后从远端将项目 pull 到本地后进行相关的开发工作。本节就是基于此，演示如何使用 IDEA 拉取远端代码进行开发。

- 克隆项目

打开 IDEA ，选取 `Clone Repository` :

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0205.png" alt="克隆项目" style="margin: auto;zoom:50%;">

有两种方法去真正进行克隆，第一种是直接输入远端仓库代码的地址：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0206.png" alt="克隆项目方式一" style="margin: auto;zoom:50%;">

或者，通过 Github 关联，登录你的账号，直接找到对应的项目：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0207.png" alt="克隆项目方式二" style="margin: auto;zoom:50%;">

但是，我个人推荐，直接使用远端地址连接，因为大部分情况下在公司开发都是一个 url ，并不是 github 。但是作为学生，使用 github 还挺好的 🖖。

无论哪种方式，点击 `clone` 按钮，就可以将远端项目克隆到本地仓库中，然后进行开发。

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0208.png" alt="克隆结果" style="margin: auto;zoom:50%;">

- 创建分支进行开发

在实际开发中，建议创建自己的本地分支后进行开发，比如最终我需要将代码推送到 master 分支上，我需要在本地创建自己的 master_cola 分支进行开发：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0209.png" alt="commit代码" style="margin: auto;zoom:50%;">

- 推送代码到远端仓库

需要将 master_cola 分支的代码推送到 master 分支，先 checkout 到 master ：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0210.png" alt="切换分支到master" style="margin: auto;zoom:50%;">

然后再将 cola 分支上的的代码合并到 master 上：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0211.png" alt="合并cola到master" style="margin: auto;zoom:50%;">

推送代码即可：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0212.png" alt="推送代码" style="margin: auto;zoom:50%;">

### 5.3.解决冲突

假设 cola 和 cola2 都是同时从 master 分支上拉取了自己的分支到本地进行开发。但是 cola 开发速度比较快，提前将代码 push 到远端，但是 cola2 同学
修改的是同一个文件，也在本地commit了，于是打算提交。

但是，cola2 先切换到本地的 master 分支后，拉取远端最新代码，发现了 cola 同学写的：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0213.png" alt="拉取远端最新代码" style="margin: auto;zoom:50%;">

然后 cola2 同学打算将自己分支的代码合并到 master 上，发现：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0214.png" alt="代码冲突" style="margin: auto;zoom:50%;">

点进去，可以发现双方对同一个文件修改不同，这个时候就需要手动去解决冲突：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0215.png" alt="手动解决" style="margin: auto;zoom:50%;">

最终，cola2 将 cola 和自己的代码全部保存：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0216.png" alt="全部保存" style="margin: auto;zoom:50%;">

再将解决完冲突的代码 push 到远端：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0217.png" alt="push到远端" style="margin: auto;zoom:50%;">

⚠️⚠️⚠️⚠️其实重点是：

合并代码到目标分支之前，先 pull 拉取目标分支的最新代码后 merge 。

### 5.4.merge 和 rebase

❗如果 cola2 没有提前拉取 master 最新代码，那怎么办呢？在 merge 完后直接 push 会出现：

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0218.png" alt="远端冲突" style="margin: auto;zoom:50%;">

无论点击了 `merge` 还是 `rebase` ，都是是回到了手动去解决冲突即可。。。。。那么两者之间有什么区别呢？

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0219.png" alt="merge和rebase" style="margin: auto;zoom:50%;">

`merge` 是将两个分支的修改合并在一起，通常用于将一个分支的更改合并到另一个分支。合并后，会生成一个新的合并提交（merge commit），并且保留了原始提交的历史。

`rebase` 是将当前分支的提交“重新应用”到目标分支的最新提交上，可以将一系列的提交移到另一个分支的最前面，创建一个“线性”的历史。

日常开发中，完全不建议使用 rebase ❗❗❗

### 5.5.tag

打 Git 标签（Tag）是 Git 中的一种重要操作，用于给某个特定的提交（commit）打上标记，通常用于标记项目的发布版本或重要的历史节点，本质上是对提交的引用，通常会标记发布版本、里程碑或者关键的版本变更。

````bash
# 查看所有标签
git tag

# 查看某个标签的详细信息
git show <tag-name>

# 创建标签（轻量标签 or 附注标签）
git tag <tag-name>
git tag -a <tag-name> -m "Tag description"

# 推送标签到远程（具体标签 or 所有本地标签）
git push origin refs/tags/<tag-name>
git push --tags

# 删除标签（本地标签 or 远程标签）
git tag -d <tag-name>
git push --delete origin <tag-name>
````

### 5.6.回滚和强推

先了解一下在 IDEA 中对 Git 管理文件的颜色有三种，红色（工作区）、绿色（add 暂存区）、灰色（commit 版本管理）。

- 未 add 的文件如何实现回滚❓

直接删除文件就行

- 已 add 未 commit 如何实现回滚❓

右键 Git 后，选择 `RollBack` 即可

- 已 commit 未 push，如何实现回滚❓

第一种，通过 `undo commit`。但是这种操作，每次只能回滚历史最顶端的 commit，无法实现多次回滚。并且会形成一个changes，保留原来对代码的更改内容。

第二种，通过 `drop commit`，直接丢掉对文件的更改，可以一次选择多个文件，不会保留原来的更改内容。

第三种，通过 `revert commit`，直接丢掉对文件的更改，可以一次选择多个文件，不会保留原来的更改内容，但是会形成新的 commit 记录，不建议使用。

其实这三种都是针对单个 commit ，如果 commit 之间有关联，会需要手动解决冲突。

通过 `reset` 可以回滚在某一个 commit 之后所有的代码，分为四种：
`soft`（将当前分支的 HEAD 回退到指定的 commit，但是 不会修改工作区 和 不会清空暂存区，所有的更改会被保留在暂存区中）、
`mixed`（将当前分支的 HEAD 回退到指定的 commit，同时 撤销暂存区的内容，但 保留工作区的修改）、
`hard`（将当前分支的 HEAD 回退到指定的 commit，同时 丢弃工作区和暂存区的所有修改，回到一个清洁的状态）、
`keep`（将当前分支的 HEAD 回退到指定的 commit，但它会保留工作区中没有修改的文件）

- 已 push，如何实现回滚❓

<img src="https://blogcola1213.oss-cn-wuhan-lr.aliyuncs.com/java/tools/0220.png" alt="merge和rebase" style="margin: auto;zoom:70%;">

使用 `git reset` 来回滚到指定的 commit，再通过 `git push --force` 将修改强制推送到远程仓库，慎用❗❗❗
