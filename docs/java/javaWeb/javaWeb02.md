# Java网络编程

:::details 学习资料：

- [JavaWeb 教程](https://www.bilibili.com/video/BV1CL4y1i7qR)

:::

前端是网站的页面，包括网站的样式、图片、视频等一切用户可见的内容都是前端的内容。

端仅仅是一层皮，它直接决定了整个网站的美观程度，我们可以自由地编排页面的布局，甚至可以编写好看的特效；而灵魂则是后端，如何处理用户的交互、如何处理数据查询是后端的职责所在

## 1、HTML 页面

通过浏览器可以直接浏览XML文件，而浏览器一般是用于浏览HTML文件的，以HTML语言编写的内容，会被浏览器识别为一个页面，并根据我们编写的内容，将对应的组件添加到浏览器窗口中。

### 1.1.第一个 HTML 页面

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

### 1.2.HTML 语法规范

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

### 1.3.HTML 常用标签

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

### 1.4.HTML 表单

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

`CSS` 是自定义页面的样式

### 2.1.CSS 选择器

想要自定义一个元素的样式，只有先找到要自定义的元素，才能开始编写样式。

一个标签选择器的格式为：

````css
标签名称 {
    属性名称: 属性值
}
````

可以设定输入框的字体大小、行高等：

````css
input {
    width: 200px;
    font-size: 20px;
    line-height: 40px;
}
````

每个元素都可以有一个 `id` 属性，可以将其当做一个跳转的锚点使用，也可以使用 `css` 来进行定位：

````html
<h1 id="title">登陆我们的网站</h1>
````

使用 `CSS` 设定一个属性，选择某个 `id` 需要在前面加上一个#：

````css
#title {
    color: red;
}
````

每个元素都可以有一个 `class` 属性，表示当前元素属于某个类。一个元素可以属于很多个类，一个类也可以被很多个元素使用：

````html

<form>
    <div>
        <label class="test">
            账号：
            <input type="text" placeholder="Username...">
        </label>
    </div>
    <div>
        <label class="test">
            密码：
            <input type="password" placeholder="Password...">
        </label>
    </div>
</form>
````

两个 `label` 元素都使用了 `test` 类（类名称是自定义的）：

````css
.test {
    color: blue;
}
````

使用类选择器，能够对所有为此类的元素添加样式。在进行类选择时，需要在类名前面加上 `.` 来表示。

### 2.2.组合选择器和优先级问题

也可以让多个选择器，共用一个css样式：

````css
.test, #title {
    color: red;
}
````

只需要并排写即可，注意中间需要添加一个英文的逗号用于分割，也可以使用 `*` 来一次性选择所有的元素：

````css
* {
    color: red;
}
````

还可以选择位于某个元素内的某个元素：

````css
div label {
    color: red;
}
````

有关详细的CSS选择器可以查阅：https://www.runoob.com/cssref/css-selectors.html

## 3、JavaScript

JavaScript 与 Java 没有任何关系，也被称之为 js ，是重点。

它相当于是前端静态页面的一个补充，可以让一个普通的页面在后台执行一些程序，比如下载文件、页面跳转、页面弹窗、进行登陆等。

### 3.1.js基本语法

定义一个变量可以使用 `let` 关键字或是 `var` 关键字，IDEA推荐我们使用 `let` 关键字:

````js
let a = 10;
a++;
window.alert(a)
````

js 是一门弱类型语言，变量的类型并不会在一开始确定，而是在运行时动态解析类型：

````js
let a = 10;
a = "HelloWorld！"
console.info(a)
````

变量 a 已经被赋值为数字类型，但是依然在后续能将其赋值一个字符串，它的类型是随时可变的。

JS中存在的基本数据类型：

- `Number`：数字类型（包括小数和整数）
- `String`：字符串类型（可以使用单引号或是双引号）
- `Boolean`：布尔类型（与Java一致）

还包括一些特殊值：

- `undefined`：未定义 - 变量声明但不赋值默认为undefined
- `null`：空值 - 等同于Java中的null
- `NaN`：非数字 - 值不是合法数字，比如：

可以使用 `typeof` 关键字来查看当前变量值的类型：

````js
let a = 10;
console.info(typeof a)
a = 'Hello World'
console.info(typeof a)
````

### 3.2.js逻辑运算和流程控制

js 中的关系运算符，包括如下 8 个关系运算符：大于（>）,小于（<）,小于等于（<=）,大于等于（>=）,相等（==），不等（!
=），全等（===），不全等（!==）

关系运算符大致和Java中的使用方法一致，不过它还可以进行字符串比较：

````js
console.info(666 > 777)
console.info('aa' > 'ab')
````

相等和全等有什么区别呢？

````js
console.info('10' == 10)
console.info('10' === 10)
````

`==` 的比较规则是：当操作数类型一样时，比较的规则和恒等运算符一样，都相等才相等，如果两个操作数是字符串，则进行字符串的比较，如果里面有一个操作数不是字符串，那两个操作数通过
`Number()` 方法进行转换，转成数字进行比较。

逻辑运算，JS中包括 `&&` 、`||` 、 `&` 、 `|` 、`!` 等.

js 的分支结构，实际上和 Java 是一样的，也是使用 `if-else` 语句来进行.

多分支语句也可以使用 `switch` 来完成.

循环结构也和Java相差不大.

### 3.3.js函数定义

js 中的方法和 Java 中的方法定义不太一样，js 中一般称其为函数：

````js
function f() {
    console.info("有一个人前来买瓜")
}
````

定义一个函数，需要在前面加上 `function` 关键字表示这是一个函数，后面跟上函数名称和()，其中可以包含参数，在{}中编写函数代码。

