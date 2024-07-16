
/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 */
export const random = (min: number, max: number) =>
  Math.floor(min + Math.random() * ((max + 1) - min));

