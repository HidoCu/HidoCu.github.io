<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string;
  icon: string;
  color?: string;
  iconSize?: number;
  textSize?: number;
  padding?: number;
}>(), {
  text: '',
  color: '#333',
  iconSize: 32,
  textSize: 16,
  padding: 4,
});

const _iconSize = computed(() => props.iconSize + 'px');
const _textSize = computed(() => props.textSize + 'px');
const _padding = computed(() => props.padding + 'px');
</script>

<template>
  <div class="link-icon-container">
    <div class="link-icon common-cursor">
      <div class="link-icon-i">
        <i class="iconfont icon-i" :class="icon"></i>
      </div>
      <div class="link-text">{{ text }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-icon-container {
  .link-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: v-bind(_padding);

    .link-icon-i {
      transition: all .1s linear;

      .icon-i {
        transition: all .1s linear;
        font-size: v-bind(_iconSize);
        line-height: v-bind(_iconSize);
        color: v-bind(color);
      }
    }

    .link-text {
      font-size: v-bind(_textSize);
      color: var(--text-color-main);
    }

    &:hover {
      .link-icon-i {
        transform: scale(1.5);

        .icon-i {
          color: v-bind(color);
        }
      }

      .link-text {
        color: v-bind(color);
      }
    }
  }
}
</style>