import { type TIntRange } from '@/types/type-utils'

export enum ERotation {
  CW = 360,
  CCW = -360,
}

/**
 * 对应坐标轴距离
 * @var val 距离数值
 * @var perUnit 是否像百分比单位（默认像素）
 * @var reverse 是否于right/bottom计算（默认left/top）
 */
export interface IDistance {
  val: number;
  perUnit?: boolean;
  reverse?: boolean;
}

export interface IAnimationItemConfig {
  /** 起始x轴 */
  x: IDistance;
  
  /** 起始y轴 */
  y: IDistance;
  
  /** 起始结束动画播放时间 */
  beginEndDuration: number;
  
  /** 中间段播放时间 */
  duration: number;
  
  /** 首尾段移动距离 px */
  beginEndDistance: IDistance;
  
  /** 中段移动距离 px */
  distance: IDistance;
  
  /** 最大尺寸 */
  size: TIntRange<1, 501>;
  
  /** 自旋速度 */
  rotateDuration: number;
  
  /** 自旋方向（顺时针 | 逆时针） */
  rotation: ERotation;
  
  /** 重复播放间隔 */
  broadcastDuration: number;
  
  /** 动画延迟 */
  delay: number;
  
  /** 颜色（建议使用rgba辅助函数） */
  color?: string;
}

const animationItemConfigs: IAnimationItemConfig[] = [
  /* batch 1 average */
  // 0
  {
    x: {
      val: 12,
      perUnit: true,
    },
    y: {
      val: 16,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 400,
    },
    beginEndDuration: 1,
    duration: 4,
    size: 240,
    rotateDuration: 5,
    rotation: ERotation.CW,
    broadcastDuration: 2,
    delay: 0,
  },
  
  // 1
  {
    x: {
      val: 32,
      perUnit: true,
    },
    y: {
      val: 43,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 400,
    },
    beginEndDuration: 1,
    duration: 4,
    size: 180,
    rotateDuration: 4,
    rotation: ERotation.CCW,
    broadcastDuration: 1,
    delay: .2,
  },
  
  // 2
  {
    x: {
      val: 55,
      perUnit: true,
    },
    y: {
      val: 31,
      perUnit: true,
    },
    beginEndDistance: {
      val: 80,
    },
    distance: {
      val: 630,
    },
    beginEndDuration: 1,
    duration: 6,
    size: 140,
    rotateDuration: 4,
    rotation: ERotation.CCW,
    broadcastDuration: .5,
    delay: .5,
  },
  
  // 3
  {
    x: {
      val: 74,
      perUnit: true,
    },
    y: {
      val: 7,
      perUnit: true,
    },
    beginEndDistance: {
      val: 110,
    },
    distance: {
      val: 520,
    },
    beginEndDuration: 1,
    duration: 5,
    size: 140,
    rotateDuration: 4,
    rotation: ERotation.CW,
    broadcastDuration: 1,
    delay: 1.2,
  },
  
  // 4
  {
    x: {
      val: 91,
      perUnit: true,
    },
    y: {
      val: 65,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 320,
    },
    beginEndDuration: 1,
    duration: 5,
    size: 140,
    rotateDuration: 3,
    rotation: ERotation.CCW,
    broadcastDuration: 1,
    delay: 1.2,
  },
  
  /* batch 2 low place */
  // 0-5
  {
    x: {
      val: 5,
      perUnit: true,
    },
    y: {
      val: 32,
      perUnit: true,
    },
    beginEndDistance: {
      val: 120,
    },
    distance: {
      val: 45,
      perUnit: true
    },
    beginEndDuration: .7,
    duration: 3,
    size: 120,
    rotateDuration: 4.5,
    rotation: ERotation.CCW,
    broadcastDuration: .2,
    delay: .5,
  },
  
  // 1-6
  {
    x: {
      val: 25,
      perUnit: true,
    },
    y: {
      val: 6,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 60,
      perUnit: true
    },
    beginEndDuration: 2,
    duration: 12,
    size: 240,
    rotateDuration: 7,
    rotation: ERotation.CCW,
    broadcastDuration: 1,
    delay: 2,
  },
  
  // 2-7
  {
    x: {
      val: 48,
      perUnit: true,
    },
    y: {
      val: 71,
      perUnit: true,
    },
    beginEndDistance: {
      val: 160,
    },
    distance: {
      val: 320,
    },
    beginEndDuration: 2.5,
    duration: 6,
    size: 200,
    rotateDuration: 8,
    rotation: ERotation.CW,
    broadcastDuration: 2,
    delay: .7,
  },
  
  // 3-8
  {
    x: {
      val: 69,
      perUnit: true,
    },
    y: {
      val: 50,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 430,
    },
    beginEndDuration: .8,
    duration: 3,
    size: 170,
    rotateDuration: 4,
    rotation: ERotation.CW,
    broadcastDuration: 1.4,
    delay: 1.8,
  },
  
  // 4-9
  {
    x: {
      val: 85,
      perUnit: true,
    },
    y: {
      val: 17,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 70,
      perUnit: true
    },
    beginEndDuration: 1,
    duration: 8,
    size: 250,
    rotateDuration: 9,
    rotation: ERotation.CW,
    broadcastDuration: 1,
    delay: 2.5,
  },
  
  /* batch 3 high place */
  // 0-5-10
  {
    x: {
      val: 9,
      perUnit: true,
    },
    y: {
      val: -15,
      perUnit: true,
    },
    beginEndDistance: {
      val: 100,
    },
    distance: {
      val: 40,
      perUnit: true
    },
    beginEndDuration: 1,
    duration: 5,
    size: 150,
    rotateDuration: 5,
    rotation: ERotation.CW,
    broadcastDuration: .5,
    delay: .4,
  },
  
  // 1-6-11
  {
    x: {
      val: 31,
      perUnit: true,
    },
    y: {
      val: -7,
      perUnit: true,
    },
    beginEndDistance: {
      val: 150,
    },
    distance: {
      val: 45,
      perUnit: true
    },
    beginEndDuration: 3,
    duration: 15,
    size: 160,
    rotateDuration: 10,
    rotation: ERotation.CW,
    broadcastDuration: .2,
    delay: 0.5,
  },
  
  // 2-7-12
  {
    x: {
      val: 47,
      perUnit: true,
    },
    y: {
      val: -25,
      perUnit: true,
    },
    beginEndDistance: {
      val: 140,
    },
    distance: {
      val: 80,
      perUnit: true,
    },
    beginEndDuration: 1.2,
    duration: 8,
    size: 350,
    rotateDuration: 5,
    rotation: ERotation.CW,
    broadcastDuration: 5,
    delay: .5,
  },
  
  // 3-8-13
  {
    x: {
      val: 67,
      perUnit: true,
    },
    y: {
      val: -15,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 530,
    },
    beginEndDuration: .8,
    duration: 4,
    size: 180,
    rotateDuration: 4,
    rotation: ERotation.CCW,
    broadcastDuration: .2,
    delay: 1.25,
  },
  
  // 4-9-14
  {
    x: {
      val: 88,
      perUnit: true,
    },
    y: {
      val: -10,
      perUnit: true,
    },
    beginEndDistance: {
      val: 90,
    },
    distance: {
      val: 70,
      perUnit: true
    },
    beginEndDuration: 1,
    duration: 8,
    size: 220,
    rotateDuration: 5,
    rotation: ERotation.CCW,
    broadcastDuration: .6,
    delay: 2,
  },
];

export default animationItemConfigs;
