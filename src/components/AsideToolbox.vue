<script setup lang="ts">
import { useThemeStore } from '@/stores';
import { usePageResources } from '@/hooks';
import { ResourcesUsed } from '@/components';
import type { FFunction } from '@/types/type-utils';

/* ---------------- public ---------------- */
interface ITool {
  label: '切换主题' | '回到顶部' | '本页资源';
  icon: string;
  handler: FFunction;
}

// const props = withDefaults(defineProps<{
// }>(), {
// });

const themeStore = useThemeStore();
const { updateResources, resourcesUsedList } = usePageResources();
/* ---------------- public ---------------- */



/* ---------------- Toolbox ---------------- */
const toolboxStatus = ref(false);
const handleToggleToolbox = () => {
  toolboxStatus.value = !toolboxStatus.value;
}
/* ---------------- Toolbox ---------------- */



/* ---------------- 展示页面使用资源 ---------------- */
const pageResActive = ref(false);
const handleTogglePageRes = (status: boolean) => {
  pageResActive.value = status;
}
/* ---------------- 展示页面使用资源 ---------------- */



/* ---------------- 工具栏配置 ---------------- */
const toolConfigList: ITool[] = [{
  label: '切换主题',
  icon: 'icon-brightness4',
  handler: () => {
    themeStore.toggleTheme();
  }
}, {
  label: '回到顶部',
  icon: 'icon-arrowupboldcircleoutline',
  handler: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}, {
  label: '本页资源',
  icon: 'icon-linkvariant',
  handler: () => {
    updateResources();
    handleTogglePageRes(true);
  }
}];
const toolCount = computed(() => toolConfigList.length);
/* ---------------- 工具栏配置 ---------------- */
</script>

<template>
  <div class="aside-toolbox">
    <ul class="toolbox-tools-list">
      <li
          class="tools-item"
          :class="{ active: toolboxStatus }"
          v-for="(tool, index) in toolConfigList"
          :key="index"
          :style="{ '--i': index + 1 }">
        <div
            @click="tool.handler"
            class="tools-item-box common-flex-center common-cursor"
            :class="{ active: toolboxStatus }">
          <i class="tools-icon iconfont" :class="tool.icon"></i>
        </div>
      </li>
    </ul>
    <div
        class="toolbox-button common-flex-center common-cursor"
        :class="{ active: toolboxStatus }"
        @click="handleToggleToolbox">
      <i class="btn-icon iconfont icon-logo"></i>
    </div>
  </div>
  <ResourcesUsed
      :resources="resourcesUsedList"
      v-model:show="pageResActive" />
</template>

<style scoped lang="scss">
.aside-toolbox {
  --bth-size: 80px;
  --icon-size: calc(var(--bth-size) - 20px);
  --tool-count: v-bind(toolCount);
  --ease-in-out: cubic-bezier(0.5, -2.00, 0.5, 2.00);

  $iconRotate: calc(180deg / (var(--tool-count) + 1) * var(--i));
  $iconRotateR: calc(180deg / (var(--tool-count) + 1) * var(--i) * -1);

  display: none;
  @include respond('tablet') {
    display: block;
  }

  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  user-select: none;

  .toolbox-button {
    width: var(--bth-size);
    height: var(--bth-size);
    border-radius: 50%;
    background-color: #5650aa;
    transition:
        rotate .5s ease,
        scale .5s var(--ease-in-out),;

    &.active {
      rotate: 630deg;
      scale: .85;
    }

    .btn-icon {
      color: #fff;
      font-size: calc(var(--bth-size) - 30px);
      line-height: calc(var(--bth-size) - 30px);
    }
  }

  .toolbox-tools-list {
    .tools-item {
      width: var(--icon-size);
      height: var(--icon-size);
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;

      transition:
          translate .3s ease,
          rotate .3s ease,
          scale .4s var(--ease-in-out);
      translate: -50% -50%;
      rotate: $iconRotate;

      &.active {
        scale: 1.2;
      }

      .tools-item-box {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--bg-color-card);
        box-shadow: 1px 1px 2px 2px #0002;
        transition: all .3s ease;

        &.active {
          transform: translateY(100px);
        }

        .tools-icon {
          font-size: calc(var(--icon-size) - 30px);
          color: var(--icon-color);
          transition: all .3s ease;
          rotate: $iconRotateR;
        }
      }

      &:hover {
        box-shadow: 2px 2px 2px 2px #0001;

        .tools-icon {
          rotate: $iconRotate;
          scale: 1.3;
        }
      }


    }
  }
}
</style>