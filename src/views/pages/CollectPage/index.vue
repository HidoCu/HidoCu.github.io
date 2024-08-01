<script setup lang="ts">
import data from './page.json';

onMounted(() => {
  console.log('done')
});
</script>

<template>
  <div class="collect-container">
    {{ data.title }}
  </div>
</template>

<style scoped lang="scss">

</style>