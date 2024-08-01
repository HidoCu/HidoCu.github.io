import { defineStore } from 'pinia';
import type { FFunction } from '@/types/type-utils';

export const useLoadingStore = defineStore('loading', () => {
  /**
   * （全屏）加载状态
   */
  const loadingStatus = ref(false);
  
  /**
   * 加载时的动画
   * 加载时间较短不推荐开启
   */
  const withAnimation = ref(false);
  
  /**
   * 是否开始/结束加载（默认开始）
   * @param state 开始 / 结束加载状态
   * @param animation 是否需要加载动画（默认否）
   */
  const loading = (state = true, animation = false) => {
    loadingStatus.value = state;
    withAnimation.value = animation;
  }
  
  /**
   * delay （全屏）加载完成后延迟结束加载状态
   * 调用时，表示加载已完成，但会在指定时间后关闭页面加载效果（将isLoading状态设置为false）
   * @param delay 自动完成加载时间
   * @param onLoadingDone 关闭加载效果后的回调
   */
  const delayDone = (delay = 1000, onLoadingDone?: FFunction) => {
    if (delay <= 0) {
      loading(false);
      withAnimation.value = false;
      return;
    }
    const id = setTimeout(() => {
      loading(false);
      withAnimation.value = false;
      onLoadingDone && onLoadingDone();
      clearTimeout(id);
    }, delay);
  }
  
  return {
    loadingStatus,
    withAnimation,
    loading,
    delayDone
  }
});
