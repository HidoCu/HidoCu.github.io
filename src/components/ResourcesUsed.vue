<script setup lang="ts">
import type { IAuthorBase, IResourcesUsed, TPlatform } from '@/types';
import { SvgIcon } from '@/components';
import { PlatformAuthorLinkPrefix, PlatformIcon, PlatformLinkPrefix, TagColorMap } from '@/common/constant';

defineProps<{
  resources: IResourcesUsed[];
}>();

const show = defineModel<boolean>('show');

const IconMap = Object.freeze({
  image: 'icon-picture',
  video: 'icon-video',
  text: 'icon-performance',
  others: 'icon-bookrack'
});

const IconColorMap = Object.freeze({
  image: 'success',
  video: 'primary',
  text: 'warning',
  others: 'error'
});

const accessLink = (prefix: TPlatform, suffix: number | string) => {
  return PlatformLinkPrefix[(prefix.toUpperCase()) as keyof typeof PlatformLinkPrefix] + suffix;
}

const handleAccessSource = (res: IResourcesUsed) => {
  window.open(accessLink(res.sourcePlatform, res.id), '_blank');
}

const handleAccessAuthor = (author: IAuthorBase, sp: TPlatform) => {
  const linkPrefix = PlatformAuthorLinkPrefix[(sp.toUpperCase()) as keyof typeof PlatformAuthorLinkPrefix];
  const link = linkPrefix + author.uid;
  window.open(link);
}
</script>

<template>
  <n-drawer
      placement="right"
      v-model:show="show"
      width="20%"
      close-on-esc
      show-mask
      block-scroll>
    <n-drawer-content
        title="本页使用的资源（借物表）"
        :native-scrollbar="false"
        closable>
      <div class="ru__content">
        <n-list clickable>
          <n-list-item v-for="(res, index) in resources" :key="index">
            <n-thing content-indented>

              <!-- sourcePlatform -->
              <template #avatar>
                <div
                    class="ru__source-platform common-cursor"
                    @click="handleAccessSource(res)">
                  <n-popover :show-arrow="false" trigger="hover" placement="left">
                    <template #trigger>
                      <SvgIcon :name="PlatformIcon[`${res.sourcePlatform}`]" size="50" />
                    </template>
                    <em class="ru__source-platform-popover">
                      {{ accessLink(res.sourcePlatform, res.id) }}
                    </em>
                  </n-popover>
                </div>
              </template>

              <!-- resName -->
              <template #header>
                <div class="ru__res-name">{{res.resName}}</div>
              </template>

              <!-- resType -->
              <template #header-extra>
                <div class="ru__res-type">
                  <i
                      :style="{ '--color': 'var(--theme-color-' + IconColorMap[`${res.resType}`] + `)` }"
                      class="iconfont"
                      :class="IconMap[`${res.resType}`]">
                  </i>
                </div>
              </template>

              <!-- author -->
              <template #description>
                <div class="ru__author">
                  <ul class="ru__author-list">
                    <li
                        class="ru__author-item"
                        v-for="(author, index) in res.authors"
                        :key="index"
                        @click="handleAccessAuthor(author, res.sourcePlatform)">
                      {{ author.name }}
                    </li>
                  </ul>
                </div>
              </template>

              <!-- tags -->
              <template #footer>
                <div class="ru__tags">
                  <!-- {{res.tags}} -->
                  <ul class="ru__tags-list">
                    <li
                        class="ru__tags-item"
                        v-for="(tag, index) in res.tags"
                        :key="index">
                      <n-tag
                          :color="{
                            color: 'transparent',
                            textColor: TagColorMap.get(tag),
                            borderColor: TagColorMap.get(tag),
                          }">
                        {{ tag }}
                      </n-tag>
                    </li>
                  </ul>
                </div>
              </template>

              <!-- description -->
              <div class="ru__description">{{res.resDesc}}</div>

            </n-thing>
          </n-list-item>
        </n-list>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
.ru__content {

  & .ru__source-platform {}

  & .ru__res-name {
    &::before {
      content: '标题：';
    }
  }

  & .ru__res-type {
    & > i.iconfont {
      --icon-size: 20px;
      color: var(--color);
      font-size: var(--icon-size);
      line-height: var(--icon-size);
    }
  }

  & .ru__author {
    display: flex;

    &:hover {
      color: var(--theme-color-success);
    }

    &::before {
      content: '作者：';
    }

    & .ru__author-list {
      display: flex;
      gap: 10px;

      & .ru__author-item {}
    }
  }

  & .ru__tags {}
  & .ru__description {}

}
</style>