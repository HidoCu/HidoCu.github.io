import { useWindowSize } from '@vueuse/core';
import type { TAxis } from '@/types/type-utils';
import { capitalize, debounce } from '@/utils';
import type { TBreakPoint, TBreakPointHandler, FFnHook, TTrigger } from './types';

export const BreakPointMap = Object.freeze(new Map<TBreakPoint, number>([
  ['mobile', 0],
  ['mobile-horiz', 480],
  ['pad', 768],
  
  ['tablet', 1024],
  ['desktop', 1280],
  ['large', 1440],
  
  ['xl', 1600],
  ['xxl', 1800],
  ['xxxl', 2000]
]));

export const useMediaWrapper = () => {
  const { width, height } = useWindowSize();
  
  /**
   * 根据断点名称获取响应回调名
   * @param respond 断点名
   */
  const _getHandlerByBreakPoint = (respond: TBreakPoint) =>
    `on${capitalize(respond)}` as TBreakPointHandler;
  
  /**
   * 当前屏幕宽高
   */
  const _axisMap = ref({
    x: width.value,
    y: height.value,
  });
  
  /**
   * 当前响应式断点
   */
  const breakPoint = ref<TBreakPoint>();
  
  /**
   * 本次更新前的，上一个断点
   */
  const _prevBreakPoint = ref<TBreakPoint>();
  
  /**
   * 获取当前窗口宽（x）或高（y）
   * @param axis
   */
  const getScreenAxisSize = (axis: TAxis) => _axisMap.value[axis];
  
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
  
  /**
   * 将实际像素宽度转换为窗口百分比
   * @param px （CSS）像素单位
   * @param axis 宽（x）或高（y）
   */
  const px2Percentage = (px: number, axis: TAxis) => {
    const screenAxisSize = getScreenAxisSize(axis);
    return Math.floor(px / screenAxisSize * 100);
  }
  
  /**
   * 断点监听器回调表
   */
  const _respondHandlerHolder = ref(new Map<TBreakPointHandler, TTrigger[]>());
  
  /**
   * 断点监听器
   * 当响应式断点发生变化时执行的回调（可多次注册）
   * @param breakPoint 监听的响应式断点
   * @param trigger 需要调用的回调函数
   * @example onRespond('desktop', desktopHandler);
   */
  const onRespond = (breakPoint: TBreakPoint, trigger: TTrigger) => {
    const handlerName = _getHandlerByBreakPoint(breakPoint);
    if (!_respondHandlerHolder.value.has(handlerName)) {
      _respondHandlerHolder.value.set(handlerName, []);
    }
    const handlerList = _respondHandlerHolder.value.get(handlerName)!;
    _respondHandlerHolder.value.set(handlerName, [...handlerList, trigger]);
  }
  
  /**
   * 更新当前响应式断点
   */
  const _updateBreakPoint = debounce(function (currentW: number) {
    for (let i = 0; i < BreakPointMap.size; i++) {
      const bpKey = Array.from(BreakPointMap.keys())[i];
      const bpKeyNext = Array.from(BreakPointMap.keys())[i + 1];
      
      const bpVal = BreakPointMap.get(bpKey)!;
      const bpValNext = BreakPointMap.get(bpKeyNext)! || Infinity;
      
      if (currentW >= bpVal && currentW < bpValNext) {
        _prevBreakPoint.value = breakPoint.value;
        breakPoint.value = bpKey;
        break;
      }
    }
  });
  
  watch(width, (newW) => {
    _updateBreakPoint(newW);
  }, { immediate: true });
  
  /**
   * 回调执行函数
   * 当断点发生变化时，执行回调表（respondHandlers）中对应的回调函数（序列）
   * @see respondHandlers
   * @param currentResp 当前响应式断点
   */
  const _respondHandlerExecutor = (currentResp: TBreakPoint) => {
    const handlerName = _getHandlerByBreakPoint(currentResp);
    if (_respondHandlerHolder.value.has(handlerName)) {
      const handlerList = _respondHandlerHolder.value.get(handlerName)!;
      handlerList.map(handler => handler({
        width: width.value,
        height: height.value,
        breakPoint: currentResp,
      }));
    }
  }
  
  watch(breakPoint, () => {
    _respondHandlerExecutor(breakPoint.value!);
  });
  
  const bpChangeHooks = ref<FFnHook[]>([]);
  const onBreakPointChange = (hook: FFnHook) => {
    bpChangeHooks.value.push(hook);
  }
  watch(breakPoint, () => {
    bpChangeHooks.value.map(hook => hook());
  }, { immediate: true });
  
  onBeforeUnmount(() => {
    _respondHandlerHolder.value.clear();
  });
  
  return {
    width,
    height,
    breakPoint,
    getScreenAxisSize,
    percentage2Px,
    px2Percentage,
    onRespond,
    onBreakPointChange,
  }
}