<template>
  <main class="flex justify-between container md:mx-auto box-border px-4 md:mt-16 mt-4">
    <Article v-if="isUserArticle" :frontmatter="frontmatter"><slot></slot></Article>
    <Page v-else :frontmatter="frontmatter"><slot></slot></Page>
  </main>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { isArticle } from '@/shared/index'

const route = useRoute()
console.log(route)
const isUserArticle = isArticle(route)
const { frontmatter } = defineProps<{ frontmatter: any }>()
</script>

<style lang="postcss" scoped></style>
