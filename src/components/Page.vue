<template>
  <section class="page-detail flex justify-start flex-col flex-1 md:w-auto w-full overflow-hidden">
    <div v-if="title" class="prose m-auto mb-8">
      <h1 class="md:text-3xl text-xl mb-0">
        {{ title }}
      </h1>
      <p v-if="desc" class="opacity-50 mt-1 italic">
        {{ desc }}
      </p>
    </div>
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import config from '@/shared/config'
import { useHead } from '@vueuse/head'

const { frontmatter } = defineProps<{ frontmatter: any }>()
const { title, desc, keywords } = frontmatter
const meta = [
  {
    property: 'og:title',
    content: `${title} - ${config.title}`
  },
  {
    name: 'description',
    content: desc
  }
]

if (keywords) {
  meta.push({ name: 'keywords', content: keywords })
}

useHead({
  title: `${title} - ${config.title}`,
  meta
})
</script>

<style lang="postcss" scoped>
@media (min-width: 1280px) {
  .page-detail {
    img {
      max-width: 1000px;
    }
  }
}
</style>
