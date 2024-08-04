<script setup lang="ts">
import gsap from 'gsap';

const props = withDefaults(defineProps<{
  images: string[];
  size?: number;
  borderSize?: number;
  delay?: number;
  duration?: number;
}>(), {
  size: 120,
  borderSize: 6,
  delay: 4,
  duration: 2,
});

const portSize = computed(() => props.size + 'px');
const portBorderSize = computed(() => props.borderSize + 'px');

const imgCount = computed(() => props.images.length);

const calcCenterR = (r: number, n: number) => {
  if ([1, 2].includes(n)) {
    return r;
  }
  const angle = Math.PI / n;
  const R = r / Math.sin(angle);
  return parseInt(R.toFixed(2));
}

const positionOrigin = ref(calcCenterR(props.size / 2, props.images.length));
const positionOriginPx = computed(() => props.size / 2 + positionOrigin.value + 'px');

const calcKeyFrames = (times: number, gsapKeyframesConfig: GSAPTweenVars) => {
  const keyframesList: GSAPTweenVars[] = [];
  for (let i = 1; i <= times; i++) {
    keyframesList.push({
      ...gsapKeyframesConfig,
      rotate: -360 / times * i,
    });
  }
  return keyframesList;
}

const rotateAnimation = (selector: string) => {
  const keyFrameList = calcKeyFrames(imgCount.value, {
    delay: props.delay,
    duration: props.duration,
    ease: 'expo.inOut'
  });
  gsap.to(selector, {
    keyframes: keyFrameList,
    repeat: -1,
  });
}

onMounted(() => {
  rotateAnimation('.revolver__roulette');
});
</script>

<template>
  <div class="revolver-box">
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

  background-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%);

  .revolver-container {
    width: var(--revolver-size);
    height: var(--revolver-size);

    background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
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
