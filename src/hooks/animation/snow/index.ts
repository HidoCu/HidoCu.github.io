import type { Ref, UnwrapRef } from 'vue';
import type {
  FIdGenerator,
  FSelectorGenerator,
  IAnimationConfig,
  ICreateAnimationConfigFunctionArgs,
  IDistance,
  IRevision,
  TConfigId,
  TOffsetAngle,
} from './types';
import { useMediaWrapper } from '@/hooks';
import type { TAxis } from '@/types/type-utils';
import gsap from 'gsap';
import { v4 as uuidV4 } from 'uuid';

export const autoIncrementGenerator: FIdGenerator = (index: number) => index + 1;
export const uuidGenerator: FIdGenerator = (_index: number) => uuidV4();

/**
 * 创建动画配置对象
 * @param configObject 动画配置对象
 * @param configObject.idGenerator 编号生成规则函数
 * @param configObject.configs 动画配置对象
 * @param configObject.defaultConfig  默认配置（为配置对象的可选配置提供默认值）
 */
export const createAnimationConfigs = (configObject: ICreateAnimationConfigFunctionArgs) => {
  const { idGenerator, configs, defaultConfig } = configObject;
  const idHistoryList: TConfigId[] = [];
  return configs.map((config, index) => {
    const id = idGenerator(index);
    if (idHistoryList.includes(id)) {
      throw new Error(`ID: ${id} is repeated in the history list [${idHistoryList}]`);
    }
    idHistoryList.push(id);
    
    let revision: [number, number] = [0, 0];
    if (defaultConfig) {
      config.color = config.color ?? defaultConfig.color;
      config.offsetAngle = config.offsetAngle ?? defaultConfig.offsetAngle;
      
      const defaultXOffset = defaultConfig.xOffset || 0;
      const defaultYOffset = defaultConfig.yOffset || 0;

      revision = [defaultXOffset, defaultYOffset];
    }
    return { id, revision, ...config, } as IAnimationConfig;
  });
}

export const useSnowAnimation = (animationConfigs: Ref<UnwrapRef<IAnimationConfig[]>>) => {
  const { percentage2Px, px2Percentage } = useMediaWrapper();
  
  /**
   * 书写动画对象选择器
   * 使用该函数设置动画对象的类名，并将循环下标传进来生成动态类名
   * @param selector 选择器
   * @param config 目标动画配置对象，其ID属性参与构成完整选择器
   * @return 处理后的选择器名
   * @example
   *  <ul
   *      :style="{
   *        position: 'relative',
   *        width: '100vw',
   *        height: '100vh'
   *      }"
   *      v-for="(animationConfig, index) in animationList"
   *      :key="animationConfig.id">
   *    <li
   *        :style="{ position: 'absolute' }"
   *        :class=[setSelector('.animation-item', animationConfig)]>
   *      <AnimationItem :some-props="animationConfig" />
   *    </li>
   *  </ul>
   */
  const setSelector = (selector: string, config: IAnimationConfig) => selector + config.id;
  
  /**
   * 根据距离配置对象直接导出css属性值
   * @param distance 对应坐标轴距离
   * @param revision 偏移修正值（默认0）
   */
  const _getDistanceCSSProp = (distance: IDistance, revision: IRevision) => {
    const { val: revisionVal, axis } = revision;
    let cssUnit: 'px' | '%' = 'px';
    let cssRevision = revisionVal;
    if (distance.perUnit) {
      cssUnit = '%';
      cssRevision = px2Percentage(cssRevision, axis);
    }
    return `${distance.val + cssRevision}${cssUnit}`;
  }
  
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
   * @param serial 目标动画元素序列
   * @param target 目标动画元素配置对象
   */
  const getInitOffsetStyle = (serial: number, target: IAnimationConfig) => {
    const { x, y } = target;
    
    let [offsetX, offsetY] = [0, 0];
    if (target.revision) {
      [offsetX, offsetY] = target.revision;
    }
    
    const screenX = _getDistanceCSSProp(x, { val: offsetX, axis: 'x' });
    const screenY = _getDistanceCSSProp(y, { val: offsetY, axis: 'y' });
    
    const offsetXProp = x.reverse ? 'right' : 'left';
    const offsetYProp = y.reverse ? 'bottom' : 'top';
    
    return {
      '--serial': serial,
      [offsetYProp]: screenY,
      [offsetXProp]: screenX
    }
  }
  
  const _calcAngle2Distance = (offsetAngle: TOffsetAngle, adjLen: number) => {
    const [angle, vector] = offsetAngle;
    const radians = angle * (Math.PI / 180);
    const tan = Math.tan(radians);
    return adjLen * tan * vector;
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
    const beginEndDistanceVal = _calcDistance(config.beginEndDistance, 'y');
    const distanceVal = _calcDistance(config.distance, 'y');
    
    const calcStartDistanceVal = beginEndDistanceVal;
    const calcDistanceVal = calcStartDistanceVal + distanceVal;
    const calcEndDistanceVal = calcDistanceVal + beginEndDistanceVal;
    
    let calcBeginXOffsetDistance = 0;
    let calcXOffsetDistance = 0;
    let calcEndXOffsetDistance = 0;
    
    if (config.offsetAngle) {
      const beginEndXOffsetDistance = _calcAngle2Distance(config.offsetAngle, beginEndDistanceVal);
      const xOffsetDistance = _calcAngle2Distance(config.offsetAngle, distanceVal);
      
      calcBeginXOffsetDistance = beginEndXOffsetDistance;
      calcXOffsetDistance = calcBeginXOffsetDistance + xOffsetDistance;
      calcEndXOffsetDistance = calcXOffsetDistance + beginEndXOffsetDistance;
    }
    
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
        x: calcBeginXOffsetDistance,
        y: calcStartDistanceVal,
        duration: config.beginEndDuration,
      }, '<')
      // 下落
      .to(selector, {
        ...defaultConfig,
        x: calcXOffsetDistance,
        y: calcDistanceVal,
        duration: config.duration,
      })
      // 尾段缩放
      .to(selector, {
        ...defaultConfig,
        x: calcEndXOffsetDistance,
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
   * @param selector 使用 setSelector设置的选择器名（需要带上对应的选择器）
   * @see setSelector
   * @param defaultConfig 默认配置
   * @example
   *  <div ... :id="setSelector('example-id-selector', animationConfig)"></div>
   *  ...
   *  onMounted(() => {
   *    registerAnimation('#example-id-selector');
   *  });
   */
  const registerAnimation = (selector: string | FSelectorGenerator, defaultConfig: Record<string, any> = {}) => {
    const selectorFn =
      typeof selector === 'string' ?
        (configId: TConfigId) => selector + configId : selector;
    toValue(animationConfigs).map(animationConfig => {
      const targetSelector = selectorFn(animationConfig.id);
      _setAnimation(animationConfig, targetSelector, defaultConfig);
    });
  }
  
  return {
    setSelector,
    registerAnimation,
    getInitOffsetStyle
  }
}
