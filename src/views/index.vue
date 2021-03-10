<template>
  <main>
    <section class="banner">
      <img
        class="img"
        src="https://cdn.jsdelivr.net/gh/zhixinpeng/storage/img/img_0309.jpg"
        alt="Fire"
      />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import config from '@/shared/config'

useHead({
  title: config.title,
  meta: [
    {
      property: 'og:title',
      content: config.title
    }
  ]
})
</script>

<style lang="postcss" scoped>
.banner {
  @apply w-full overflow-hidden mb-6 border-b-4 dark:border-white dark:border-opacity-5 bg-white bg-opacity-5;
}
</style>
