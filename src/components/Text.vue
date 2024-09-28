<script lang="ts" setup>
import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import mdKatex from 'markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import {copyToClip} from '../js/copy'
import 'katex/dist/katex.min.css'

interface Props {
  text?: string
}

const props = defineProps<Props>()


const textRef = ref<HTMLElement>()

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {

    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })


const text = computed(() => {
  let value = props.text ?? ''
    value = value.replace(/\\\( *(.*?) *\\\)/g, '$$$1$$');
    value = value.replace(/\\\[ *(.*?) *\\\]/g, '$$$$$1$$$$');
    value= value.replace('\\[',"$$$$")
    value= value.replace('\\]',"$$$$")   
    return mdi.render(value)
})
function highlightBlock(str: string, lang?: string) {
    console.log(lang)
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

function addCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.parentElement?.nextElementSibling?.textContent
        if (code) {
          copyToClip(code).then(() => {
            btn.textContent = '复制成功'
            setTimeout(() => {
              btn.textContent = '复制代码'
            }, 1000)
          })
        }
      })
    })
  }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.removeEventListener('click', () => {})
    })
  }
}

onMounted(() => {
  addCopyEvents()
})

onUpdated(() => {
  addCopyEvents()
})

onUnmounted(() => {
  removeCopyEvents()
})
</script>

<template>
      <div class="markdown-body"  style="--color-canvas-default:rgba(128, 128, 128, 0.2)"  v-html="text" />
</template>

<style lang="less">
@import url(../style/style.less);
@import url(../style/highlight.less);
@import url(../style/github-markdown.less);

</style>