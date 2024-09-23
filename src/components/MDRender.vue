<script setup lang="ts">
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';

const props = withDefaults(defineProps<{
  source?: string,
}>(), {
  source: '',
});

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (mdStr, lang): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const codeInfo = hljs.highlight(mdStr, {
          language: lang,
          ignoreIllegals: true
        });
        return `<div class="md-code"><pre class="hljs md-code-pre"><code>${codeInfo.value}</code></pre></div>`;
      } catch (e) {
        console.error(e);
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(mdStr)}</code></pre>`;
  },
});

const mdContentHtml = computed(() => md.render(props.source));
</script>

<template>
  <div class="md-container">
    <div class="md-content" v-html="mdContentHtml"></div>
  </div>
</template>

<style scoped lang="scss">
.md-container {

  .md-content {
    padding: 10px 20px;

    // 基础样式
    --fs: 18px;
    font-size: var(--fs);
    line-height: calc(2 * var(--fs));
  }
}
</style>