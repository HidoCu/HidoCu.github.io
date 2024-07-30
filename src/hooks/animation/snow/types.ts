import type { TIntRange } from '@/types/type-utils';

/**
 * @var CW 顺时针旋转
 * @var CCW 逆时针旋转
 */
export enum RotationMode {
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

export type TConfigId = number | string;

export type FIdGenerator = (index: number) => TConfigId;

export interface ICreateAnimationConfig {
  id?: TConfigId;
  
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
  rotation: RotationMode;
  
  /** 重复播放间隔 */
  broadcastDuration: number;
  
  /** 动画延迟 */
  delay: number;
  
  /** 颜色（建议使用rgba辅助函数） */
  color?: string;
}

export interface IAnimationConfig extends ICreateAnimationConfig {
  id: TConfigId;
}

export type TPosition =
  'start-top' | 'center-top' | 'end-top' |
  'start-center' | 'center' | 'end-center' |
  'start-bottom' | 'center-bottom' | 'end-bottom';
