# Java网络编程

:::details 学习资料：

- [JavaWeb 教程](https://www.bilibili.com/video/BV1CL4y1i7qR)

:::

前端是网站的页面，包括网站的样式、图片、视频等一切用户可见的内容都是前端的内容。

端仅仅是一层皮，它直接决定了整个网站的美观程度，我们可以自由地编排页面的布局，甚至可以编写好看的特效；而灵魂则是后端，如何处理用户的交互、如何处理数据查询是后端的职责所在

## 1、HTML 页面

通过浏览器可以直接浏览XML文件，而浏览器一般是用于浏览HTML文件的，以HTML语言编写的内容，会被浏览器识别为一个页面，并根据我们编写的内容，将对应的组件添加到浏览器窗口中。

### 1.1、第一个 HTML 页面

用 IDEA 也能编写 HTML 页面，在 IDEA 中新建一个 Web 模块，右键新建一个 HTML 文件，选择 HTML5 文件，并命名为 index，创建后出现：

````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
</html>
````

它和XML基本长得一样，并且还自带了一些标签，推荐使用内置预览，不然还得来回切换窗口

### 1.2、HTML 语法规范

一个HTML文件中一般分为两个部分：

- `head`：一般包含页面的标题、页面的图标、还有页面的一些设置，也可以在这里导入 `css`、 `js` 等内容
- `body`：整个页面所有需要显示的内容全部在主体编写

在 `head` 中，包含的内容为：

````html

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
````

`meta` 标签用于定义页面的一些元信息，这里使用它来定义了一个字符集（编码格式），一般是 `UTF-8`，下面的 `title`
标签就是页面的标题，会显示在浏览器的上方。

还可以给页面设置一个图标，图标一般可以在字节跳动的IconPark网站找到：[iconpark](https://iconpark.oceanengine.com/home)
，选择一个自己喜欢的图标下载即可。

````html

<link rel="icon" href="icon.png" type="image/x-icon"/>
````

`link` 标签用于关联当前 HTML 页面与其他资源的关系，关系通过 `href` 属性指定，这里使用的是 icon 表示这个文件是当前页面图标。

可以在 `body` 内部编写该页面要展示的所有内容，比如用到了 `img` 标签来展示一个图片，其中每一个标签都称为一个元素：

````html
<img width="300" src="image.xxx" alt="当图片加载失败时，显示的文本">
````

HTML 中有些标签是单标签，也就是说只有这一个，还有一些标签是双标签，必须成对出现。 HTML
中，也不允许交叉嵌套，但是出现交叉嵌套时，浏览器并不会提示错误，而是仍旧尝试去解析这些内容，甚至会帮助我们进行一定程度的修复。

在 `body` 中，一般使用 `div` 标签来分割页面：

````html

<body>
<div>我是第一块</div>
<div>我是第二块</div>
</body>
````

通过使用 `div` 标签，将整个页面按行划分，而高度就是内部元素的高度。

如果只希望按元素划分，也就是说元素占多大就划分多大的空间，可以使用 `span` 标签来划分：

````html

<body>
<div>
    <span>我是第一块第一个部分</span>
    <span>我是第一块第二个部分</span>
</div>
<div>我是第二块</div>
</body>
````

也可以使用 `p` 段落标签，它一般用于文章分段：

````html

<body>
<p>
    你看这个彬彬啊，才喝几罐就醉了，真的太逊了。 这个彬彬就是逊呀！
    听你这么说，你很勇哦？ 开玩笑，我超勇的，超会喝的啦。
    超会喝，很勇嘛。身材不错哦，蛮结实的嘛。
</p>
<p>
    哎，杰哥，你干嘛啊。都几岁了，还那么害羞！我看你，完全是不懂哦！
    懂，懂什么啊？ 你想懂？我房里有一些好康的。
    好康，是新游戏哦！ 什么新游戏，比游戏还刺激！
</p>
<p>
    杰哥，这是什么啊？ 哎呦，你脸红啦！来，让我看看。
    不要啦！！ 让我看看嘛。 不要啦，杰哥，你干嘛啊！
    让我看看你法语正不正常啊！
</p>
</body>
````

遇到特殊字符，需要使用转义字符。

### 1.3、HTML 常用标签

`br` 换行，`hr` 分割线：

````html

<body>
<div>
    我是一段文字<br>我是第二段文字
</div>
<hr>
<div>我是底部文字</div>
</body>
````

标题一般用 `h1` 到 `h6` :

````html

<body>
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
<p>我是正文内容，真不错。</p>
</body>
````

超链接:

````html
<a href="https://www.bilibili.com">点击访问小破站</a>
````

指定页面上的一个锚点进行滚动：

````html

<body>
<a href="#test">跳转锚点</a>
<img src="image.jpeg" width="500">
<img src="image.jpeg" width="500">
<img src="image.jpeg" width="500">
<img src="image.jpeg" width="500">
<div id="test">我是锚点</div>
<img src="image.jpeg" width="500">
<img src="image.jpeg" width="500">
<img src="image.jpeg" width="500">
</body>
````

每个元素都可以有一个 `id` 属性，只需要给元素添加一个 `id` 属性，使用 `a` 标签可以跳转到一个指定锚点。

无序列表，其中每一个 `li` 表示一个列表项：

````html

<ul>
    <li>一号选项</li>
    <li>二号选项</li>
    <li>三号选项</li>
    <li>四号选项</li>
    <li>五号选项</li>
</ul>
````

用 `ol` 来显示一个有序列表：

````html

<ol>
    <li>一号选项</li>
    <li>二号选项</li>
    <li>三号选项</li>
    <li>四号选项</li>
    <li>五号选项</li>
</ol>
````

表格：

````html

<table>
    <thead>
    <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>年级</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>0001</td>
        <td>小明</td>
        <td>男</td>
        <td>2019</td>
    </tr>
    <tr>
        <td>0002</td>
        <td>小红</td>
        <td>女</td>
        <td>2020</td>
    </tr>
    </tbody>
</table>
````

### 1.4、HTML 表单

表单就是用户在页面中填写了对应的内容，点击按钮就可以提交到后台，比如登陆界面，就可以使用表单来实现：

````html
<label>
    我是输入框
    <input type="text">
</label>
````

对于一个输入框，一般会将其包括在一个 `lable` 标签中，它和 `span` 效果一样，但是点击前面文字也能快速获取输入框焦点。

````html

<body>
<div>登陆我们的网站</div>
<hr>
<div>
    <label>
        账号：
        <input type="text">
    </label>
</div>
<div>
    <label>
        密码：
        <input type="password">
    </label>
</div>
</body>
````

输入框可以有很多类型， `password` 输入内容就不会直接展示原文了。

创建一个按钮有以下几种方式:

````html

<button>登陆</button>
<input type="submit" value="登陆">
<input type="button" value="登陆">
````

现在就可以写一个大致的登陆页面了：

````html

<body>
<h1>登陆我们的网站</h1>
<form>
    <div>
        <label>
            账号：
            <input type="text" placeholder="Username...">
        </label>
    </div>
    <div>
        <label>
            密码：
            <input type="password" placeholder="Password...">
        </label>
    </div>
    <br>
    <a href="https://www.baidu.com">忘记密码</a>
    <br>
    <br>
    <div>
        <input type="submit" value="登陆">
    </div>
</form>
</body>
````

多行文本:

````html
<label>
    这是我们的文本框<br>
    <textarea placeholder="文本内容..." cols="10" rows="10"></textarea>
</label>
````

可以指定默认的行数和列数，拖动左下角可以自定义文本框的大小.

添加勾选框：

````html
<label>
    <input type="checkbox">
    我同意本网站的隐私政策
</label>
````

上面演示的是一个多选框，单选框：

````html
<label>
    <input type="radio" name="role">
    学生
</label>
<label>
    <input type="radio" name="role">
    教师
</label>
````

需要使用name属性进行分组，同一个组内的选项只能选择一个。

也可以添加列表让用户进行选择，创建一个下拉列表：

````html
<label>
    登陆身份：
    <select>
        <option>学生</option>
        <option>教师</option>
    </select>
</label>
````

默认选取的是第一个选项，可以通过 `selected` 属性来决定默认使用的是哪个选项。

## 2、CSS样式















































