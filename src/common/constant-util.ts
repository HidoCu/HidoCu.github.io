import type { INativeImage } from '@/types';

/*
* pixiv: [画ID]
* bilibili: [动态ID]
* twitter & X: [帖子ID]
* */

/**
 * 本地路径访问工具
 */
const NativeAccessor = {
  // 图片访问
  image(path: string, nativeInfo: INativeImage) {
    const { id, suffix, p } = nativeInfo;
    return `/images/${path}/${id}_p${p}.${suffix}`;
  },
  
  // 视频访问
  video() {},
  
  // 文本（文章）访问
  text() {},
  
  // 其他资源访问
}

export default NativeAccessor;
