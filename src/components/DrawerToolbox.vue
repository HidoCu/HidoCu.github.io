<script setup lang="ts">
import { useMediaWrapper } from '@/hooks';

const props = withDefaults(defineProps<{
}>(), {
});

const { onRespond } = useMediaWrapper();

const drawerW = ref(300);

onRespond('pad', () => {
  drawerW.value = 500;
});

const show = defineModel<boolean>('show');
</script>

<template>
  <div class="drawer-toolbox">
    <n-drawer
        v-model:show="show"
        :width="drawerW"
        placement="left">
      <n-drawer-content>

      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped lang="scss">

</style>