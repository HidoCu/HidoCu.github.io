import type { PickOptional, TAxis, TIntRange } from '@/types/type-utils';

/**
 * @var CW 顺时针旋转
 * @var CCW 逆时针旋转
 */
export enum RotationMode {
  CW = 360,
  CCW = -360,
}

/**
 * 以负向y轴
 * @var PO 向右偏移
 * @var NE 向左偏移
 */
export enum VectorMode {
  PO = 1,
  NE = -1
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

/**
 * 动画在X轴上的偏移量
 * 以负Y轴为中轴，向左向右偏移角度45°范围
 * [偏移角度, 偏移方向]
 * 使用正切，从角度和y轴运动距离计算出对应x轴距离
 * @see TIntRange
 * @see VectorMode
 */
export type TOffsetAngle = [TIntRange<0, 46>, VectorMode];

/**
 * 动画配置对象
 * 找个地方手写，然后放到创建配置的函数里
 * 挺麻烦的就...
 */
export interface ICreateAnimationConfig {
  /** 起始x轴 */
  x: IDistance;
  
  /** 起始y轴 */
  y: IDistance;
  
  /** 首尾动画播放时间 */
  beginEndDuration: number;
  
  /** 中间段播放时间 */
  duration: number;
  
  /** 首尾段移动距离 px */
  beginEndDistance: IDistance;
  
  /** 中段移动距离 px */
  distance: IDistance;
  
  /** 移动过程中的偏移角 */
  offsetAngle?: TOffsetAngle;
  
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

/**
 * 生成后动画配置对象编号，用于生成到唯一动画对象的选择器
 */
export type TConfigId = number | string;

/**
 * 动画配置对象
 * 包含了更多默认配置选项
 * 一般由配置自动导出，无需手写
 * @see FIdGenerator
 * @see IRevision
 * @see IDefaultConfig
 */
export interface IAnimationConfig extends ICreateAnimationConfig {
  id: TConfigId;
  revision?: [number, number];
}

/**
 * 用于根据动画配置对象编号生成唯一标识（选择器）的函数
 */
export type FSelectorGenerator = (targetSelector: TConfigId) => string;

/**
 * 用于生成动画配置对象编号的函数（需满足编号唯一性）
 */
export type FIdGenerator = (index: number) => TConfigId;

/**
 * 动画配置对象默认值
 * 涵盖配置对象中的一些可选属性和额外属性
 *  @var color （可选）对象默认颜色
 *  @var offsetAngle （可选）下落过程中X偏移量
 *  @var xOffset （额外）动画整体在x轴上的偏移量(px)
 *  @var yOffset （额外）动画整体在y轴上的偏移量(px)
 *  @see TOffsetAngle
 */
export type IDefaultConfig = Partial<PickOptional<ICreateAnimationConfig>> & {
  xOffset?: number,
  yOffset?: number,
}

/**
 * 配置对象生成函数参数
 * 使用ICreateAnimationConfig根据一定规则生成IAnimationConfig
 * @var idGenerator 唯一配置对象编号生成器
 * @var configs 配置对象列表
 * @var defaultConfig 默认配置对象
 * @see ICreateAnimationConfig
 * @see IAnimationConfig
 */
export interface ICreateAnimationConfigFunctionArgs {
  idGenerator: FIdGenerator;
  configs: ICreateAnimationConfig[];
  defaultConfig?: IDefaultConfig;
}

/**
 * 动画整体的偏移量
 * @var val 实际偏移量(px)
 * @var axis 坐标轴方向
 */
export interface IRevision {
  val: number;
  axis: TAxis;
}