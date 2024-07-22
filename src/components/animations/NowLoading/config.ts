import { type TIntRange } from '@/types/type-utils'
import { rgba } from '@/utils/tools';

export enum RotationEnum {
  CW = 360,
  CCW = -360,
}

export interface ISakura {
  /** x轴是否采用百分比距离 */
  xPerMode: boolean;
  
  /** y轴是否采用百分比距离 */
  yPerMode: boolean;
  
  /** 起始x轴 */
  x: number;
  
  /** 起始y轴 */
  y: number;
  
  /** 起始结束动画播放时间 */
  beginEndDuration: number;
  
  /** 中间段播放时间 */
  duration: number;
  
  /** 首尾段移动距离 px */
  beginEndDistance: number;
  
  /** 中段移动距离 px */
  distance: number;
  
  /** 最大尺寸 */
  size: TIntRange<1, 301>;
  
  /** 自旋速度 */
  rotateDuration: number;
  
  /** 自旋方向（顺时针 | 逆时针） */
  rotation: RotationEnum;
  
  /** 重复播放间隔 */
  broadcastDuration: number;
  
  /** 颜色（建议使用rgba辅助函数） */
  color?: string;
}

const sakuraConfigList: ISakura[] = [
  {
    xPerMode: true,
    yPerMode: true,
    x: 10,
    y: 10,
    beginEndDuration: 1,
    duration: 3,
    beginEndDistance: 100,
    distance: 400,
    size: 100,
    rotateDuration: 5,
    rotation: RotationEnum.CW,
    broadcastDuration: 2
  },
  {
    xPerMode: true,
    yPerMode: true,
    x: 20,
    y: 35,
    beginEndDuration: 1,
    duration: 3,
    beginEndDistance: 130,
    distance: 460,
    size: 130,
    rotateDuration: 4,
    rotation: RotationEnum.CCW,
    broadcastDuration: 0,
  }
];

export default sakuraConfigList;
