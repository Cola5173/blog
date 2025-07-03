<template>
  <Layout>
    <template #doc-before>
      <!-- 显示字数和阅读时间的组件 -->
      <reading-stats/>
    </template>
    <template #doc-after>
      <div v-if="initGitalkStep" id="gitalk-container"></div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import md5 from "md5"
import {useRoute} from 'vitepress'
import Theme from 'vitepress/theme'
import {ref, watch, onMounted, nextTick} from 'vue'
import Gitalk from 'gitalk'
import "gitalk/dist/gitalk.css"
import ReadingStats from "../../components/ReadingStats.vue";

const {Layout} = Theme
const route = useRoute()
// 当前加载状态
// 0 DOM 中无元素，此时调用应将元素插入到 DOM 中，等下个 step 再加载
// 1 DOM 中有元素，此时调用应用已有 DOM 元素初始化评论插件，加载后步骤完成，不需要再做什么了
// 2 插件已经加载，此时调用应是切换页面了，应删除页面中的 DOM 元素，等下个 step 再插入
const initGitalkStep = ref(0)

const initGitalk = () => {
  // 切换页面时，刷新评论组件
  switch (initGitalkStep.value) {
    case 0: // DOM 中无元素，此时调用应将元素插入到 DOM 中，等下个 step 再加载
      initGitalkStep.value = 1
      nextTick(initGitalk)
      return
    case 1: // DOM 中有元素，此时调用应用已有 DOM 元素初始化评论插件，加载后步骤完成，不需要再做什么了
      initGitalkStep.value = 2
      break
    case 2: // 插件已经加载，此时调用应是切换页面了，应删除页面中的 DOM 元素，等下个 step 再插入
      initGitalkStep.value = 0
      nextTick(initGitalk)
      return
  }

  // 创建评论组件
  const gitTalk = new Gitalk({
    // GitHub 账号 <==== 按你的实际情况修改 ====>
    owner: 'Cola5173',
    // 仓库名 <==== 按你的实际情况修改 ====>
    repo: 'blogComments',
    // 客户端 ID <==== 按你的实际情况修改 ====>
    clientID: 'Ov23likVb5bs19Ssmf2k',
    // 客户端密钥 <==== 按你的实际情况修改 ====>
    clientSecret: '7c408950cfa3ba7e83947a4e902226227b8a811e',
    // Github 账号 <==== 按你的实际情况修改 ====>
    admin: ['Cola5173'],
    // 创建 Issue 时，为 Issue 增加的标签
    // labels: [ 'GitTalk' ],
    // 如果 Issue 不存在，且登陆的是管理员账号，是否显示创建 Issue 按钮
    createIssueManually: true,
    // 创建 Issue 时，用于唯一标识这篇文章的标记
    id: md5(location.pathname),
    // 撰写评论时，给一个全屏遮罩，聚焦到评论框
    distractionFreeMode: true,
  })
  // 渲染到 DOM 元素中
  gitTalk.render('gitalk-container')
}

// 初始化和页面切换时加载评论插件
onMounted(initGitalk)
watch(
    () => route.path,
    initGitalk,
)
</script>