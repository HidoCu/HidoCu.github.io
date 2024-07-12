export type TImageSuffix = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'avif';
export type TPlatform = 'pixiv' | 'bilibili';

export interface IAuthor {
  uid: number,
  name: string,
}

export interface IImageInfo {
  id: number | string,
  title: string,
  suffix: TImageSuffix,
  platform: TPlatform,
  p?: number,
  author: IAuthor,
}

// public下图片路径
export type TNativeImgUrl = 'bg';