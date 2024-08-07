export type TBreakPoint =
  'mobile' | 'mobile-horiz' | 'pad' |
  'tablet' | 'desktop' | 'large' |
  'xl' | 'xxl' | 'xxxl';

export type TBreakPointHandler = `on${Capitalize<TBreakPoint>}`;

export interface IWindowContext {
  width: number;
  height: number;
  breakPoint: TBreakPoint;
}

export type TTrigger = (context: IWindowContext) => any;

export type FFnHook = () => void;