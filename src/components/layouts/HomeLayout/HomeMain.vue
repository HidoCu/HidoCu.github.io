<script setup lang="ts">
import { MDRender } from '@/components';

const props = withDefaults(defineProps<{
  mainContent: string,
}>(), {
  mainContent: '',
});
</script>

<template>
  <div class="home-main">
    <MDRender :source="mainContent" />
  </div>
</template>

<style scoped lang="scss">
.home-main {}
</style>
