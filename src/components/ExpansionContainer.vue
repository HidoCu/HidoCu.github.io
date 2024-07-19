<script setup lang="ts">
const innerRef = ref<HTMLDivElement | null>(null);
const slotClientH = ref(0);

// TODO 容器0到auto高度渐变，等用到的时候再来补

onMounted(() => {});
</script>

<template>
  <div class="ex__outer">
    <div class="ex__inner" ref="innerRef">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>