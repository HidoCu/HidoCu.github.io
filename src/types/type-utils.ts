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
 * 掘金上抄的
 * [0, number)范围数字，一般不用
 */
export type TEnumerate<
  N extends number,
  Acc extends number[] = []> =
  Acc['length'] extends N ?
    Acc[number] :
    TEnumerate<N, [...Acc, Acc['length']]>;

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
