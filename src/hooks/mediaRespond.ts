import { useWindowSize } from '@vueuse/core';
import type { TAxis } from '@/types/type-utils';
import { capitalize, debounce } from '@/utils';

export type TBreakPoint = 'mobile' | 'pad' | 'tablet' | 'desktop' | 'tv';

export const BreakPointMap = Object.freeze(new Map<TBreakPoint, number>([
  ['mobile', 0],
  ['pad', 480],
  ['tablet', 768],
  ['desktop', 1024],
  ['tv', 1200],
]));

type TBreakPointHandler = `on${Capitalize<TBreakPoint>}`;
type IRespond = Partial<{ [K in TBreakPointHandler]: THandler[] }>;

interface IHandlerArgs {
  width: number;
  height: number;
  breakPoint: TBreakPoint;
}
type THandler = (ctx: IHandlerArgs) => any;

const getHandlerByBreakPoint = (respond: TBreakPoint) =>
  `on${capitalize(respond)}` as TBreakPointHandler;

export const useMediaRespond = () => {
  const { width, height } = useWindowSize();
  
  /**
   * 当前屏幕宽高
   */
  const axisMap = ref({
    x: width.value,
    y: height.value,
  });
  
  /**
   * 当前响应式断点
   */
  const respond = ref<TBreakPoint>();
  
  /**
   * 本次更新前的，上一个断点
   */
  const lastRespond = ref<TBreakPoint>();
  
  /**
   * 获取当前窗口宽（x）或高（y）
   * @param axis
   */
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
  
  /**
   * 断点监听器回调表
   */
  const respondHandlers = ref<IRespond>({});
  
  /**
   * 当前断点监听器回调（序列）执行的返回值数组
   * 结果顺序为监听器注册顺序
   */
  const handlerResults = ref<any[]>();
  
  /**
   * 断点监听器
   * 当响应式断点发生变化时执行的回调（可多次注册）
   * @param respondTo 监听的响应式断点
   * @param handler 需要调用的回调函数
   * @example onRespond('desktop', handler);
   */
  const onRespond = (respondTo: TBreakPoint, handler: THandler) => {
    const handlerName = getHandlerByBreakPoint(respondTo);
    const handlerList = respondHandlers.value[handlerName];
    if (!handlerList) {
      respondHandlers.value[handlerName] = [handler];
    } else {
      respondHandlers.value[handlerName]!.push(handler);
    }
  }
  
  /**
   * 更新当前响应式断点
   */
  const updateRespond = debounce(function (currentW: number) {
    console.log('update', currentW);
    for (let i = 0; i < BreakPointMap.size; i++) {
      const bpKey = Array.from(BreakPointMap.keys())[i];
      const bpKeyNext = Array.from(BreakPointMap.keys())[i + 1];
      
      const bpVal = BreakPointMap.get(bpKey)!;
      const bpValNext = BreakPointMap.get(bpKeyNext)! || Infinity;
      
      if (currentW >= bpVal && currentW < bpValNext) {
        lastRespond.value = respond.value;
        respond.value = bpKey;
        break;
      }
    }
  });
  
  watch(width, (newW) => {
    updateRespond(newW);
  }, { immediate: true });
  
  /**
   * 回调执行函数
   * 当断点发生变化时，执行回调表（respondHandlers）中对应的回调函数（序列）
   * @see respondHandlers
   * @param currentResp 当前响应式断点
   */
  const executeRespondHandler = (currentResp: TBreakPoint) => {
    const handlerName = getHandlerByBreakPoint(currentResp);
    const handlers = respondHandlers.value[handlerName];
    if (handlers) {
      return handlers.map(handler => handler({
        width: width.value,
        height: height.value,
        breakPoint: currentResp,
      }));
    }
  }
  
  watch(respond, (newResp) => {
    if (newResp) {
      handlerResults.value = executeRespondHandler(newResp);
    }
  });
  
  return {
    respond,
    getScreenAxisSize,
    percentage2Px,
    onRespond,
    handlerResults
  }
}