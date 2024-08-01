import Comp from '@/components/UseSpin/Comp.vue';
import type { FFunction } from '@/types/type-utils';
import type { IUseSpinConfig } from './types';

const UseSpin = (config?: IUseSpinConfig) => {
  const fadeDuration = config?.delay || 0
  
  const spinApp = createApp(Comp, {
    duration: fadeDuration / 1000
  });
  const mountElement = document.createElement('div');
  document.body.appendChild(mountElement);
  const spinComp = spinApp.mount(mountElement) as InstanceType<typeof Comp>;
  
  const callbackRes = config && config.onSpin && config.onSpin(spinComp);
  const needFade = !!config?.fade;
  
  const unmount = () => {
    spinApp.unmount();
    document.body.removeChild(mountElement);
  }
  
  return (onUnmount?: FFunction) => {
    onUnmount && onUnmount(callbackRes, spinComp);
    if (needFade) {
      spinComp.fadeOut();
      const id = setTimeout(() => {
        unmount();
        clearTimeout(id);
      }, fadeDuration);
    } else {
      unmount();
    }
  }
}

export default UseSpin;
