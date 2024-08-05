<script setup lang="ts">
import NativeAccessor from '@/common/constant-util';
import type { INativeImage } from '@/types';
import { LinkIcon, Revolver } from '@/components';
import { random } from '@/utils';
import { Funkey } from '@/common/constant';

const props = withDefaults(defineProps<{
  data: any
}>(), {});

const revolverList = computed(() =>
    (props.data['revolver-list'] as INativeImage[])
        .map(image => NativeAccessor.image('revolver', image)));

const nicknameGradient = ref('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
const signatureGradient = ref('linear-gradient(to top, #09203f 0%, #537895 100%)');

const dialog = useDialog();

const isRick = (link: string) => link === Funkey.RICK;

const handleOpenLink = (link: string) => {
  if (isRick(link)) {
    const r = random(1, 20);
    console.log(r);

    dialog.warning({
      title: '😥你被骗了',
      content: '🤣怎么可能会放这个链接出来lolololo~',
      positiveText: '😋愿者上钩！',
      negativeText: '😡Noooooo!',
      onPositiveClick: () => {
        let url = link;
        if (r === 17) {
          url = Funkey.BAD_APPLE;
        }
        if (r === 9) {
          url = Funkey.BAKA;
        }
        window.open(url);
      },
    });
  } else {
    window.open(link);
  }
}
</script>

<template>
  <div class="home-header">
    <section class="my-info">
      <div class="revolver-avatar">
        <Revolver :images="revolverList" :size="100" />
      </div>
      <div class="info-text">
        <div class="nickname">
          <n-gradient-text :gradient="nicknameGradient">
            <b>{{ data['user-name'] }}</b>
          </n-gradient-text>
        </div>
        <div class="signature">
          <div
              class="signature-char"
              v-for="char in data['signature']">
            <n-gradient-text :gradient="signatureGradient">
              {{ char }}
            </n-gradient-text>
          </div>
        </div>
      </div>
    </section>
    <section class="my-links">
      <ul class="my-link-list">
        <li
            class="my-link-item"
            v-for="(link, index) in data['links']"
            :key="index"
            @click="handleOpenLink(link.link)">
          <LinkIcon
              :icon="link.icon"
              :link="link.link"
              :color="link.color"
              :icon-size="28" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-header {
  --layout-gap: 10px;
  --content-gap: 24px;

  display: flex;
  flex-direction: column;
  gap: var(--layout-gap);

  .my-info {
    display: flex;
    align-items: center;
    gap: var(--content-gap);
    padding: 10px;

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .nickname {
        font-size: 32px;
      }

      .signature {
        font-size: 16px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  .my-links {
    display: none;

    @include respond('tablet') {
      display: block;
    }

    padding: 0 20px;

    .my-link-list {
      display: flex;
      justify-content: space-around;

      .my-link-item {
      }
    }
  }
}
</style>