只需要直接使用函数名+()就能调用函数：

````js
f();
````

给函数添加形式参数以及返回值：

````js
function f(a) {
    console.info("得到的实参为：" + a)
    return 666
}

f("aa");
````

由于 js 是动态类型，因此不必指明参数 a 的类型，同时也不必指明返回值的类型，一个函数可能返回不同类型的结果，直接编写 return
语句即可。

同理，可以在调用函数时，不传参，那么默认会使用 undefined：

````js
function f(a) {
    console.info("得到的实参为：" + a)
    return 666
}

f();
````

如果希望不传参的时候使用自定义的默认值，可以直接在形参后面指定默认值:

````js
function f(a = "6666") {
    console.info("得到的实参为：" + a)
    return 666
}

f();
````

函数本身也是一种类型，他可以被变量接收，所有函数类型的变量，也可以直接被调用：

````js
function f(a = "6666") {
    console.info("得到的实参为：" + a)
    return 666
}

let k = f;
k();
````

也可以直接将匿名函数赋值给变量：

````js
let f = function (str) {
    console.info("实参为：" + str)
}
````

### 3.4.数组和对象

js 中的数组定义与 Java 不同，它更像是 Python 中的列表，数组中的每个元素并不需要是同样的类型：

````js
let arr = [1, "lbwnb", false, undefined, NaN]
console.info(arr[1])
````

数组还可以动态扩容，如果尝试访问超出数组长度的元素，并不会出现错误，而是得到 `undefined` 。也可以使用 `push` 和 `pop`
来实现栈操作：

````js
let arr = [1, "lbwnb", false, undefined, NaN]
arr.push("bbb")
console.info(arr.pop())
console.info(arr)
````

js 中也能定义对象：

````js
let obj = new Object()
let obj = {}
````

可以动态为其添加属性：

````js
let obj = {}
obj.name = "伞兵一号"
console.info(obj)
````

也可以给对象动态添加一个函数：

````js
let obj = {}
obj.f = function () {
    console.info("我是对象内部的函数")
}

obj.f()
````

可以在函数内使用 `this` 关键字来指定对象内的属性：

````js
let name = "我是外部变量"
let obj = {}
obj.name = "我是内部变量"
obj.f = function () {
    console.info("name属性为：" + this.name)
}

obj.f()
````

如果使用 lambda 表达式，那么 this 并不会指向对象。

除了动态添加属性，也可以在一开始的时候指定对象内部的成员：

````js
let obj = {
    name: "我是内部的变量",
    f: function () {
        console.info("name属性为：" + this.name)
    }
}

obj.f()
````

如果有多行属性，需要在属性定义后添加一个 `,` 进行分割！

### 3.5.js事件

当我们点击一个页面中的按钮之后，希望能够进行登陆操作，或是执行一些 js 代码来实现某些功能，那么这时候，就需要用到事件。

事件相当于一个通知，可以提前设定好事件发生时需要执行的内容，当事件发生时，就会执行预先设定好的 js 代码。

事件有很多种类型，其中常用的有：

- `onclick`：点击事件
- `oninput`：内容输入事件
- `onsubmit`：内容提交事件

可以直接为一个元素添加对应事件的属性，比如 `oninput` 事件，可以直接在事件的值中编写 `js`
代码，但是注意，只能使用单引号，因为双引号用于囊括整个值:

````js
<input type="password" oninput="console.info('正在输入文本')">
````

也可以单独编写一个函数，当事件发生时直接调用函数：

````js
function f() {
    window.alert("你输入了一个字符")
}
````

### 3.6.Document对象

当网页被加载时，浏览器会创建页面的文档对象模型（`Document Object Model`），它将整个页面的所有元素全部映射为 js 对象，这样就可以在
js 中操纵页面中的元素:

<img src="https://oss.itbaima.cn/internal/markdown/2023/03/06/JGkodEb31PMQ64A.gif" alt="document对象" style="margin: auto">

通过 document 对象就能够快速获取当前页面中对应的元素，并且也可以快速获取元素中的一些属性:

````js
document.getElementById("pwd").value
````

可以结合事件，来进行密码长度的校验，密码长度小于6则不合法，不合法的密码，会让密码框边框变红，首先先来编写一个css样式：

````css
.illegal-pwd {
    border: red 1px solid !important;
    box-shadow: 0 0 5px red;
}
````

来编写一下js代码，定义一个函数，此函数接受一个参数（元素本身的对象）检测输入的长度是否大于6，否则就将当前元素的class属性设定为css指定的class：

````js
function checkIllegal(e) {
    if (e.value.length < 6) {
        e.setAttribute("class", "illegal-pwd")
    } else {
        e.removeAttribute("class")
    }
}
````

最后将此函数绑定到 `oninput` 事件即可，注意传入了一个this，这里的this代表的是输入框元素本身：

````html
<input id="pwd" oninput="checkIllegal(this)" type="password">
````

在输入的时候，会自动检查密码是否合法。

### 3.7.发送XHR请求

通过使用 XMLHttpRequest 对象，来向服务器发送一个 HTTP 请求，下面是一个最简单的请求格式：

````js
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.baidu.com');
xhr.send();
````

将其绑定到一个按钮上作为事件触发：

````js
function http() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.baidu.com');
    xhr.send();
}
````

````html
<input id="button" type="button" onclick="http()">
````

可以在网络中查看发起的HTTP请求并且查看请求的响应结果，比如上面的请求，会返回百度这个页面的全部HTML代码。

在浏览器得到页面响应后，会加载当前页面，如果当前页面还引用了其他资源文件，那么会继续向服务器发起请求，直到页面中所有的资源文件全部加载完成后，才会停止。