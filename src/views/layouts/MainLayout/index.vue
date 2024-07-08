<script setup lang="ts">
import data from './page.json';
</script>

<template>
  <div class="main-layout-container">
    {{ data.title }}
    <RouterView />
  </div>
</template>

<style scoped lang="scss">

</style>