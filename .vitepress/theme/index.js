// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
// @ts-ignore
import comment from "../components/gitalk.vue"

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 使用 slot 插槽控制内容渲染顺序
      'doc-after': () => h('div', [
        // 渲染 Gitalk 评论组件
        h('git-talk')
      ])
    })
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component("git-talk", comment)
  },
}
