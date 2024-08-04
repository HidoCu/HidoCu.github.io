export type TBreakPoint = 'mobile' | 'small' | 'large-mobile' | 'pad' | 'tablet' | 'desktop' | 'large';

export type TBreakPointHandler = `on${Capitalize<TBreakPoint>}`;

export interface IWindowContext {
  width: number;
  height: number;
  breakPoint: TBreakPoint;
}

export type TTrigger = (context: IWindowContext) => any;
