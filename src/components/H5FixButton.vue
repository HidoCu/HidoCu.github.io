<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number;
  hidden?: boolean;
}>(), {
  size: 44,
  hidden: false,
});

const buttonSize = computed(() => props.size + 'px');
</script>

<template>
  <div class="h5-fix-button" :class="{ hidden: hidden }">
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

  transition: all .3s ease;

  &.hidden {
    transform: translateX(50%);
    opacity: 0;
  }

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