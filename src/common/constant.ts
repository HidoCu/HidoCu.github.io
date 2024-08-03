import type { IImageInfo, TNativeImgUrl, TPlatform } from '@/types';
import { rgba } from '@/utils/tools';
import TagData from './tag-data';

/**
 * 作品访问路径
 */
export enum PlatformLinkPrefix {
  PIXIV = 'https://www.pixiv.net/artworks/',
  BILIBILI = 'https://www.bilibili.com/opus/',
  ACFUN = 'https://www.acfun.cn/',
  TWITTER = 'https://x.com/azumammeri/status/',
  X = 'https://x.com/azumammeri/status/',
  YOUTUBE = 'https://www.youtube.com/watch?v=',
  YOUTUBE_SHORTS = 'https://www.youtube.com/shorts/',
}

/**
 * 作者访问路径
 */
export enum PlatformAuthorLinkPrefix {
  PIXIV = 'https://www.pixiv.net/users/',
  BILIBILI = 'https://space.bilibili.com/',
  ACFUN = 'https://www.acfun.cn/',
  TWITTER = 'https://x.com/',
  X = 'https://x.com/',
  YOUTUBE = 'https://www.youtube.com/',
}

/**
 * 资源引用平台
 */
export enum PlatformIcon {
  pixiv = 'pixiv',
  bilibili = 'bilibili',
  acfun = 'acfun',
  twitter = 'twitter',
  x = 'x',
  youtube = 'youtube',
  others = 'others'
}

/**
 * 本地路径访问工具
 * @see NativeAccessor
 * @deprecated 计划使用NativeAccessor取代
 */
export class ConstantUtils {
  private constructor() {
  }
  
  private static readonly nativeUrlMap = new Map<TPlatform, (imgInf: IImageInfo) => string>([
    ['pixiv', (imgInf: IImageInfo) => `/${imgInf.id}_p${imgInf.p}.${imgInf.suffix}`],
    ['bilibili', (imgInf: IImageInfo) => `/${imgInf.id}${imgInf.author.uid}.${imgInf.suffix}`],
  ]);
  
  static getNativeImgUrl(imgInf: IImageInfo, nativeUrl: TNativeImgUrl): string {
    const nativeUrlPrefix = `/images/${nativeUrl}`;
    const getNativeUrlLast = ConstantUtils.nativeUrlMap.get(imgInf.platform);
    if (getNativeUrlLast) {
      const nativeUrlLast = getNativeUrlLast(imgInf);
      return `${nativeUrlPrefix}/${nativeUrlLast}`;
    }
    return '';
  }
}

export type TTag = typeof TagData[number];

/**
 * 每个人物对应的主题色
 */
export const TagColorMap = Object.freeze(new Map<TTag, string>([
  ['博麗霊夢', rgba(237, 75, 83)],
  ['霧雨魔理沙', rgba(255, 220, 150)],
  ['レミリア・スカーレット', rgba(246, 190, 255)],
  ['フランドール・スカーレット', rgba(255, 230, 140)],
  ['古明地さとり', rgba(223, 165, 233)],
  ['古明地こいし', rgba(203, 207, 141)],
]));
