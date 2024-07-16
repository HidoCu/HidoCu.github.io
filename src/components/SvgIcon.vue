<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string;
  color?: string;
  size?: number | string;
}>(), {
  color: '',
  size: 14
});

const iconName= computed(() => `#${props.name}`);
const svgClass = computed(() => props.name ? `svg-icon ${props.name}` : 'svg-icon');
</script>

<template>
  <svg
      :class="svgClass"
      :style="{
        width: size + 'px',
        height: size + 'px',
      }">
    <use :href="iconName" :fill="color" />
  </svg>
</template>

<style scoped lang="scss">
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
}
</style>