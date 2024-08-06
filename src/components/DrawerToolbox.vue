<script setup lang="ts">
import { useMediaWrapper, usePageResources } from '@/hooks';
import Revolver from '@/components/Revolver.vue';
import type { IPixivProxy } from '@/types';
import { pixivProxy } from '@/common/constant-util';
import { useThemeStore } from '@/stores';
import { ResourcesUsed } from '@/components';

const props = withDefaults(defineProps<{}>(), {});

const show = defineModel<boolean>('show');

const { onRespond } = useMediaWrapper();
const themeStore = useThemeStore();

const drawerW = ref(300);

onRespond('pad', () => {
  drawerW.value = 500;
});

const getWidth = () => drawerW.value;

defineExpose({ getWidth });

const randomKoishiImgList = ref<IPixivProxy[]>([
  { pid: 117728796, suffix: 'jpg' },
  { pid: 100113482, suffix: 'jpg' },
  { pid: 117702405, suffix: 'jpg' },
  { pid: 99370300, suffix: 'jpg' },
  { pid: 109978297, suffix: 'jpg' },
  { pid: 94333284, suffix: 'jpg' },
  { pid: 109682509, suffix: 'jpg' },
  { pid: 94011451, suffix: 'jpg' },
  { pid: 103474888, suffix: 'jpg' },
  { pid: 88314573, suffix: 'jpg' },
  { pid: 103424312, suffix: 'jpg' },
  { pid: 87514204, suffix: 'jpg' },
  { pid: 101250949, suffix: 'jpg' },
  { pid: 82255121, suffix: 'jpg' },
  { pid: 99872743, suffix: 'jpg' },
  { pid: 76626042, suffix: 'jpg' },
  { pid: 94353597, suffix: 'jpg' },
  { pid: 74870772, suffix: 'jpg' },
]);

const randomKoishiImgUrlList = computed(() => randomKoishiImgList.value.map(pixivProxy));

const { updateResources, resourcesUsedList } = usePageResources();
const resUsedDrawerShow = ref(false);
const handleShowResUsedDrawer = () => {
  updateResources();
  resUsedDrawerShow.value = true;
}

const styleModeVal = ref(themeStore.isTheme('dark'));
watch(styleModeVal, (modeVal) => {
  themeStore.setTheme(modeVal ? 'dark' : 'light');
}, { immediate: true });
</script>

<template>
  <n-drawer
      v-model:show="show"
      :width="drawerW"
      placement="left">
    <n-drawer-content>
      <div class="drawer-toolbox">
        <header class="toolbox-header">
          <section class="toolbox-header-revolver">
            <Revolver :size="110" :images="randomKoishiImgUrlList" />
          </section>
          <section class="toolbox-header-text">
            <h4>欢迎来到隙间！</h4>
            <p>我也不知道这里要写什么，就随便放了点东西，既然来了就随便看看吧。</p>
          </section>
        </header>
        <n-divider dashed />
        <main class="toolbox-tools">
          <section class="toolbox-tool">
            <div class="label">暗黑模式</div>
            <div class="item">
              <n-switch v-model:value="styleModeVal" size="medium">
                <template #checked-icon>🌙</template>
                <template #unchecked-icon>💡</template>
              </n-switch>
            </div>
          </section>
          <section class="toolbox-tool">
            <div class="label">本页资源</div>
            <div class="item">
              <n-button
                  @click="handleShowResUsedDrawer"
                  type="primary"
                  size="tiny"
                  round >
                查看
              </n-button>
            </div>
          </section>
        </main>
        <n-divider dashed />
        <footer class="toolbox-footer"></footer>
      </div>
    </n-drawer-content>
  </n-drawer>
  <ResourcesUsed v-model:show="resUsedDrawerShow" :resources="resourcesUsedList" />
</template>

<style scoped lang="scss">
.drawer-toolbox {
  padding-block: 20px;

  // Header
  .toolbox-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .toolbox-header-text {
      color: var(--text-color-main);
      text-align: center;

      & > h4 {
        font-size: 16px;
      }

      & > p {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }

  // Main
  .toolbox-tools {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .toolbox-tool {
      display: flex;
      align-items: center;
      gap: 20px;

      .label {
        font-size: 14px;
      }

      .item {
        display: flex;
        align-items: center;
      }
    }
  }

  // Footer
  .toolbox-footer {
  }
}
</style>