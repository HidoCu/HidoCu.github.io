<script setup lang="ts">
type TColorType = 'primary' | 'success' | 'warning' | 'error';

const props = withDefaults(defineProps<{
  link: string;
  decoration?: boolean;
  jumpConfirm?: boolean;
  type?: TColorType;
}>(), {
  decoration: false,
  jumpConfirm: false,
  type: 'primary',
});

const dialog = useDialog();
const handleToLink = () => {
  if (props.jumpConfirm) {
    dialog.warning({
      title: '您将跳转到链接:',
      content: props.link,
      positiveText: '跳转',
      negativeText: '取消',
      onPositiveClick: () => {
        window.open(props.link);
      },
    });
  } else {
    window.open(props.link);
  }
}
</script>

<template>
  <a
      class="external-link"
      :class="[{ decoration }, type]"
      href="javascript:void(0)"
      @click="handleToLink">
    <slot />
  </a>
</template>

<style scoped lang="scss">
.external-link {
  display: inline;

  &.decoration {
    text-decoration: underline dotted;
  }

  &.primary {
    color: var(--theme-color-primary);
  }
  &.success {
    color: var(--theme-color-success);
  }
  &.warning {
    color: var(--theme-color-warning);
  }
  &.error {
    color: var(--theme-color-error);
  }
}
</style>