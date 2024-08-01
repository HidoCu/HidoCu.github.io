<script setup lang="ts">
import gsap from 'gsap';

const props = withDefaults(defineProps<{
  visible: boolean;
  className: string;
  duration?: number;
  ease?: string;
}>(), {
  duration: 1000,
  ease: 'none',
});

const emits = defineEmits(['fadeIn', 'fadeOut']);

const isVisible = ref(false);

const selector = computed(() => '.' + props.className);
const durationS = computed(() => props.duration / 1000 - 100);

const fadeIn = () => {
  isVisible.value = true;
  gsap.to(selector.value, {
    opacity: 1,
    duration: durationS.value,
    ease: props.ease,
  });
  const timeoutId = setTimeout(() => {
    emits('fadeIn');
    clearTimeout(timeoutId);
  }, props.duration);
}

const fadeOut = () => {
  gsap.to(selector.value, {
    opacity: 0,
    duration: durationS.value,
    ease: props.ease,
  });
  const timeoutId = setTimeout(() => {
    isVisible.value = false;
    emits('fadeOut')
    clearTimeout(timeoutId);
  }, props.duration);
}

watch(() => props.visible, (newV) => {
  newV ? fadeIn() : fadeOut();
});

onMounted(() => {
  console.log(selector.value)
});
</script>

<template>
  <div
      v-show="isVisible"
      class="visible-fade__container"
      :class="[className]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.visible-fade__container {
  opacity: 0;
}
</style>