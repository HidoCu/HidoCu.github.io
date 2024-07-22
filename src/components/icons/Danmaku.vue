<script setup lang="ts">
import { getColorByPreset, type TPreset } from '@/components/icons/colors';

const props = withDefaults(defineProps<{
  size?: number;
  color?: string | TPreset;
  luminescence?: boolean;
}>(), {
  size: 80,
  color: '#f00',
  luminescence: false,
});

const bgColor = computed(() => getColorByPreset(props.color));
const size = computed(() => Math.abs(props.size) + 'px');
</script>

<template>
  <div class="danmaku__container"></div>
</template>

<style scoped lang="scss">
.danmaku__container {
  --danmaku-size: v-bind(size);
  --danmaku-color: v-bind(bgColor);

  width: var(--danmaku-size);
  height: var(--danmaku-size);
  border-radius: 50%;
  background: radial-gradient(circle,
      rgba(255,255,255,1) 0%,
      rgba(255,255,255,1) 10%,
      #{var(--danmaku-color)} 40%,
      #fff0 70%
  );
}
</style>