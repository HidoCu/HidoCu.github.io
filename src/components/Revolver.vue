<script setup lang="ts">
import gsap from 'gsap';
import { v4 as uuidv4 } from 'uuid';

const props = withDefaults(defineProps<{
  images: string[];
  size?: number;
  borderSize?: number;
  delay?: number;
  duration?: number;
  backgroundColor?: string,
  borderColor?: string,
}>(), {
  size: 120,
  borderSize: 6,
  delay: 4,
  duration: 2,
  backgroundColor: 'linear-gradient(to top, #37ecba 0%, #72afd3 100%)',
  borderColor: 'linear-gradient(180deg, #2af598 0%, #009efd 100%)',
});

const imgCount = computed(() => props.images.length);
const portSize = computed(() => props.size + 'px');
const portBorderSize = computed(() => props.borderSize + 'px');

const calcCenterR = (r: number, n: number) => {
  if (n === 1) {
    return r;
  }
  if (n === 2) {
    return 2 * r;
  }
  const angle = Math.PI / n;
  const R = r / Math.sin(angle);
  return parseInt(R.toFixed(2));
}

const positionOrigin = ref(calcCenterR(props.size / 2, imgCount.value));
const positionOriginPx = computed(() => props.size / 2 + positionOrigin.value + 'px');

const rotateAnimation = (selector: string) => {
  gsap.to(selector, {
    keyframes: props.images.map((_, index) => {
      const rotate = 360 / imgCount.value * (index + 1);
      return {
        delay: props.delay,
        duration: props.duration,
        ease: 'expo.inOut',
        rotate,
      }
    }),
    repeat: -1,
  });
}

const uuid = uuidv4();

onMounted(() => {
  rotateAnimation('.revolver-' + uuid);
});
</script>

<template>
  <div class="revolver-box">
    <div class="revolver-container">
      <div class="revolver__roulette" :class="`revolver-${uuid}`">
        <ul class="revolver__img-list">
          <li
              class="revolver__img-item"
              v-for="(imgUrl, index) in images"
              :key="index"
              :style="{ '--i': index }">
            <img
                class="common-image cover"
                :src="imgUrl"
                alt="fumo" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.revolver-box {
  --revolver-size: v-bind(portSize);
  --revolver-item-count: v-bind(imgCount);
  --revolver-container-r: v-bind(positionOriginPx);
  --revolver-container-size: calc(var(--revolver-container-r) * 2);

  --revolver-border-size: v-bind(portBorderSize);
  --revolver-box-size: calc(var(--revolver-size) + var(--revolver-border-size) * 2);

  width: var(--revolver-box-size);
  height: var(--revolver-box-size);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: v-bind(borderColor);

  .revolver-container {
    width: var(--revolver-size);
    height: var(--revolver-size);

    background: v-bind(backgroundColor);
    border-radius: 50%;
    display: flex;
    justify-content: center;

    overflow: hidden;

    .revolver__roulette {
      width: var(--revolver-container-size);
      height: var(--revolver-container-size);
      border-radius: 50%;

      .revolver__img-list {
        position: relative;
        width: var(--revolver-container-size);
        height: var(--revolver-container-size);
        border-radius: 50%;

        .revolver__img-item {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) rotate(calc(
              360deg / var(--revolver-item-count) * var(--i)
          ));
          transform-origin: 50% var(--revolver-container-r);

          --revolver-border-width: 6px;
          --revolver-img-size: calc(var(--revolver-size) + var(--revolver-border-width) * 2);

          width: var(--revolver-size);
          height: var(--revolver-size);

          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
