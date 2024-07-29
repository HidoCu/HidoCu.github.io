import { defineStore } from 'pinia';
import type { TFunction } from '@/types/type-utils';

export const useLoadingStore = defineStore('loading', () => {
  /**
   * （全屏）加载状态
   */
  const loadingState = ref(false);
  
  /**
   * 是否开始/结束加载（默认开始）
   * @param state 开始 / 结束加载状态
   */
  const loading = (state = true) => {
    loadingState.value = state;
  }
  
  /**
   * 一个更加轻量化的加载状态
   */
  const spinState = ref(false);
  
  /**
   * 是否开始/结束加载（默认开始）
   * @param state 开始 / 结束加载状态
   */
  const spin = (state = true) => {
    spinState.value = state;
  }
  
  /**
   * delay （全屏）加载完成后延迟结束加载状态
   * 调用时，表示加载已完成，但会在指定时间后关闭页面加载效果（将isLoading状态设置为false）
   * @param delay 自动完成加载时间
   * @param onLoadingDone 关闭加载效果后的回调
   */
  const delayDone = (delay = 1000, onLoadingDone?: TFunction) => {
    if (delay <= 0) {
      loading(false);
      return;
    }
    const id = setTimeout(() => {
      loading(false);
      onLoadingDone && onLoadingDone();
      clearTimeout(id);
    }, delay);
  }
  
  return {
    loadingState,
    spinState,
    loading,
    spin,
    delayDone
  }
});
