<script setup lang="ts">
import { useMediaWrapper, usePageResources } from '@/hooks';
import Revolver from '@/components/Revolver.vue';
import type { IPixivProxy } from '@/types';
import { pixivProxy } from '@/common/constant-util';
import { useThemeStore, useToolDrawerStore } from '@/stores';
import { ResourcesUsed, LinkIcon } from '@/components';
import ExternalLink from '@/components/ExternalLink.vue';
import navList from '@/router/nav-list';
import { randomHexColor } from '@/utils';
import Clipboard from 'clipboard';
import inf from '@/assets/data/info.json';

const info = ref(inf);

const show = defineModel<boolean>('show');
const handleToLink = (link: string) => {
  window.open(link);
}

const { onRespond } = useMediaWrapper();
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

const themeStore = useThemeStore();
const styleModeVal = ref(themeStore.isTheme('dark'));
watch(styleModeVal, (modeVal) => {
  themeStore.setTheme(modeVal ? 'dark' : 'light');
}, { immediate: true });

const toolStore = useToolDrawerStore();
const router = useRouter();
const handleToRoute = (routeName: string) => {
  router.push({
    name: routeName,
  });
  toolStore.close();
}

const email = ref('hbk15097@gmail.com');
const notification = useNotification();
const handleAgreeClipboard = () => {
  const clipboard = new Clipboard('.toolbox-footer', {
    text: () => email.value,
  });
  clipboard.on('success', () => {
    notification.success({
      content: '已将邮箱复制到您的剪切板！',
      duration: 3000,
      closable: false
    });
  });
  clipboard.on('error', () => {
    notification.error({
      content: '自动复制失败了！请您手动复制吧',
      duration: 3000,
      closable: false
    });
  });
}

const handleRefuseClipboard = () => {
  notification.warning({
    content: '您终止了复制，是有什么问题吗？',
    duration: 3000,
    closable: false
  });
}
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
            <p>
              上面的画的画师是
              <ExternalLink
                  type="success"
                  jump-confirm
                  link="https://www.pixiv.net/users/3718340">
                京田スズカ
              </ExternalLink>
              ，画的恋恋非常棒，可以去看看。
            </p>
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
                  round>
                查看
              </n-button>
            </div>
          </section>
        </main>
        <n-divider dashed />
        <nav class="navigation">
          <template v-for="nav in navList">
            <section
                v-if="nav.show"
                @click="handleToRoute(nav.name)"
                class="navigation-item">
              <div class="nav-icon">
                <i
                    :style="{ color: randomHexColor() }"
                    class="nav-icon-i iconfont"
                    :class="nav.icon">
                </i>
              </div>
              <div class="nav-label">
                <span>{{ nav.title }}</span>
                <em>{{ nav.subTitle }}</em>
              </div>
            </section>
          </template>
        </nav>
        <n-divider dashed />
        <nav class="my-links">
          <template v-for="link in info['links']">
            <section
                v-if="link.link !== 'hidden'"
                @click="handleToLink(link.link)"
                class="link-item">
              <LinkIcon
                  :padding="0"
                  :icon="link.icon"
                  :color="link.color"
                  :icon-size="28"/>
            </section>
          </template>
        </nav>
        <n-divider dashed />
        <footer class="toolbox-footer">
          <p>如果您有任何疑问，请联系我：</p>
          <n-popconfirm
              positive-text="同意"
              negative-text="拒绝"
              @positive-click="handleAgreeClipboard"
              @negative-click="handleRefuseClipboard">
            <template #trigger>
              <address class="contact-me" :data-clipboard-text="email">{{ email }}</address>
            </template>
            将使用您的剪切板，同意复制？
          </n-popconfirm>
        </footer>
      </div>
    </n-drawer-content>
  </n-drawer>
  <ResourcesUsed
      v-model:show="resUsedDrawerShow"
      :resources="resourcesUsedList" />
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

  // Links
  .my-links {
    display: flex;
    justify-content: space-evenly;
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

  // Navigation
  .navigation {

    .navigation-item {
      --padding-block: 14px;
      padding-block: var(--padding-block);
      text-align: center;
      position: relative;

      &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
      }

      &:first-child {
        margin-top: calc(var(--padding-block) * -1);
      }

      &:last-child {
        margin-bottom: calc(var(--padding-block) * -1);
      }

      .nav-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;

        .nav-icon-i {
          --s: 20px;
          font-size: var(--s);
          line-height: var(--s);
        }
      }

      .nav-label {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > span {
          --fs: 14px;
          font-size: var(--fs);
          line-height: var(--fs);
          color: var(--text-color-main);
        }

        & > em {
          --fs: 12px;
          color: var(--text-color-tip);
          font-size: var(--fs);;
          line-height: var(--fs);;
        }
      }

      &:active {
        background-color: #fff1;
      }
    }
  }

  // Footer
  .toolbox-footer {
    font-size: 14px;
    color: var(--text-color-tip);

    & > address {
      color: var(--theme-color-success);
    }
  }
}
</style>