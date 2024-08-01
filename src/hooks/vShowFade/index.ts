import gsap from 'gsap';
import type { FFunction } from '@/types/type-utils';
import { useTimeoutFn } from '@vueuse/core';

/**
 * @deprecated 计划使用VisibleFade组件代替
 * @see VisibleFade
 * @param elem
 */
export const useVShowFade = (elem: string) => {
  
  const fadeStatus = ref(false);
  
  const setFadeStatus = (status: boolean) => {
    fadeStatus.value = status;
  }
  
  const fadeIn = (delay = 1000, onFadeIn?: FFunction) => {
    setFadeStatus(true);
    gsap.from(elem, {
      opacity: 0,
      duration: delay / 1000,
      ease: 'none'
    });
    useTimeoutFn(() => {
      onFadeIn && onFadeIn();
    }, delay);
  }
  
  const fadeOut = (delay = 1000, onFadeOut?: FFunction) => {
    gsap.to(elem, {
      opacity: 0,
      duration: delay / 1000 - 500,
      ease: 'none'
    })
    useTimeoutFn(() => {
      setFadeStatus(false);
      onFadeOut && onFadeOut();
    }, delay);
  }
  
  return { fadeStatus, setFadeStatus, fadeIn, fadeOut }
}