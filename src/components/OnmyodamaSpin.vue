<script setup lang="ts">
import { Onmyodama } from '@/components/icons';
import gsap from 'gsap';

const props = withDefaults(defineProps<{
  iconSize?: number;
  needText?: boolean,
  text?: string;
  textSub?: string;

}>(), {
  iconSize: 120,
  needText: true,
  text: '少女祈祷中',
  textSub: 'Now Loading...',
});

const loadingText = computed(() => props.text.split(''));
const loadingTextSub = computed(() => props.textSub.split(''));

const registerOnmyodamaAnimation = (selector: string) => {
  gsap.to(selector, {
    rotate: 360,
    repeat: -1,
    duration: 2,
    ease: 'none'
  });
}

const registerTextAnimation = (selector: string) => {
  const tl = gsap.timeline({
    repeat: -1,
    delay: .5,
  });
  tl.to(selector, {
    opacity: .5,
    duration: .6,
  }).to(selector, {
    opacity: 1,
    duration: 1,
  })
}

onMounted(() => {
  registerOnmyodamaAnimation('.od-spin__onmyodama');
  registerTextAnimation('.od-spin__text');
});
</script>

<template>
  <div class="onmyodama-spin__container">
    <div class="od-spin__onmyodama">
      <Onmyodama luminescence :size="iconSize" />
    </div>
    <div v-show="needText" class="od-spin__text">
      <section class="od-spin__text text-main">
        <span
            class="text-char"
            v-for="(char, index) in loadingText"
            :key="index"
            :class="[`text-char-${index}`]">
          {{ char }}
        </span>
      </section>
      <section class="od-spin__text text-sub">
        <span
            class="text-char"
            v-for="(char, index) in loadingTextSub"
            :key="index"
            :class="[`text-char-${index}`]">
          {{ char }}
        </span>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.onmyodama-spin__container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .od-spin__onmyodama {
    order: 1;
  }

  & .od-spin__text {
    & .od-spin__text {
      @include useMrtFont();
      color: #fff;

      &.text-main {
        font-size: 40px;
        text-shadow:
            #db523f 0 0 10px,
            #db523f 0 0 10px,
            #db523f 0 0 10px;
      }

      &.text-sub {
        font-size: 28px;
        padding-left: 80px;
        text-shadow:
            #3478ba 0 0 5px,
            #3478ba 0 0 5px;
      }
    }
  }
}
</style>