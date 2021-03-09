<template>
  <section class="flex flex-1 flex-col">
    <!-- 文章列表 -->
    <ul class="article-list md:mx-0 mx-4">
      <li
        class="flex flex-col md:pb-8 pb-4 md:mb-8 mb-4 border-b dark:border-white dark:border-opacity-5"
        v-for="(item, index) in articleList"
        :key="index"
      >
        <router-link class="md:mb-4 mb-2" :title="item.title" :to="item.path">
          <h2 class="md:text-2xl text-lg line-clamp-2">{{ item.title }}</h2>
        </router-link>
        <div class="flex md:flex-row flex-col">
          <div
            v-if="item.cover"
            class="flex flex-shrink-0 md:w-40 w-full md:h-32 h-auto overflow-hidden md:mr-4 mr-0 md:mb-0 mb-2 rounded"
          >
            <router-link :title="item.title" :to="item.path">
              <img class="img" :src="item.cover" :alt="item.title"
            /></router-link>
          </div>
          <div class="flex flex-col justify-between">
            <p
              class="md:h-auto h-0 md:text-base text-sm text-gray-400 md:mb-4 mb-0 md:line-clamp-3 line-clamp-2"
            >
              {{ item.desc }}
            </p>
            <p class="md:text-sm text-xs text-gray-400" :title="item.date.substr(0, 10)">
              {{ item.diffDays > 7 ? item.date.substr(0, 10) : item.dateAgo }}
            </p>
          </div>
        </div>
      </li>
    </ul>

    <!-- 分页器 -->
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { isDev, isArticle, dateDisplay } from '@/shared/index'

interface List {
  path: string
  title: string
  desc: string
  cover: string
  date: string
  diffDays: number
  dateAgo: string
}

const route = useRoute()
const router = useRouter()
const routes = ref<RouteRecordRaw[]>([])
const articleList = ref<List[]>([])
const articleTotal = ref<number>(1)
const pageTotal = ref<number>(1)
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)

// 获取分页信息
const getPageInfo = () => {
  routes.value = router
    .getRoutes()
    .filter((item) => {
      const IS_VALID_SUFFIX: boolean = isDev
        ? !item.path.endsWith('.html')
        : item.path.endsWith('.html')
      return isArticle(item) && IS_VALID_SUFFIX
    })
    .sort(
      (a, b) =>
        +new Date((b.meta.frontmatter as any).date) - +new Date((b.meta.frontmatter as any).date)
    )

  // 获取文章总数
  const ROUTES_COUNT: number = routes.value.length
  articleTotal.value = ROUTES_COUNT

  // 获取页码总数
  pageTotal.value = Math.ceil(ROUTES_COUNT / pageSize.value)

  // 获取页码信息
  if (route.params.page && !isNaN(Number(route.params.page))) {
    currentPage.value = Number(route.params.page)
    if (currentPage.value > pageTotal.value) {
      router.replace({ path: '/404' })
    }
  }

  // 获取文章列表
  getArticleList()
}

const getArticleList = () => {
  const START: number = 0 + pageSize.value * (currentPage.value - 1)
  const END: number = START + pageSize.value
  const CUR_ROUTES = routes.value.slice(START, END)

  articleList.value = CUR_ROUTES.map((route) => {
    const { path } = route
    const { frontmatter } = route.meta as any
    const { title, desc, cover, date } = frontmatter
    const { diffDays, dateAgo } = dateDisplay(date)

    return {
      path,
      title,
      desc,
      cover,
      date,
      diffDays,
      dateAgo
    }
  })
}

getPageInfo()
</script>
