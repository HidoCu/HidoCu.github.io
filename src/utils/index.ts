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
    throw new Error('切片取值越界！');
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

/**
 * 数组分页
 * @param arr 目标数组
 * @param index 页码
 * @param size 每页条目数目（默认10）
 */
export const paginArr = <T>(arr: T[], index: number, size = 10) => {
  const MAX_IDX = Math.ceil(arr.length / size);
  if (index > MAX_IDX) {
    throw new Error(`Index ${index} is out of range. Max index is ${MAX_IDX}`);
  }
  if (index <= 0) {
    throw new Error(`Index ${index} is out of range. Index must be greater than 0`);
  }
  const start = (index - 1) * size;
  const end = start + size;
  return arr.slice(start, end);
}

/**
 * 是否十六进制颜色
 * @param c 色值字符串
 * @return boolean
 * @example isHexColor('#f5ae2c');
 */
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
  for (const colorChar of color) {
    if (!HexValue.includes(colorChar)) {
      return false;
    }
  }
  return true;
}

/**
 * 获取一个随机HEX色值
 */
export const randomHexColor = () => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex.padStart(6, '0')}`;
}

/**
 * 防抖
 * @param fn 目标函数
 * @param duration 延时，默认0.3s
 * @return 防抖后的函数
 */
export function debounce<ARG extends any[], R>(
    fn: (...args: ARG) => R,
    duration: number = 300
): (...args: ARG) => void {
  let timer: any;
  return function (this: any, ...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer)
    }, duration);
  }
}

/**
 * 节流
 * @param fn 目标函数
 * @param duration 延时，默认0.2s
 * @return 节流后的函数
 */
export function throttle<ARG extends any[], R>(
  fn: (...args: ARG) => R,
  duration: number = 200
): (...args: ARG) => void {
  let timer: any;
  return function (this: any, ...args) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
      timer = null;
    }, duration);
  }
}

/**
 * 单词首字母大写
 * @param str 目标字符串
 * @return 首字母大写字符串
 */
export const capitalize = (str: string) =>
    !str ? str : str.charAt(0).toUpperCase() + str.slice(1);

/**
 * 目标是否为函数
 * @param target
 */
export const isFunction = (target: any) =>
  Object.prototype.toString.call(target) === '[object Function]';

/**
 * 大驼峰命名转短横线
 * @param str 目标串
 */
export const upperCamel2Kebab = (str: string) => str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 在小写字母和大写字母之间添加短横线
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // 在两个大写字母之间添加短横线（如果后面有小写字母）
    .toLowerCase(); // 转换为小写

/**
 * 短横名转大驼峰
 * @param str 目标串
 */
export const kebab2PascalCase = (str: string) => str
    .split('-') // 分割字符串
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // 将每个单词的首字母大写
    .join(''); // 连接成一个字符串
