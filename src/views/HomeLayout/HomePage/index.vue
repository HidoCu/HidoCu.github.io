<script setup lang="ts">
import pageDataJson from './data.json';
import { HomeAside, HomeFooter, HomeHeader, HomeMain, HomeNav } from '@/components/layouts';
import { DrawerToolbox, H5FixButton } from '@/components';
import { useToolDrawerStore } from '@/stores';

const data = ref(pageDataJson);

const toolStore = useToolDrawerStore();

const handleDrawerShow = () => {
  toolStore.open();
}
</script>

<template>
  <div class="home-container common-container">
    <div class="home-layout-container">
      <section class="home-layout-left">
        <header class="home-header-container">
          <div class="header-content common-card blur">
            <HomeHeader :data="data" />
          </div>
        </header>
        <nav class="home-nav-container">
          <div class="nav-content common-card blur">
            <HomeNav />
          </div>
        </nav>
      </section>
      <section class="home-layout-center">
        <main class="home-main-container">
          <div class="main-content common-card blur">
            <HomeMain />
          </div>
        </main>
        <footer class="home-footer-container">
          <div class="footer-content common-card blur">
            <HomeFooter />
          </div>
        </footer>
      </section>
      <section class="home-layout-right">
        <aside class="home-aside-container">
          <div class="aside-content common-card blur">
            <HomeAside />
          </div>
        </aside>
      </section>
    </div>
    <H5FixButton
        :hidden="toolStore.show"
        @click="handleDrawerShow"/>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  padding-inline: 20px;

  @include respond('pad') {
    padding-inline: 0;
  }

  .home-layout-container {
    --left-w: 280px;
    --right-w: 400px;

    --layout-gap: 20px;
    --content-gap: 20px;

    display: flex;
    flex-direction: column;
    gap: var(--content-gap);

    @include respond('pad') {
      flex-direction: row;
      gap: var(--layout-gap);
    }

    @include respond('desktop') {
      --left-w: 400px;
    }

    // left
    .home-layout-left {
      flex: 1;

      @include respond('pad') {
        flex: 0 0 var(--left-w);
      }

      display: flex;
      flex-direction: column;
      gap: var(--content-gap);

      // header
      .home-header-container {
        .header-content {}
      }

      // nav
      .home-nav-container {
        display: none;

        @include respond('pad') {
          display: block;
        }

        .nav-content {}
      }
    }

    // center
    .home-layout-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--content-gap);

      // main
      .home-main-container {
        .main-content {}
      }

      // footer
      .home-footer-container {
        .footer-content {}
      }
    }

    // right
    .home-layout-right {
      display: none;

      @include respond('desktop') {
        display: flex;
        flex: 0 0 var(--right-w);
        flex-direction: column;
        gap: var(--content-gap);
      }

      // aside
      .home-aside-container {
        .aside-content {}
      }
    }
  }
}
</style>