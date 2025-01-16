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
      clientID: "Ov23likVb5bs19Ssmf2k",
      clientSecret: "7c408950cfa3ba7e83947a4e902226227b8a811e",
      repo: "blogComments",
      owner: "FKX1213",
      admin: ["FKX1213"],
      id: md5(location.pathname),
      distractionFreeMode: false,
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render("gitalk-container")

    // 根据当前模式调整 GitTalk 样式
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.querySelector('.gt-container .gt-header-textarea').style.color = '#fff';
      document.querySelector('.gt-container .gt-header-textarea').style.backgroundColor = '#333';
    } else {
      document.querySelector('.gt-container .gt-header-textarea').style.color = '#000';
      document.querySelector('.gt-container .gt-header-textarea').style.backgroundColor = '#fff';
    }

  },
}
</script>