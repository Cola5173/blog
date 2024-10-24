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
```

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

::: danger 很危险
This is a dangerous warning.
:::

