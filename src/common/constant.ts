import type { IImageInfo, TNativeImgUrl, TPlatform } from '@/types';

export class Constant {
  private constructor() {}
  
  readonly PIXIV_ART_PREFIX = 'https://www.pixiv.net/artworks/';
  readonly Bili_USER_PREFIX = 'https://space.bilibili.com/'
  
  private static readonly nativeUrlMap = new Map<TPlatform, (imgInf: IImageInfo) => string>([
    ['pixiv', (imgInf: IImageInfo) => `/${imgInf.id}_p${imgInf.p}.${imgInf.suffix}`],
    ['bilibili', (imgInf: IImageInfo) => `/${imgInf.id}${imgInf.author.uid}.${imgInf.suffix}`],
  ]);
  
  static getNativeImgUrl(imgInf: IImageInfo, nativeUrl: TNativeImgUrl): string {
    const nativeUrlFunc = Constant.nativeUrlMap.get(imgInf.platform);
    const nativeUrlPrefix = `/images/${nativeUrl}`;
    if (nativeUrlFunc) {
      const nativeUrlLast = nativeUrlFunc(imgInf);
      return `${nativeUrlPrefix}/${nativeUrlLast}`;
    }
    return '';
  }
}
