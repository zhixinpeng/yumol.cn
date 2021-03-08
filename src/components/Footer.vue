<template>
  <footer class="flex justify-center items-center w-full h-36 opacity-70 md:text-sm text-xs">
    <span>© {{ year }} {{ name }}</span>
    <br v-if="isMobile" />
    <a
      class="md:ml-12 ml-2"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {{ icp }}
    </a>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { isMobile } from '@/shared/index'
import config from '@/shared/config'

const year: number = new Date().getFullYear()
const name = ref<string>(config.name)
const icp = ref<string>(config.icp)
</script>
