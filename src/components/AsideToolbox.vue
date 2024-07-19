<script setup lang="ts">
import { useThemeStore } from '@/stores';
import { usePageResources } from '@/hooks';
import { ResourcesUsed } from '@/components';

/* ---------------- Constant ---------------- */
const ICON_SIZE = 80;
const ICON_SIZE_CSS = `${ICON_SIZE}px`;
/* ---------------- Constant ---------------- */


/* ---------------- types ---------------- */
interface ITool {
  label: '切换主题' | '回到顶部' | '本页资源';
  icon: `icon-${string}`;
  handler: (...args: any[]) => void;
}
/* ---------------- types ---------------- */


/* ---------------- Props ---------------- */
withDefaults(defineProps<{
  blur: boolean
}>(), {
  blur: false
})
/* ---------------- Props ---------------- */


/* ---------------- Stores & Hooks ---------------- */
// const route = useRoute();
const themeStore = useThemeStore();
const { updateResources, resUsed } = usePageResources();
/* ---------------- Stores & Hooks ---------------- */


/* ---------------- 工具栏样式 ---------------- */
const toolboxRef = ref<HTMLUListElement | null>(null);
const toolboxHeight = ref(0);

const initToolboxHeight = () => {
  if (toolboxRef.value) {
    toolboxHeight.value = toolboxRef.value.clientHeight;
  }
}
/* ---------------- 工具栏样式 ---------------- */


/* ---------------- 工具栏打开-关闭 ---------------- */
const isToolboxOpen = ref(false);
const currentToolboxContainerHeight = ref(ICON_SIZE);
const currentToolboxScaleY = ref(0);

const handleToggleToolbox = () => {
  if (isToolboxOpen.value) {
    currentToolboxContainerHeight.value = ICON_SIZE;
    currentToolboxScaleY.value = 0;
  } else {
    currentToolboxContainerHeight.value = ICON_SIZE + toolboxHeight.value + 20;
    currentToolboxScaleY.value = 1;
  }
  isToolboxOpen.value = !isToolboxOpen.value;
}
/* ---------------- 工具栏打开-关闭 ---------------- */


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
/* ---------------- 工具栏配置 ---------------- */


/* ---------------- 生命周期钩子 ---------------- */
onMounted(() => {
  initToolboxHeight();
});
/* ---------------- 生命周期钩子 ---------------- */
</script>

<template>
  <div
      class="toolbox-container"
      :style="{ height: currentToolboxContainerHeight + 'px'}">
    <div
        class="toolbox__icon-btn common-flex-center common-cursor"
        :class="{ active: isToolboxOpen }"
        @click="handleToggleToolbox">
      <i class="iconfont icon-logo"></i>
    </div>
    <div
        class="toolbox__tools-list-container"
        :class="{ blur: blur }"
        :style="{ transform: `scaleY(${currentToolboxScaleY})` }">
      <ul class="toolbox__tools-list" ref="toolboxRef">
        <li
            class="toolbox__tools-item common-flex-center"
            v-for="(tool, index) in toolConfigList"
            :key="index">
          <div
              class="toolbox__tools-icon common-flex-center common-cursor"
              @click="tool.handler">
            <i class="common-icon iconfont" :class="tool.icon"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <ResourcesUsed :resources="resUsed" v-model:show="pageResActive" />
</template>

<style scoped lang="scss">
.toolbox-container {
  display: none;
  position: fixed;
  user-select: none;

  // PC
  @include respond('tablet') {
    display: flex;
    justify-content: center;

    top: 50%;
    transform: translateY(-50%);
    right: 20px;

    --btn-size: v-bind(ICON_SIZE_CSS);
    --btn-icon-size: 55px;

    --tool-size: 60px;
    --tool-icon-size: 45px;

    --toolbox-padding-top: 5px;
    --toolbox-padding-bottom: 10px;

    --toolbox-top-offset: 40px;
    --toolbox-top-margin: calc(
        var(--btn-size) -
        var(--toolbox-top-offset) +
        var(--toolbox-padding-top)
    );

    --anime-duration: .5s;
    --anime-function: cubic-bezier(0.680, -0.550, 0.265, 1.550);

    width: var(--btn-size);
    border-radius: 999px;
    transition: height var(--anime-duration) var(--anime-function);

    // 触发按钮
    & .toolbox__icon-btn {
      position: absolute;
      z-index: 1;

      width: var(--btn-size);
      height: var(--btn-size);
      border-radius: 50%;
      background-color: #6982bd;

      transform: rotate(0deg);
      transition: all var(--anime-duration) ease;

      &.active {
        transform: rotate(440deg);
      }

      & > i.iconfont {
        font-size: var(--btn-icon-size);
        line-height: var(--btn-icon-size);
        color: #fff;
      }
    }

    // 容器
    & .toolbox__tools-list-container {
      position: absolute;
      top: var(--toolbox-top-offset);
      background-color: var(--bg-color-card);

      &.blur {
        background-color: rgba(255, 255, 255, .15);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
      }

      border-radius: 999px;
      transform-origin: center top;
      transition: transform var(--anime-duration) var(--anime-function);
      overflow: hidden;

      & .toolbox__tools-list {
        margin-top: var(--toolbox-top-margin);
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-bottom: var(--toolbox-padding-bottom);

        & .toolbox__tools-item {
          & .toolbox__tools-icon {
            width: var(--tool-size);
            height: var(--tool-size);

            & > i.iconfont {
              font-size: var(--tool-icon-size);
              line-height: var(--tool-size);
              color: var(--icon-color);
              transition: all .1s ease-in;
            }

            &:hover {
              & > i.iconfont {
                color: #ffa9cc;
              }
            }
          }
        }
      }
    }
  }
}
</style>