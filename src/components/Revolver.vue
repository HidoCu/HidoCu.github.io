<script setup lang="ts">
import gsap from 'gsap';

interface IGsapKeyframe {
  rotate: number,
  delay: number,
  ease?: string,
}

const props = withDefaults(defineProps<{
  images: string[],
  size?: number
}>(), {
  size: 120,
});

const portSize = computed(() => props.size + 'px');
const imgCount = computed(() => props.images.length);

const calcCenterR = (r: number, n: number) => {
  if (n === 1) {
    return r;
  }
  if (n === 2) {
    return r;
  }
  const angle = Math.PI / n;
  const R = r / Math.sin(angle);
  return parseInt(R.toFixed(2));
}

const positionOrigin = ref(calcCenterR(props.size / 2, props.images.length));
const positionOriginPx = computed(() => props.size / 2 + positionOrigin.value + 'px');

const calcKeyFrames = (time: number, delay = 1) => {
  const keyframesList: IGsapKeyframe[] = [];
  for (let i = 1; i <= time; i++) {
    keyframesList.push({
      rotate: 360 / time * i,
      delay,
      ease: 'expo.inOut'
    });
  }
  return keyframesList;
}

const rotateAnimation = (selector: string) => {
  const keyFrameList = calcKeyFrames(imgCount.value, 2);

  gsap.to(selector, {
    keyframes: keyFrameList,
    // ease: 'expo.inOut',
    repeat: -1,
  });
}

onMounted(() => {
  rotateAnimation('.revolver__roulette');
});
</script>

<template>
  <div class="revolver-container">
    <div class="revolver__roulette">
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
</template>

<style scoped lang="scss">
.revolver-container {
  --revolver-size: v-bind(portSize);
  --revolver-item-count: v-bind(imgCount);
  --revolver-container-r: v-bind(positionOriginPx);
  --revolver-container-size: calc(var(--revolver-container-r) * 2);

  width: var(--revolver-size);
  height: var(--revolver-size);
  background-color: aqua;
  border-radius: 50%;
  display: flex;
  justify-content: center;

  overflow: hidden;

  & .revolver__roulette {
    width: var(--revolver-container-size);
    height: var(--revolver-container-size);
    border-radius: 50%;

    & .revolver__img-list {
      position: relative;
      width: 100%;
      height: 100%;

      & .revolver__img-item {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%) rotate(calc(
            360deg / var(--revolver-item-count) * var(--i)
        ));
        transform-origin: 50% var(--revolver-container-r);

        width: var(--revolver-size);
        height: var(--revolver-size);
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
}
</style>