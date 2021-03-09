<template>
  <a
    v-if="scrollTop > 100"
    class="fixed md:right-12 right-6 md:bottom-12 bottom-6 text-2xl select-none transform rotate-90"
    @click="scrollToTop"
  >
    <ic-twotone-arrow-back-ios></ic-twotone-arrow-back-ios>
  </a>
</template>

<script lang="ts" setup>
import { isClient } from '@vueuse/core'
import { ref } from 'vue'

const scrollTop = ref<number>(0)

if (isClient) {
  window.addEventListener('scroll', () => {
    scrollTop.value = document.documentElement.scrollTop
  })
}

const scrollToTop = () => {
  if (isClient) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>
