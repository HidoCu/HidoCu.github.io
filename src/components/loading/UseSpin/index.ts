import Comp from '@/components/loading/UseSpin/Comp.vue';
import type { FFunction } from '@/types/type-utils';
import type { IUseSpinConfig } from './types';

const UseSpin = (config?: IUseSpinConfig) => {
  const fadeDuration = config?.delay || 0
  const needMask = !config?.mask;
  
  const spinApp = createApp(Comp, {
    duration: fadeDuration / 1000,
    mask: needMask,
  });
  const mountElement = document.createElement('div');
  document.body.appendChild(mountElement);
  const spinComp = spinApp.mount(mountElement) as InstanceType<typeof Comp>;
  
  const callbackRes = config && config.onSpin && config.onSpin(spinComp);
  
  const unmount = () => {
    spinApp.unmount();
    document.body.removeChild(mountElement);
  }
  
  return (onUnmount?: FFunction) => {
    onUnmount && onUnmount(callbackRes, spinComp);
    spinComp.fadeOut();
    const timeoutId = setTimeout(() => {
      unmount();
      clearTimeout(timeoutId);
    }, fadeDuration);
  }
}

export default UseSpin;
