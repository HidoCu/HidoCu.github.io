<script setup lang="ts">
import data from './page.json';

</script>

<template>
  <div class="home-container">
    <header class="home__my-info common-card blur">header</header>
    <nav class="home__nav common-card blur">nav</nav>
    <main class="home__main-content common-card blur">
      <div class="home__intro">intro</div>
      <div class="home__illustrate">illustrate</div>
    </main>
    <footer class="home__footer common-card blur">footer</footer>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  width: 80%;
  margin: 0 auto;

  display: grid;
  grid-template-areas:
    "header"
    "nav"
    "content"
    "footer";
  gap: 20px;

  @include respond('tablet') {
    grid-template-areas:
      "header content content"
      "nav    content content"
      "nav    footer  footer ";
  }

  @include respond('desktop') {
    grid-template-areas:
      "header content content content"
      "nav    content content content"
      "nav    footer  footer  footer ";
  }

  // avatar username ...
  & .home__about-me {
    grid-area: header;
  }

  // 功能导航
  & .home__nav {
    grid-area: nav;
  }

  //主要内容（介绍、说明）
  & .home__main-content {
    grid-area: content;

    & .home__intro {}
    & .home__illustrate {}
  }

  // 尾部的一些信息
  & .home__footer {
    grid-area: footer;
  }
}
</style>