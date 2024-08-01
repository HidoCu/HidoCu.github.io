<script setup lang="ts">
import { OnmyodamaSpin } from '@/components';
import gsap from 'gsap';

const props = defineProps<{
  duration: number;
}>();

const useSpinSelector = ref('use-spin');
const useSpin = computed(() => '.' + useSpinSelector.value);

const fadeIn = () => {
  gsap.to(useSpin.value, {
    opacity: 1,
    duration: props.duration,
    ease: 'none'
  });
}

const fadeOut = () => {
  gsap.to(useSpin.value, {
    opacity: 0,
    duration: props.duration,
    ease: 'none'
  });
}

defineExpose({ fadeOut });

onMounted(() => {
  fadeIn();
  console.log(props.duration)
});
</script>

<template>
  <div class="use-onmyodama-spin" :class="[useSpinSelector]">
    <div class="use-onmyodama-spin__inner">
      <OnmyodamaSpin />
    </div>
  </div>
</template>

<style scoped lang="scss">
.use-onmyodama-spin {
  background-color: #0009;
  position: fixed;
  inset: 0;
  opacity: 0;

  & .use-onmyodama-spin__inner {
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>