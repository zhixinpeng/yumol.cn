<template>
  <section class="article-sidebar lg:flex hidden flex-col flex-shrink-0 ml-16">
    <!-- 文章目录 -->
    <section class="mb-16" v-if="isShowToc">
      <h2 class="block-title">文章目录</h2>
      <div class="flex flex-col w-full">
        <div class="article-toc-container"></div>
      </div>
    </section>

    <!-- 热门栏目 -->
    <section class="mb-16">
      <h2 class="block-title">热门栏目</h2>
      <div class="flex flex-col w-full">
        <a href="https://vue3.chengpeiquan.com/" target="_blank">
          <img
            class="w-full"
            src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/01/1-1.jpg"
            alt="Vue3.0学习教程与实战案例"
          />
        </a>
      </div>
    </section>

    <!-- 猜你喜欢 -->
    <section class="mb-8" v-if="articleList.length > 0">
      <div class="block-title flex justify-between items-center">
        <h2>猜你喜欢</h2>
        <span class="text-base font-normal cursor-pointer select-none" @click="getArticleList">
          换一换
        </span>
      </div>
      <ul>
        <li class="flex mb-8" v-for="(item, index) in articleList" :key="index">
          <div v-if="item.cover" class="flex flex-shrink-0 w-16 h-12 overflow-hidden mr-4 rounded">
            <router-link :title="item.title" :to="item.path">
              <img class="img" :src="item.cover" :alt="item.title" />
            </router-link>
          </div>
          <router-link class="flex flex-1 line-clamp-2" :title="item.title" :to="item.path">
            <h2 class="article-title text-base">{{ item.title }}</h2>
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts" setup>
import isMobile from '@/shared/isMobile'
import { isArticle, isDev, shuffle } from '@/shared/index'
import { isClient } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface List {
  path: string
  title: string
  cover: string
}

const isShowToc = ref<boolean>(false)
const articleList = ref<List[]>([])
const router = useRouter()
const activeRoute = useRoute()
const count: number = 5

const getArticleList = () => {
  const routes = router.getRoutes().filter((route) => {
    const IS_VALID_SUFFIX: boolean = isDev
      ? !route.path.endsWith('.html')
      : route.path.endsWith('.html')
    return isArticle(route) && IS_VALID_SUFFIX && route.path !== activeRoute.path
  })

  articleList.value = shuffle(routes).map((route) => {
    const { path } = route
    const { frontmatter } = route.meta
    const { title, cover } = frontmatter
    return { path, title, cover }
  })

  if (articleList.value.length > count) {
    articleList.value.length = count
  }
}

getArticleList()

// 提取生成目录到侧边栏
const moveToc = () => {
  if (!isClient || isMobile.value) {
    return false
  }

  // 获取文章内目录
  const toc: HTMLElement | null = document.querySelector('.article-toc')
  if (!toc) {
    isShowToc.value = false
    return false
  }

  // 显示目录并插入内容
  isShowToc.value = true
  setTimeout(() => {
    const tocContainer: HTMLElement | null = document.querySelector('.article-toc-container')
    tocContainer && tocContainer.appendChild(toc)
  }, 10)

  // 把文章内的目录移除
  const content: HTMLElement | null = document.querySelector('.article-content')
  content && content.childNodes[0].remove()
}

onMounted(moveToc)
</script>

<style lang="postcss" scoped>
.article-sidebar {
  width: 340px;
}
.block-title {
  @apply text-xl font-bold mb-4 pb-4 border-b dark:border-white dark:border-opacity-5;
}
.article-title {
  text-align: justify;
}
</style>
