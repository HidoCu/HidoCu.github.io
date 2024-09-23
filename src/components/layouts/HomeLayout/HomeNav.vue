<script setup lang="ts">
import navigationList from '@/router/nav-list';
import { randomHexColor } from '@/utils';

const navList = ref(navigationList);

const router = useRouter();
const handleToRoute = (routeName: string) => {
  router.push({
    name: routeName
  });
}
</script>

<template>
  <div class="home-nav">
    <ul class="nav-list">
      <template v-for="nav in navList">
        <li v-if="nav.show" class="nav-item">
          <div
              class="nav-content common-cursor"
              @click="handleToRoute(nav.name)">
            <div class="nav-icon">
              <i
                  :style="{ color: randomHexColor() }"
                  class="nav-icon-i iconfont"
                  :class="nav.icon">
              </i>
            </div>
            <div class="nav-text">
              <span class="nav-title">{{ nav.title }}</span>
              <em class="nav-title-sub">{{ nav.subTitle }}</em>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-nav {
  padding: 10px 20px;

  .nav-list {

    .nav-item {
      --padding-block: 16px;

      &:not(:last-child) {
        border-bottom: 1px solid #fff9;
      }

      &:first-child {
        margin-top: calc(var(--padding-block) * -1);
      }

      &:last-child {
        margin-bottom: calc(var(--padding-block) * -1);
      }

      .nav-content {
        position: relative;
        padding-block: var(--padding-block);

        .nav-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;

          .nav-icon-i {
            font-size: 30px;
            line-height: 30px;
          }
        }

        .nav-text {
          --animation: all .3s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;

          .nav-title {
            font-size: 20px;
            transition: var(--animation);
          }

          .nav-title-sub {
            font-size: 14px;
            transition: var(--animation);
          }
        }

        &:hover {
          .nav-text {
            .nav-title {
              color: var(--theme-color-success);
            }
            .nav-title-sub {
              color: var(--theme-color-success);
            }
          }
        }
      }
    }
  }
}
</style>