<script setup lang="tsx">
/**
 * 主题切换
 * 回到顶部
 * 本页资源
 */

interface ITool {
  icon: JSX.Element
}

interface IProps {
  blur?: boolean
}

withDefaults(defineProps<IProps>(), {
  blur: false
});

const toolConfigList: ITool[] = [{
  icon: <i class="iconfont icon-imagevector"></i>
}]

const IconRender = (props: { icon: JSX.Element }) => <>{props.icon}</>;
</script>

<template>
  <teleport to="body">
    <div class="app-theme toolbox-container">
      <div class="toolbox__icon-btn common-flex-center">
        <i class="icon iconfont icon-logo"></i>
      </div>
      <div class="toolbox__tools-list-container">
        <ul class="toolbox__tools-list">
          <li
              class="toolbox__tools-item"
              v-for="(tool, index) in toolConfigList"
              :key="index">
            <IconRender :icon="tool.icon" />
          </li>
        </ul>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.toolbox-container {
  --size: 80px;
  display: none;
  user-select: none;

  @include respond('tablet') {
    display: block;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;

    // 展开按钮
    & .toolbox__icon-btn {
      width: var(--size);
      height: var(--size);
      background-color: #d19cb8;
      border-radius: 50%;

      & .icon {
        font-size: 50px;
        color: #fff;
      }
    }

    // 展开内容
    & .toolbox__tools-list-container {

      & .toolbox__tools-list {}
    }
  }
}
</style>