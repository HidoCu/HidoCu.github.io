export interface IDocument extends Document {
  startViewTransition?: (callback: () => void) => void;
}

/**
 * 将选中的属性变为可选
 */
export type Optional<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 除选中属性外，其余属性变为可选（Optional反选版）
 */
export type ReverseOptional<T, K extends keyof T> =
  Pick<T, K> & Partial<Omit<T, K>>;

/**
 * 获取对象中所有可选属性的键的联合类型
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never
}[keyof T];

/**
 * 移除联合类型中的undefined
 */
export type ExcludeUndefined<T> = T extends undefined ? never : T;

/**
 * 提取所有可选属性
 */
export type PickOptional<T> = {
  [K in OptionalKeys<T>]: ExcludeUndefined<T[K]>
}

/**
 * 将对象可选属性变为必选
 */
export type WithRequired<T, K extends OptionalKeys<T>> = T & {
  [P in K]-?: ExcludeUndefined<T[P]>;
};

/**
 * 掘金上抄的
 * [0, number)范围数字，一般不用
 */
export type TEnumerate<
  N extends number,
  ACC extends number[] = []> =
  ACC['length'] extends N ?
    ACC[number] :
    TEnumerate<N, [...ACC, ACC['length']]>;

/**
 * 掘金上抄的
 * [number, number)范围数字类型
 */
export type TIntRange<
  F extends number,
  T extends number> =
  Exclude<TEnumerate<T>, TEnumerate<F>>;

/**
 * 1到9
 */
export type TOne2Nine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * 0到9
 */
export type TZero2Nine = 0 | TOne2Nine;

/**
 * 我发现16进制色值还是不太现实，需要色值类型还是rgba吧
 * @see rgba
 */
export type THex = TZero2Nine | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

/**
 * 坐标轴
 */
export type TAxis = 'x' | 'y';

/**
 * 立体坐标轴
 */
export type TAxis3D = TAxis | 'z';

/**
 *  函数类型
 */
export type FFunction = (...args: any[]) => any;

/**
 * 类选择器
 */
export type TClassSelector = `.${string}`;

/**
 * ID选择器
 */
export type TIdSelector = `#${string}`;

/**
 * 年
 */
export type TYear = `${19 | 20}${TZero2Nine}${TZero2Nine}`;

/**
 * 月
 */
export type TMonth = `0${TOne2Nine}` | '10' | '11' | '12';

/**
 * 日
 */
export type TDate = `0${TOne2Nine}` | `${1 | 2}${TZero2Nine}` | `3${0 | 1}`;

/**
 * 年-月-日
 */
export type TDateStr = `${TYear}-${TMonth}-${TDate}`;