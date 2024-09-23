<script setup lang="ts">
import { CountdownBoard } from '@/components';

const targetT = new Date('2124-08-07 00:00:00').getTime();
</script>

<template>
  <div class="home-aside">
    <div class="countdown">
      <CountdownBoard title="距离稗田阿求杀出冥界还剩：" :target="targetT" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-aside {}
</style>