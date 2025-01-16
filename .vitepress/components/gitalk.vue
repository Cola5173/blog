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

// 等待 GitTalk 渲染完成后再调整样式
    this.$nextTick(() => {
      // 检查当前是否为暗黑模式
      const themeToggleButton = document.querySelector('.VPSwitch');
      const isDarkMode = themeToggleButton?.getAttribute('aria-checked') === "false";

      // 获取 Gitalk 的评论框文本区域
      const textarea = document.querySelector('.gt-container .gt-header-textarea');
      if (textarea) {
        // 根据当前模式调整样式
        if (isDarkMode) {
          // 暗黑模式下的样式
          textarea.style.color = '#fff';
          textarea.style.backgroundColor = '#333';
        } else {
          // 亮色模式下的样式
          textarea.style.color = '#000';
          textarea.style.backgroundColor = '#fff';
        }
      }
    });

    // 使用 MutationObserver 监听主题切换按钮的变化
    const themeToggleButton = document.querySelector('.VPSwitch');
    if (themeToggleButton) {
      const observer = new MutationObserver(() => {
        this.$nextTick(() => {
          const isDarkMode = themeToggleButton.getAttribute('aria-checked') === "false";
          const textarea = document.querySelector('.gt-container .gt-header-textarea');
          if (textarea) {
            if (isDarkMode) {
              textarea.style.color = '#fff';
              textarea.style.backgroundColor = '#333';
            } else {
              textarea.style.color = '#000';
              textarea.style.backgroundColor = '#fff';
            }
          }
        });
      });

      observer.observe(themeToggleButton, {
        attributes: true,
        attributeFilter: ['aria-checked']
      });

    }
  }
}
</script>
