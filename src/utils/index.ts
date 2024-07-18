/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 */
export const random = (min: number, max: number) =>
  Math.floor(min + Math.random() * ((max + 1) - min));

/**
 * 过滤掉对象中指定的属性
 * @param target 目标对象
 * @param blackList 要过滤的属性列表
 * @return 不包含blackList中的属性的新对象
 */
export const filterProps = <
  T extends Record<string, any>,
  K extends keyof T
>(target: T, blackList: K[]): Omit<T, K> => Object.fromEntries(
  Object
    .entries(target)
    .filter(([key]) => !blackList.includes(key as K))
) as Omit<T, K>;

/**
 * 根据指定大小分割数组
 * @param arr 原数组
 * @param size 子数组大小（默认4）
 * @return 子数组组成的数组
 */
export const spArr = <T>(arr: T[], size = 4) => {
  if (size <= 0) {
    throw new Error('Size must be greater than 0');
  }
  if (arr.length === 0) {
    return [[]];
  }
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  );
};

/**
 * 从指定数组中切割一段，并返回切割后的完整数组
 * @param arr 原数组
 * @param start 起始位置（默认0）
 * @param size 分片长度（默认5）
 * @return 子数组组成的数组
 */
export const cutArr = <T>(arr: T[], start = 0, size = 5) => {
  if (start < 0 ||
      size <= 0 ||
      start >= arr.length ||
      size > arr.length ||
      start + size > arr.length) {
    throw new Error('切片取值越界！')
  }
  if (arr.length === size) {
    return [arr];
  }
  if (start === 0) {
    return [
      arr.slice(0, size),
      arr.slice(size)
    ];
  }
  const end = size + start;
  return [
    arr.slice(0, start),
    arr.slice(start, end),
    arr.slice(end)
  ].filter(item => item.length !== 0);
}

export const isHexColor = (c: string) => {
  const HexValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  const HexColorLen = [3, 4, 6, 8];
  if (!c.startsWith('#')) {
    return false;
  }
  const color = c.toLowerCase().slice(1);
  if (!HexColorLen.includes(color.length)) {
    return false;
  }
  for (let colorChar of color) {
    if (!HexValue.includes(colorChar))
      return false;
  }
  return true;
}