<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
