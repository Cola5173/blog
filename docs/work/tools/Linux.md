# Linux

:::details 参考资料：

- [Linux命令大全(手册)](https://www.linuxcool.com/)

:::

在日常工作中，总是需要登录linux服务器进行安装和部署操作，经常使用的命令如下：

## 1.文件

一些常用的目录相关操作：

```shell
# 显示目录中文件及其属性信息
ll
# 复制文件或目录
cp 原 目标
# 创建文件夹
mkdir fileName
# 在系统根目录中，一次性创建多个有嵌套关系的目录文件：
mkdir -p /Dir1/Dir2/Dir3/Dir4/Dir5
# 显示当前工作目录的路径
pwd
```

`mv` 命令：

```shell

# 对文件进行重命名
mv fileName1 fileName2
# 将指定文件移动到/etc目录中，保留文件原始名称
mv fileName1 /etc
# 将指定文件移动到/etc目录中，改名
mv fileName1 /etc/fileName2
# 移动目录到/etc目录下，并定义新的目录名称
mv Dir1 /etc/Dir2
```

`cd` 命令：

```shell
# 切换到指定目录
cd /Dir 
# 切换至当前用户的家目录
cd ~ 
# 进入到上一级所在目录
cd .. 
```

`rm` 命令：

```shell
# 删除文件时默认会进行二次确认，敲击y进行确认
rm File.cfg
# 强制删除文件而无须二次确认：
rm -f File.cfg 
# 删除指定目录及其内的全部子文件，一并强制删除
rm -rf Dir 
# 强制删除当前工作目录内所有以.txt为后缀的文件
rm -f *.txt 
# 强制清空服务器系统内的所有文件（慎用！！！）
rm -rf /*
```

下载文件和解压相关：

```shell
# 下载文件
wget downloadURL
# 解压 tar、tar.gz、tar.bz2
tar -zxvf xxxx.tar.gz
# 解压指定压缩包到/etc目录：
tar xvf File.tar -C /etc 
# 解压zip
unzip File.zip
# 将压缩包文件解压到指定目录中
unzip File.zip -d /home
# 压缩文件
zip -r 压缩文件名 压缩文件目录
```

## 2.文档编辑

一些常用的文档编辑相关的命令：

```shell
# 查看文档内容
cat fileName
# 持续查看 `car.log` 文件的后 20 行内容
tail -n 20 -f car.log
```

`vim` 是一个功能强大的文本编辑器，广泛应用于各种编程和文本编辑任务中。它主要分为两种模式：

- **命令模式**：用户可以使用各种命令来操作文件
- **输入模式**：用户可以直接输入和修改文本

以下是一些常用的 `vim` 命令模式下的命令：

```text
# 光标移动：
gg：移动到文件开头
G：移动到文件末尾
nG：跳转到第 n 行
如向下移动 30 行，可以使用"30↓" 的组合按键， 亦即加上想要进行的次数(数字)后，按下动作即可
0 或功能键[Home]：这是数字『 0 』：移动到这一行的最前面字符处
$ 或功能键[End]：移动到这一行的最后面字符处
n<Enter>：n 为数字，光标向下移动 n 行

# 翻页
[Ctrl] + [f]	屏幕『向下』移动一页，相当于 [Page Down]按键 (常用)
[Ctrl] + [b]	屏幕『向上』移动一页，相当于 [Page Up] 按键 (常用)
[Ctrl] + [d]	屏幕『向下』移动半页
[Ctrl] + [u]	屏幕『向上』移动半页

# 搜索文本
/word：向光标之下寻找一个名称为 word 的字符串。例如要在档案内搜寻 vbird 这个字符串，就输入 /vbird 即可
如果匹配到，n 跳转到下一个，N 跳转到上一个

# 插入文本：
i：在光标前插入文本
I：在行首插入文本
a：在光标后插入文本
A：在行尾插入文本
o：在当前行下方插入新行并进入插入模式
O：在当前行上方插入新行并进入插入模式

# 删除文本：
x：删除光标所在位置的字符
dd：删除当前行
dw：删除从光标到单词末尾的字符
d$：删除从光标到行尾的字符
d0：删除从光标到行首的字符

# 保存和退出：
:w：保存文件
:q：退出 Vim
:wq：保存并退出
:q!：强制退出且不保存

# 其他常用命令：
:set nu：显示行号
:set nonu：隐藏行号
```

以下是一些常用的 `vim` 输入模式下的命令：

## 3.服务

一些常用服务相关的命令：

```shell
# 查找当前系统中运行的elastic
ps -ef | grep elastic
# 强制结束某个指定的进程（数字为对应的PID值）
kill -9 518
# 显示系统的网络设备信息
ifconfig
# 列出当前系统中所有使用端口 9200 的进程
lsof -i:9200
# 以后端模式运行指定脚本程序，在窗口输出结果
nohup File.sh 
# 以后端模式运行指定脚本程序，在后台运行
nohup File.sh &
# 以后端模式执行指定命令，并将输出结果写入到文件
nohup uptime &> File.txt
#后台启动，不输出文件
nohup File.sh >/dev/null 2&1 &
```

## 4.防火墙

防火墙相关的命令：

```shell
# 查看系统的防火墙服务状态
service firewalld status
# 查看防火墙中永久打开的端口
firewall-cmd --list-ports --permanent
# 永久开放9100端口
sudo firewall-cmd --zone=public --add-port=9100/tcp --permanent
# 重新加载防火墙
firewall-cmd --reload
```

## 5、系统资源

````shell
# 查看当前系统上的所有用户
cat /etc/passwd

# 查看当前系统资源占用情况，M 按照内存从大到小
top
````