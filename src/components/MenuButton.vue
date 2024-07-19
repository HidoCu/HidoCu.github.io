<script setup lang="ts">
import type { TIntRange } from '@/types/type-utils';

type TCssUnit = `${number}px` | `${TIntRange<0, 101>}%`;

const props = withDefaults(defineProps<{
  size?: number | 'respond';
  radius?: TCssUnit | number;
  borderWidth?: number;
  borderColor?: string;
  speed?: number;
  color?: string;
  backgroundColor?: string;
  padding?: number;
}>(), {
  size: 40,
  radius: '10px',
  borderWidth: 2,
  borderColor: '#fff',
  speed: 0.3,
  color: '#fff',
  backgroundColor: 'transparent',
  padding: 4,
});

const btnSize = computed(() => {
  if (props.size === 'respond') {
    return '100%';
  }
  return Math.abs(props.size) + 'px';
});
const borderRadius = computed(() => {
  if (typeof props.radius === 'number') {
    return Math.abs(props.radius) + 'px';
  }
  return props.radius;
});
const borderW = computed(() => Math.abs(props.borderWidth) + 'px');
const animeSpeed = computed(() => Math.abs(props.speed) + 's');
const pd = computed(() => Math.abs(props.padding) + 'px');

const active = defineModel<boolean>('active');
const handleChangeState = () => {
  active.value = !active.value;
}

</script>

<template>
  <div
      class="menu-button__container common-cursor"
      @click="handleChangeState">
    <div 
        class="menu-button__inner"
        :class="{ active }">
      <section class="menu-button__button-icon nth-top"></section>
      <section class="menu-button__button-icon nth-middle"></section>
      <section class="menu-button__button-icon nth-bottom"></section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-button__container {
  --menu-button-size: v-bind(btnSize);
  --menu-button-radius: v-bind(borderRadius);
  --menu-button-border-width: v-bind(borderW);
  --menu-button-border-color: v-bind(borderColor);
  --menu-button-speed: v-bind(animeSpeed);
  --menu-button-color: v-bind(color);
  --menu-button-background-color: v-bind(backgroundColor);
  --menu-button-padding: v-bind(pd);

  width: var(--menu-button-size);
  height: var(--menu-button-size);
  border-radius: var(--menu-button-radius);
  border: var(--menu-button-border-width) solid var(--menu-button-border-color);
  padding: var(--menu-button-padding);

  background-color: var(--menu-button-background-color);

  & .menu-button__inner {
    height: 100%;
    position: relative;

    & .menu-button__button-icon {
      --anime-speed: calc(var(--menu-button-speed) / 2);
      width: 100%;
      height: 100%;
      position: absolute;

      &::before,
      &.nth-middle::after {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        transform: translateY(-50%);

        width: 100%;
        height: v-bind(borderW);
        border-radius: 999px;
        background-color: var(--menu-button-color);

        --side-anime-in: top var(--anime-speed) ease-in;
        --side-anime-out: top var(--anime-speed) ease-in var(--anime-speed);
        --center-anime-in:  transform var(--anime-speed) ease-out var(--anime-speed);
        --center-anime-out:  transform var(--anime-speed) ease-out;
      }

      &.nth-top::before {
        top: 20%;
        transition: var(--side-anime-out), var(--center-anime-out);
      }
      &.nth-middle::before,
      &.nth-middle::after {
        top: 50%;
        transition: var(--center-anime-out);
      }
      &.nth-bottom::before {
        top: 80%;
        transition: var(--side-anime-out), var(--center-anime-out);
      }
    }

    &.active {
      & .menu-button__button-icon {
        &.nth-top::before {
          top: 50%;
          transform: rotate(45deg);
          transition: var(--side-anime-in), var(--center-anime-in);
        }
        &.nth-middle::before {
          transform: rotate(45deg);
          transition: var(--center-anime-in);
        }
        &.nth-middle::after {
          transform: rotate(-45deg);
          transition: var(--center-anime-in);
        }
        &.nth-bottom::before {
          top: 50%;
          transform: rotate(-45deg);
          transition: var(--side-anime-in), var(--center-anime-in);
        }
      }
    }
  }
}
</style>
