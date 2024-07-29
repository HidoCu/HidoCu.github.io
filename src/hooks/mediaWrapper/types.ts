export type TBreakPoint = 'mobile' | 'pad' | 'tablet' | 'desktop' | 'tv';

export type TBreakPointHandler = `on${Capitalize<TBreakPoint>}`;

export interface IWindowContext {
  width: number;
  height: number;
  breakPoint: TBreakPoint;
}

export type TTrigger = (context: IWindowContext) => any;
