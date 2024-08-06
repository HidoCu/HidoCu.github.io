<script setup lang="ts">
import gsap from 'gsap';

const props = withDefaults(defineProps<{
  size?: number;
  hidden?: boolean;
}>(), {
  size: 44,
  hidden: false,
});

const buttonSize = computed(() => props.size + 'px');

const animationClass = ref('h5-fix-button');
const animationSelector = computed(() => '.' + animationClass.value);

const setStandby = (selector: string, wait = 3) => {
  gsap.to(selector, {
    opacity: .5,
    delay: wait
  });
}

const setActive = (selector: string) => {
  gsap.to(selector, {
    x: 0,
    opacity: 1,
    duration: .3
  });
}

const activeAnimation = (selector: string) => {
  gsap.to(selector, {
    opacity: 1,
    duration: .3
  });
}

const permanentAnimation = (selector: string) => {
  gsap.to(selector, {
    rotate: 360,
    duration: 16,
    repeat: -1,
  });
}

watch(() => props.hidden, (newStatus) => {
  if (!newStatus) {
    setActive(animationSelector.value);
    setStandby(animationSelector.value);
  } else {
    activeAnimation(animationSelector.value);
  }
});

onMounted(() => {
  setStandby(animationSelector.value);
  permanentAnimation(animationSelector.value);
});
</script>

<template>
  <div :class="[{ hidden }, animationClass]">
    <button class="button-item">
      <i class="icon iconfont icon-chilun"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
.h5-fix-button {
  --btn-size: v-bind(buttonSize);

  position: fixed;
  right: 10px;
  top: 30%;

  @include respond('tablet') {
    display: none;
  }

  .button-item {
    border: none;
    width: var(--btn-size);
    height: var(--btn-size);
    border-radius: 50%;
    background-color: #6982bd;

    .icon {
      font-size: calc(var(--btn-size) - 20px);
      color: #fff;
    }
  }
}
</style>