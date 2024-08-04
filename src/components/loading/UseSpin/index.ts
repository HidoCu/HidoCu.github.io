import Comp from '@/components/loading/UseSpin/Comp.vue';
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
  
  const onSpinResult = config && config.onSpin && config.onSpin(spinComp);
  
  const finish = () => {
    spinComp.fadeOut();
    const timeoutId = setTimeout(() => {
      document.body.removeChild(mountElement);
      spinApp.unmount();
      clearTimeout(timeoutId);
    }, fadeDuration);
  }
  
  return { onSpinResult, finish }
}

export default UseSpin;
