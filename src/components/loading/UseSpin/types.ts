import type { Component } from 'vue';

export type FOnSpin = (compInstance?: Component) => any;

export interface IUseSpinConfig {
  onSpin?: FOnSpin;
  delay?: number;
  mask?: boolean;
}