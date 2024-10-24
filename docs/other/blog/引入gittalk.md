# 引入gittalk功能

应一位朋友的邀请，引入gittalk功能，可以进行互动。撸起袖子加油干，不会就学。

## 1.注册应用

进入Github，进入个人设置Settings，最下方Developer settings，点击：OAuth Apps，点击：New OAuth App

<img src="./imgs/引入gittalk/img.png" alt="配置图" style="display: block; margin: 0 auto; zoom: 30%">

创建一个，此刻获取到clientID和clientSecret

## 安装依赖

在博客的终端控制台，输入命令：
```shell
npm install md5 gitalk
```
<img src="./imgs/引入gittalk/img_1.png" alt="安装依赖图" style="display: block; margin: 0 auto; zoom: 40%">

## 新增配置

新增 `.vitepress/components/gitalk.vue` ，默认gitalk存在黑色模式下字体白色，背景色也是白色，导致看不见字体，所以样式里设置一下：

```vue:line-numbers
<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
import md5 from "md5"
import Gitalk from "gitalk"
import "gitalk/dist/gitalk.css"

export default {
  name: "gitalk",
  data() {
    return {}
  },
  mounted() {
    const commentConfig = {
      clientID: "你的clientID",
      clientSecret: "你的clientSecret",
      repo: "仓库.github.io",
      owner: "名称",
      admin: ["名称"],
      id: md5(location.pathname),
      distractionFreeMode: false,
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render("gitalk-container")
  },
}
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>
```

编辑 `.vitepress/theme/index.ts`

```ts
import DefaultTheme from 'vitepress/theme';
import './custom.css';
// @ts-ignore
import comment from "../components/gitalk.vue";// 引入这一段

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component("gitalk", comment)// 引入这一段
  },
};
```

## 使用：

在需要的Markdown里使用 `<gitalk/>` 开启评论

<gitalk/>