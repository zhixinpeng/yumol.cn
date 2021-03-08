<template>
  <main class="page-404 prose">
    <h1>404 Not Found</h1>
    <p>
      如何使您以前收藏的链接被移除了，请提
      <a
        href="https://github.com/zhixinpeng/yumol.cn/issues/new"
        target="_blank"
        rel="nofollow noopener noreferrer"
        >issue</a
      >联系我。
    </p>
    <p>将在 {{ seconds }}s 后返回首页...</p>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { isClient } from '@vueuse/core'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import config from '@/shared/config'

const router = useRouter()
const seconds = ref<number>(10)

if (isClient) {
  const countdown: NodeJS.Timeout = setInterval(() => {
    if (seconds.value === 1) {
      clearInterval(countdown)
      router.push({
        name: 'index'
      })
      return false
    }

    seconds.value--
  }, 1000)

  onBeforeRouteLeave(() => {
    clearInterval(countdown)
  })
}

useHead({
  title: `404 - ${config.title}`,
  meta: [
    {
      property: 'og:title',
      content: config.title
    }
  ]
})
</script>

<style lang="postcss" scoped>
.page-404 {
  height: 65vh;
  max-height: 65vh;
  @apply flex flex-col items-center container mx-auto md:mt-16 mt-4 md:px-0 px-4;
}
</style>
