<script setup lang="ts">
import { Onmyodama } from '@/components/icons';
import gsap from 'gsap';

const props = withDefaults(defineProps<{
  text?: string;
  textSub?: string;
}>(), {
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

const registerTextAnimation = (selector: string, opacity = .4) => {
  gsap.timeline({
    repeat: -1
  }).from(selector, {
    opacity,
    duration: 1,
  }).to(selector, {
    opacity,
    duration: .5
  });
}

onMounted(() => {
  registerOnmyodamaAnimation('.od-spin__onmyodama');
  registerTextAnimation('.od-spin__text');
});
</script>

<template>
  <div class="onmyodama-spin__container">
    <div class="od-spin__onmyodama">
      <Onmyodama luminescence :size="120" />
    </div>
    <div class="od-spin__text">
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