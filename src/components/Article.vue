<template>
  <section
    class="article-detail flex justify-start flex-col flex-1 md:w-auto w-full overflow-hidden"
  >
    <!-- 标题 -->
    <h1 class="flex items-center w-full md:text-3xl text-xl md:mb-4 mb-2">{{ title }}</h1>
    <!-- 发布信息 -->
    <p
      class="flex items-center w-full text-sm text-gray-400 md:mb-8 mb-4 md:pb-8 pb-4 border-b dark:border-white dark:border-opacity-5"
    >
      <span class="mr-8">作者：彭智鑫</span>
      <span :title="date.substr(0, 10)"> {{ diffDays > 7 ? date.substr(0, 10) : dateAgo }}</span>
    </p>
    <!-- 过期提示 -->
    <p
      v-if="diffDays > 365"
      class="flex justify-center items-center w-full p-4 md:mb-8 mb-4 bg-gray-50 dark:bg-white dark:bg-opacity-5 rounded text-gray-600 dark:text-gray-300 text-sm"
    >
      本文最后更新于 {{ diffDays }} 天前，部分内容可能不适合当前所有情况，仅供参考。
    </p>
    <!-- 内容插槽 -->
    <slot></slot>
  </section>

  <!-- 侧边栏 -->
  <Sidebar></Sidebar>
</template>

<script lang="ts" setup>
import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isClient } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { dateDisplay } from '@/shared/index'
import config from '@/shared/config'
import isMobile from '@/shared/isMobile'

const router = useRouter()
const { frontmatter } = defineProps<{ frontmatter: any }>()
const { title, desc, keywords, date } = frontmatter
const { diffDays, dateAgo } = dateDisplay(date)

// 设置页面信息
useHead({
  title: isMobile.value ? title : `${title} - ${config.title}`,
  meta: [
    {
      property: 'og:title',
      content: `${title} - ${config.title}`
    },
    {
      name: 'description',
      content: desc
    },
    {
      name: 'keywords',
      content: keywords
    }
  ]
})

// 页面加载时定位到对应的锚点
const navigateToId = () => {
  if (!isClient) return false

  router
    .isReady()
    .then(() => {
      setTimeout(() => {
        const { hash } = document.location
        if (hash.length > 1) {
          const id: string = decodeURIComponent(hash.substring(1))
          const element: HTMLElement | null = document.getElementById(id)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth'
            })
          }
        }
      }, 500)
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(navigateToId)
</script>

<style lang="postcss" scoped>
@media (min-width: 1280px) {
  .article-detail {
    .article-toc {
      display: none;
    }
  }
}
</style>
