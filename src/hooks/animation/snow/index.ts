import type { UnwrapRef } from 'vue';
import type { IAnimationConfig, IDistance } from './types';
import { useMediaWrapper } from '@/hooks';
import type { TAxis } from '@/types/type-utils';
import gsap from 'gsap';

export const useSnowAnimation = (animationConfigs: Ref<UnwrapRef<IAnimationConfig[]>>) => {
  const { percentage2Px } = useMediaWrapper();
  
  /**
   * 书写动画对象选择器
   * 使用该函数设置动画对象的类名，并将循环下标传进来生成动态类名
   * @param selector 选择器
   * @param config 目标动画配置对象，其ID属性参与构成完整选择器
   * @example
   *  <ul v-for="(item, index) in animationList" :key="item.id">
   *    <li :class=[setSelector('.animation-item', item.id)]>{{ item }}</li>
   *  </ul>
   */
  const setSelector = (selector: string, config: IAnimationConfig) => selector + config.id;
  
  /**
   * 根据距离配置对象直接导出css属性值
   * @param distance 对应坐标轴距离
   */
  const _getDistanceCSSProp = (distance: IDistance) =>
    `${distance.val}${distance.perUnit ? '%' : 'px'}`;
  
  /**
   * 将百分比形式距离根据屏幕大小换算为实际的像素值（px）
   * @param distance 对应坐标轴距离
   * @param axis 换算到的坐标
   */
  const _calcDistance = (distance: IDistance, axis: TAxis) =>
    distance.perUnit ?
      Math.round(percentage2Px(distance.val, axis)) :
      distance.val;
  
  /**
   * 计算初始定位位置
   * @param index 目标动画元素序列
   * @param target 目标动画元素配置对象
   */
  const getInitOffsetStyle = (index: number, target: IAnimationConfig) => {
    const { x, y } = target;
    
    const screenX = _getDistanceCSSProp(x);
    const screenY = _getDistanceCSSProp(y);
    
    const offsetXProp = x.reverse ? 'right' : 'left';
    const offsetYProp = y.reverse ? 'bottom' : 'top';
    
    return {
      '--i': index,
      [offsetYProp]: screenY,
      [offsetXProp]: screenX
    }
  }
  
  /**
   * 根据配置对象设置每一个元素的动画
   * @param config 元素动画配置对象
   * @param selector 元素选择器
   * @param defaultConfig 所有动画的默认配置（如动画函数）
   */
  const _setAnimation = (
    config: IAnimationConfig,
    selector: string,
    defaultConfig: object = {}
  ) => {
    const calcStartDistanceVal = _calcDistance(config.beginEndDistance, 'y');
    const calcDistanceVal = calcStartDistanceVal + _calcDistance(config.distance, 'y');
    const calcEndDistanceVal = calcDistanceVal + _calcDistance(config.beginEndDistance, 'y');
    
    gsap.to(selector, {
      ...defaultConfig,
      rotate: config.rotation,
      duration: config.rotateDuration,
      repeat: -1,
    });
    
    gsap.timeline({
      repeat: -1,
      delay: config.delay,
    })// 初始态
      .from(selector, {
        ...defaultConfig,
        scale: 0,
        opacity: 0,
      })
      // 初段出现
      .to(selector, {
        ...defaultConfig,
        y: calcStartDistanceVal,
        duration: config.beginEndDuration,
      }, '<')
      // 下落
      .to(selector, {
        ...defaultConfig,
        y: calcDistanceVal,
        duration: config.duration,
      })
      // 尾段缩放
      .to(selector, {
        ...defaultConfig,
        y: calcEndDistanceVal,
        duration: config.beginEndDuration,
      })
      // 消失
      .to(selector, {
        ...defaultConfig,
        scale: 0,
        opacity: 0,
        duration: 1,
      }, '<')
      // 下次刷新等待
      .to(selector, {
        duration: config.broadcastDuration,
      });
  }
  
  /**
   * 根据动画配置对象添加动画
   * 默认按照配置对象的序列注册动画
   * @param prefix 元素选择器前缀
   * @param defaultConfig 默认配置
   */
  const registerAnimation = (prefix: string, defaultConfig: Record<string, any> = {}) => {
    toValue(animationConfigs).map(animationConfig => {
      const selector = prefix + animationConfig.id;
      _setAnimation(animationConfig, selector, defaultConfig);
    });
  }
  
  return {
    setSelector,
    registerAnimation,
    getInitOffsetStyle
  }
}
