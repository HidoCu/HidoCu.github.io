import type { FFunction } from '@/types/type-utils';

export interface IUseSpinConfig {
  onSpin?: FFunction;
  fade?: boolean;
  delay?: number;
  mask?: boolean;
}