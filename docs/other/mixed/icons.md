# 写文档常用的工具

## 1.图标

合理的使用一些 emoji 🫠 可以增加文章的阅读性，但物极必反。

以下是一些常用的网站地址：

- [Emoji大全 | Emoji表情符号词典](https://www.emojiall.com/zh-hans)

## 2.文档

在写文档的时候，经常使用到的一些快捷语法如下：

- 图片：

```txt:line-numbers
# 文档中间展示图片，静态链接
![picName](picUrl)

# 文档中间展示图片，动态链接
<img src="picUrl" alt="picName" style="display: block; margin: 0 auto; zoom: 30%">
<img src="picUrl" alt="picName" style="margin: auto;zoom: normal">
```

- jet brains 快捷键

````shell
# 复制当前行，到下一行
CTRL + D

# 向上移动当前行
shift + alt + 向上箭头

# 向下移动当前行
shift + alt + 向下箭头

# 删除当前行
CTRL + Y

# 调出快速搜索框
两次 Shift

# 当前文件中查找
Ctrl + F

# 当前文件中跳转到指定行
Ctrl + G

# 万能的快捷键
Alt + Enter

# 切换方法
ALT + ↑ ↓

# 切换页面
ALT + ← →

# 代码格式化
CTRL + ALT + L
````

- 自定义容器

```txt:line-numbers
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::