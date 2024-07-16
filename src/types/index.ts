import type { Tags } from '@/common/constant';
import type { ReverseOptional } from './type-utils';

/**
 * 文件后缀
 */
export type TImageSuffix = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' | 'avif';

/**
 * 平台
 */
export type TPlatform = 'pixiv' | 'bilibili' | 'acfun' | 'twitter' | 'x' | 'youtube' | 'others';

/**
 * 使用资源的类型
 */
export type TResType = 'image' | 'video' | 'text' | 'others';

/**
 * 使用资源的tag
 */
export type TTag = typeof Tags[number];

/**
 * page.json 本地访问图片注册
 */
export interface INativeImage {
  id: string | number;
  suffix: TImageSuffix;
  p: number
}

/**
 * 原作者信息，一般用不着
 */
export interface IAuthor {
  uid: number | string;
  name: string;
  platform: TPlatform;
  link: string;
}

/**
 * 更简单的原作者信息，和作品信息搭配使用
 */
export type IAuthorBase = ReverseOptional<IAuthor, 'uid' | 'name'>;

/*
 * 这段注释是给我自己看的 =_=
 *
 * 关于linkSuffix：
 *   pixiv：作品id
 *   bilibili：动态id
 *   twitter & X: 帖子id
 *   acfun: 用户和作品前缀相同，目录区分： a-文章 v-视频 u-用户
 *   Youtube: 通过query参数访问，作品id是个字符串
 *   YoutubeShorts: 油管短视频，直接拼接作品ID访问
 *   其他平台用到了再补充
 *
 * 关于uid：
 *   pixiv：用户uid
 *   bilibili：用户uid
 *   twitter & X: 用户名（@后的字符串）
 *   acfun: 见linkSuffix
 *   Youtube: 类似X，通过@符后的用户名访问
 *
 * 非图片类型应该不会放在本地
 * 因此本地访问基本只考虑图片访问类型
 * TikTok中国大陆无法访问因此不考虑，遇到直接给linkSuffix挂个原链接算了
 * 抖快头条的东西就懒得搞了...真需要也直接挂原链接算了
 * 具体参考constant/PlatformAuthorLinkPrefix
 *
 * 其他的等我想写Readme的时候再说吧
 */

/**
 * 借物表
 * 大多数情况下直接放个外链好了
 * 考虑到有可能会出现联合创作，因此作者设置为数组
 */
export interface IResourcesUsed {
  id: number | string;
  authors: IAuthorBase[];
  sourcePlatform: TPlatform;
  resName: string;
  resDesc: string;
  resType: TResType;
  tags: TTag[];
}

/**
 * public下图片路径
 */
export type TNativeImgUrl = 'bg';

/* ----------------------------------------------------------- */

/**
 * 引用资源信息（page.json）
 * @see INativeImage
 * @deprecated 计划使用INativeImage替代
 */
export interface IImageInfo {
  id: number | string;
  title: string;
  suffix: TImageSuffix;
  platform: TPlatform;
  p?: number;
  author: ReverseOptional<IAuthor, 'uid' | 'name'>;
}

