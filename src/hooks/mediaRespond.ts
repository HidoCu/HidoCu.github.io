import { useWindowSize } from '@vueuse/core';
import type { TAxis } from '@/types/type-utils';
import { debounce } from '@/utils';

export enum EBreakPoint {
  mobile = 0,
  pad = 480,
  tablet = 768,
  desktop = 1024,
  tv = 1200
}

export type TBreakPoint = keyof typeof EBreakPoint;

const BreakPointRange = Object.freeze({
  mobile: [EBreakPoint.mobile, EBreakPoint.pad],
  pad: [EBreakPoint.pad, EBreakPoint.tablet],
  tablet: [EBreakPoint.tablet, EBreakPoint.desktop],
  desktop: [EBreakPoint.desktop, EBreakPoint.tv],
  tv: [EBreakPoint.tv, Infinity]
});

const BreakPointRangeKeyList = Object.keys(BreakPointRange);

export const useMediaRespond = () => {
  const { width, height } = useWindowSize();
  
  const axisMap = ref({
    x: width.value,
    y: height.value,
  });
  
  const respond = ref<TBreakPoint>('mobile');
  
  const getScreenAxisSize = (axis: TAxis) => axisMap.value[axis];
  
  /**
   * 将百分比单位转为实际屏幕像素（px）单位
   * @param per （CSS）百分比单位
   * @param axis 宽（x）或高（y）
   */
  const percentage2Px = (per: number, axis: TAxis) => {
    const per2Float = per / 100;
    const screenAxisSize = getScreenAxisSize(axis);
    return screenAxisSize * per2Float;
  }
  
  const updateRespond = debounce(function (currentW: number) {
    for (const key of BreakPointRangeKeyList) {
      const range = BreakPointRange[key as TBreakPoint];
      if (currentW >= range[0] && currentW < range[1]) {
        console.log('respond to', key);
        respond.value = key as TBreakPoint;
        break;
      }
    }
  });
  
  watch(width, (newWidth) => {
    updateRespond(newWidth);
  }, { immediate: true });
  
  return { respond, getScreenAxisSize, percentage2Px }
}