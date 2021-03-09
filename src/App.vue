<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import config from '@/shared/config'

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
    },
    {
      name: 'theme-color',
      content: '#111111'
    }
  ]
})
</script>
