/**
 * B站 API 类型定义
 *
 * 基于 bilibili-API-collect: https://github.com/SocialSisterYi/bilibili-API-collect
 */

/**
 * 解构 Bv 号或者 Av 号
 */
export interface BilibiliVideoId {
  type: 'bvid' | 'aid'
  id: string
}

/**
 * B 站视频基本信息 - 状态码
 */
export type BilibiliVideoRootInfoCode = 0 | -400 | -403 | -404 | 62002 | 62004 | 62012

/**
 * B站视频基本信息 - 根对象
 * B站 API 通用响应格式
 */
export interface BilibiliVideoRootInfo<T> {
  /** 自定义状态码 */
  code: BilibiliVideoRootInfoCode
  /** 错误信息 */
  message: string
  /** 1 */
  ttl: number
  /** 信息本体 */
  data: T
}

export type BilibiliVideoAPIResponse<T> = BilibiliVideoRootInfo<T>

/**
 * B 站视频基本信息
 */
export interface BilibiliVideoBasicInfo {
  /** BV 号 */
  bvid: string
  /** AV 号 */
  aid: number
  /** 稿件分P总数 */
  videos: number
  /** 视频标题 */
  title: string
  /** 视频简介 */
  desc: string
  /** 视频同步发布的的动态的文字内容 */
  dynamic?: string
  /** 分P信息 */
  pages: Array<{
    /** 分P的 cid */
    cid: number
    /** 分P序号 (从1开始) */
    page: number
    /** 分P标题 */
    part: string
    /** 分P时长 (秒) */
    duration: number
  }>
}

/**
 * B站字幕信息
 * subtitle 对象
 * {
 *  allow_submit: false,
 *  lan: '',
 *  lan_doc: '',
 *  subtitles: [
 *    {
 *      id: 1112113070966186000,
 *      lan: 'ai-zh',
 *      lan_doc: '中文',
 *      is_lock: false,
 *      subtitle_url: '//aisubtitle.hdslb.com/bfs/ai_subtitle/prod/
 *        771251331926506366649f0820646e5fdb04adb3cc5d66e88?auth_key=83',
 *      type: 1,
 *      id_str: '1112113070966185984',
 *      ai_type: 1,
 *      ai_status: 2
 *    }
 *  ],
 *  subtitle_position: null,
 *  font_size_type: 0
 *}
 */
export interface BilibiliVideoSubtitle {
  /** 是否允许提交字幕 */
  allow_submit: boolean
  subtitles: BilibiliVideoSubtitleItem[]
}

/**
 * B站字幕信息
 * subtitle 对象中的 list 数组中的对象
 */
export interface BilibiliVideoSubtitleItem {
  /** 字幕ID */
  id: number
  /** 语言代码 (zh-CN, en-US, etc.) */
  lan: string
  /** 语言名称 */
  lan_doc: string
  /** 是否锁定 */
  is_lock: boolean
  /** 字幕文件 URL */
  subtitle_url: string
  /** 字幕上传者 mid */
  author_mid?: number
  /** 暂时不清楚 type 和 id_str 的意思*/
  type?: number
  id_str?: string
  /** AI 相关信息 */
  ai_type?: number
  ai_status?: number
}

/**
 * B站字幕文件内容
 */
export interface BilibiliSubtitleContent {
  body: Array<{
    /** 开始时间 (秒) */
    from: number
    /** 结束时间 (秒) */
    to: number
    /** 字幕内容 */
    content: string
    /** 位置 */
    location?: number
  }>
}

/**
 * 格式化后的字幕项
 */
export interface SubtitleItem {
  /** 开始时间 (秒) */
  from: number
  /** 结束时间 (秒) */
  to: number
  /** 字幕内容 */
  text: string
}
