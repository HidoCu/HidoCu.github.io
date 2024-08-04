import type { IDocument, TIntRange } from '@/types/type-utils';
import type { IResourcesUsed } from '@/types';

/*
  tools和utils的区别
  我个人理解就是utils比较通用，复制到其他项目还能用
  tools跟项目耦合度比较大，基本就在某个环境下才能用了
  ...好吧我就是想分着玩玩
*/

/**
 * 返回一个CSS rgba色值函数
 * 如果是用在样式表里，记得拼接个分号
 * @param r 红色 0到255
 * @param g 绿色 0到255
 * @param b 蓝色 0到255
 * @param a 透明度 0到100
 * @return rgba(r, g, b, %a);
 */
export const rgba = (
  r: TIntRange<0, 256>,
  g: TIntRange<0, 256>,
  b: TIntRange<0, 256>,
  a: TIntRange<0, 101> = 100,
) => `rgba(${r}, ${g}, ${b}, ${a / 100})`;

/**
 * startViewTransition的兼容用法
 * 这玩意现在只有Chrome和edge(我没验证)能用
 * 管他呢，反正自娱自乐的玩意儿，啥都想搞一搞
 * 也没人看这破页面了
 * @param fn 切换主题函数
 * @see startViewTransition
 */
export const startViewTransitionSafe = (fn: () => void) => {
  const dom: IDocument = document;
  dom.startViewTransition ? dom.startViewTransition(fn) : fn();
}

export const defineResources = (resources: IResourcesUsed[]) => resources;
