<script setup lang="ts">

</script>

<template>
  <Transition name="comp" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped lang="scss">
%transition-animation {
  transition: all .1s linear;
}

// 进入起始态
.comp-enter-from {
  transform: scale(1.1);
  opacity: 0;
}

// 进入中
.comp-enter-active {
  @extend %transition-animation;
}

// 进入结束态
.comp-enter-to {
  transform: scale(1);
  opacity: 1;
}

// 离开起始态
.comp-leave-from {
  transform: scale(1);
  opacity: 1;
}

// 离开中
.comp-leave-active {
  @extend %transition-animation;
}

// 离开结束态
.comp-leave-to {
  transform: scale(.9);
  opacity: 0;
}
</style>