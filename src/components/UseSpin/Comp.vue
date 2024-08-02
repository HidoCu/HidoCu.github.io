<script setup lang="ts">
import { OnmyodamaSpin } from '@/components';

const props = withDefaults(defineProps<{
  duration: number;
  mask: boolean;
}>(), {});

const animeDuration = computed(() => props.duration + 's');

const spinShow = ref(false);

const fadeIn = () => {
  spinShow.value = true;
}

const fadeOut = () => {
  spinShow.value = false;
}

defineExpose({ fadeOut });

onMounted(() => {
  fadeIn();
});
</script>

<template>
  <Transition name="fade">
    <div
        v-show="spinShow"
        class="onmyodama-container"
        :class="{ mask }">
      <div class="onmyodama-rotate">
        <OnmyodamaSpin />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.onmyodama-container {
  position: fixed;
  inset: 0;
  z-index: 1000;

  &.mask {
    background-color: #0009;
  }

  & .onmyodama-rotate {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

%transition-animation {
  transition: all v-bind(animeDuration) linear;
}

// 进入起始态
.fade-enter-from {
  opacity: 0;
}

// 进入中
.fade-enter-active {
  @extend %transition-animation;
}

// 进入结束态
.fade-enter-to {
  opacity: 1;
}

// 离开起始态
.fade-leave-from {
  opacity: 1;
}

// 离开中
.fade-leave-active {
  @extend %transition-animation;
}

// 离开结束态
.fade-leave-to {
  opacity: 0;
}
</style>