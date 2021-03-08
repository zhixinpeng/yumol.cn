<template>
  <main>
    <section class="banner">
      <img
        class="img"
        src="https://cdn.jsdelivr.net/gh/zhixinpeng/storage/img/pexels-jonas.jpg"
        alt="Fire"
      />
    </section>
  </main>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.banner {
  filter: brightness(0.5) blur(2px);
  @apply w-full overflow-hidden mb-6 border-b-4 dark:border-white dark:border-opacity-5 bg-white bg-opacity-5;
}
</style>
