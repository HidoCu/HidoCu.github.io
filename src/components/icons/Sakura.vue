<script setup lang="ts">
import type { TIntRange } from '@/types/type-utils';

const props = withDefaults(defineProps<{
  size?: number;
  fillColor?: string;
  opacity?: TIntRange<0, 101>;
  serial?: number | string;
  debug?: boolean;
}>(), {
  size: 100,
  fillColor: '#e89abe',
  opacity: 100,
  debug: false,
});

const opacityCpt = computed(() => props.opacity / 100);

defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="sakura__container" :style="{ opacity: opacityCpt }">
    <div class="sakura__svg-container">
      <svg
          t="1721634297860"
          class="icon"
          viewBox="0 0 1049 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4390"
          :width="size"
          :height="size">
        <path
            d="M525.58396628 573.34694353s268.83106938-2.62915481 309.36387092 193.24287089l-76.46458293 21.90962291 12.92667757 84.13295086a214.05701289 214.05701289 0 0 1-96.84053193-4.82011663A224.79272784 224.79272784 0 0 1 525.58396628 578.38615666z"
            :fill="fillColor"
            p-id="4391">
        </path>
        <path
            d="M552.75189802 512.4381922s131.45773592-233.7756732 321.63325979-170.89505575L854.2283053 418.66500728l79.31283344 30.89256828a215.59068679 215.59068679 0 0 1-52.58309388 81.50379604 224.57363215 224.57363215 0 0 1-325.35789552-14.67944718z"
            :fill="fillColor"
            p-id="4392">
        </path>
        <path
            d="M508.49446078 494.0341093S317.00435871 306.48774025 426.77156822 139.31731943l69.4535037 38.78003191L547.4935884 109.30113636a214.05701289 214.05701289 0 0 1 65.72886796 71.86356201 225.01182435 225.01182435 0 0 1-98.37420505 310.67844912z"
            :fill="fillColor"
            p-id="4393">
        </path>
        <path
            d="M473.21996809 525.58396628S242.2925454 661.64272234 109.30113636 512.4381922l55.43134521-57.18411482-53.45947909-65.72886795a213.61882069 213.61882069 0 0 1 86.32391269-43.81924506 224.79272784 224.79272784 0 0 1 274.527572 175.27698099z"
            :fill="fillColor"
            p-id="4394">
        </path>
        <path
            d="M481.76472043 566.55496s72.0826585 258.31445093-106.4807652 348.14390364l-40.31370582-68.13892627-78.21735252 34.17901099a212.30424328 212.30424328 0 0 1-20.15685331-94.64956933 224.57363215 224.57363215 0 0 1 241.00584894-219.09622602z"
            :fill="fillColor"
            p-id="4395">
        </path>
      </svg>
    </div>
    <div v-if="debug" class="debug-serial">{{ serial }}</div>
  </div>
</template>

<style scoped lang="scss">
.sakura__container {
  position: relative;

  & .debug-serial {
    color: aqua;
    font-size: 48px;
    font-weight: 600;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>