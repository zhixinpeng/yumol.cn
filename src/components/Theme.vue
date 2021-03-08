<template>
  <a class="select-none text-xl" :title="`切换到${isDark ? '普通' : '暗黑'}模式`" @click="toggleTheme">
    <ri-moon-line v-show="isDark"></ri-moon-line>
    <ri-sun-line v-show="!isDark"></ri-sun-line>
  </a>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>
