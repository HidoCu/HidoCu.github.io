<script setup lang="ts">

const props = withDefaults(defineProps<{
  target: number,
  title?: string,
}>(), {
  title: ''
});

const calcRemaining = (milliseconds: number) => {
  const now = new Date().getTime(); // 当前时间的毫秒数
  const timeDiff = milliseconds - now; // 计算时间差


  if (timeDiff <= 0) {
    throw new Error('Time has already passed!');
  }

  // 1天等于24小时 * 60分钟 * 60秒 * 1000毫秒
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  // 计算完整天数
  const days = Math.floor(timeDiff / oneDayInMilliseconds);

  // 计算剩余的毫秒数
  const remainingMilliseconds = timeDiff % oneDayInMilliseconds;

  return {
    days,
    remainingMilliseconds
  };
}

const res = calcRemaining(props.target);

const days = res.days;
const duration = ref(res.remainingMilliseconds);

</script>

<template>
  <div class="countdown-container">
    <div class="countdown-container-inner">
      <div v-if="title" class="countdown-title">{{ title }}</div>
      <div class="countdown-board">
        <section v-if="days >= 0" class="countdown-days">{{ days }}</section>
        <section class="countdown-hours">
          <n-countdown :duration="duration" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.countdown-container {
  background-color: var(--bg-color-main);
  color: var(--text-color-main);
  border-radius: 10px;
  padding: 10px;

  .countdown-container-inner {
    //border: 2px solid var(--text-color-sub);
    //border-radius: 6px;
    //padding: 10px;

    .countdown-title {
      font-size: 16px;
      //font-weight: 600;
    }

    .countdown-board {
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      border: 2px solid var(--theme-color-warning);
      border-radius: 6px;
      margin-top: 6px;

      .countdown-days {
        font-size: 24px;
        color: var(--theme-color-error);

        &::after {
          content: '天';
          font-size: 16px;
          padding-left: 8px;
          color: var(--text-color-main);
        }
      }

      .countdown-hours {
        font-size: 18px;
      }
    }
  }
}
</style>