import { type TIntRange } from '@/types/type-utils'
import { rgba } from '@/utils/tools';

export enum ERotation {
  CW = 360,
  CCW = -360,
}

/**
 * 对应坐标距离 [距离，是否百分比]
 */
export type TDistance = [number, boolean];

export interface ISakura {
  /** 起始x轴 */
  x: TDistance;
  
  /** 起始y轴 */
  y: TDistance;
  
  /** 起始结束动画播放时间 */
  beginEndDuration: number;
  
  /** 中间段播放时间 */
  duration: number;
  
  /** 首尾段移动距离 px */
  beginEndDistance: TDistance;
  
  /** 中段移动距离 px */
  distance: TDistance;
  
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

const sakuraConfigList: ISakura[] = [
  {
    x: [10, true],
    y: [10, true],
    beginEndDuration: 1,
    duration: 3,
    beginEndDistance: [100, false],
    distance: [400, false],
    size: 100,
    rotateDuration: 5,
    rotation: ERotation.CW,
    broadcastDuration: 2,
    delay: 1,
  },
  {
    x: [20, true],
    y: [35, true],
    beginEndDuration: 1,
    duration: 3,
    beginEndDistance: [130, false],
    distance: [400, false],
    size: 130,
    rotateDuration: 4,
    rotation: ERotation.CCW,
    broadcastDuration: 0,
    delay: 0
  }
];

export default sakuraConfigList;
