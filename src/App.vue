<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import {} from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import config from '@/shared/config'

const route = useRoute()
const { frontmatter } = route.meta

useHead({
  meta: [
    {
      property: 'og:title',
      content: config.title
    },
    {
      property: 'og:image',
      content: config.avatar.big
    },
    {
      name: 'description',
      content: config.description
    }
  ]
})
</script>
