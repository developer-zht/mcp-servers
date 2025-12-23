import { z } from 'zod'

/**
 * 创建 schema 示例
 * const UserSchema = z.object({
 *  name: z.string(),
 *  age: z.number(),
 *  email: z.string(),
 * })
 * type User = z.infer<typeof UserSchema>
 */

/**
 * 解构 Bv 号或者 Av 号
 * interface BilibiliVideoId {
 *  type: 'bvid' | 'aid'
 *  id: string
 * }
 */
const BilibiliVideoIdTypeSchema = z.union([z.literal('bvid'), z.literal('aid')])
export const BilibiliVideoIdSchema = z.object({
  type: BilibiliVideoIdTypeSchema,
  id: z.string(),
})

/**
 * B 站视频基本信息 - 状态码
 * type BilibiliVideoRootInfoCode = 0 | -400 | -403 | -404 | 62002 | 62004 | 62012
 */
export const BilibiliVideoRootInfoCodeSchema = z.union([
  z.literal(0),
  z.literal(-400),
  z.literal(-403),
  z.literal(-404),
  z.literal(62002),
  z.literal(62004),
  z.literal(62012),
])

/**
 * B 站视频基本信息
 * interface BilibiliVideoBasicInfo {
 *  bvid: string
 *  aid: number
 *  videos: number
 *  title: string
 *  desc: string
 *  dynamic?: string
 *  pages: Array<{
 *    cid: number
 *    page: number
 *    part: string
 *    duration: number
 *  }>
 *}
 */
const BilibiliVideoPageSchema = z.object({
  /** 分P的 cid */
  cid: z.number(),
  /** 分P序号 (从1开始) */
  page: z.number(),
  /** 分P标题 */
  part: z.string(),
  /** 分P时长 (秒) */
  duration: z.number(),
})
export const BilibiliVideoBasicInfoSchema = z.object({
  /** BV 号 */
  bvid: z.string(),
  /** AV 号 */
  aid: z.number(),
  /** 稿件分P总数 */
  videos: z.number(),
  /** 视频标题 */
  title: z.string(),
  /** 视频简介 */
  desc: z.string(),
  /** 视频同步发布的的动态的文字内容 - 可选 */
  dynamic: z.string().optional(),
  /** 分P信息 */
  pages: z.array(BilibiliVideoPageSchema),
})

/**
 * B站字幕信息
 * subtitle 对象中的 list 数组中的对象
 * interface BilibiliVideoSubtitleItem {
 *  id: number
 *  lan: string
 *  lan_doc: string
 *  is_lock: boolean
 *  subtitle_url: string
 *  author_mid?: number
 *  type?: number
 *  id_str?: string
 *  ai_status?: number
 *  ai_type?: number
 * }
 */
export const BilibiliVideoSubtitleItemSchema = z.object({
  /** 字幕ID */
  id: z.number(),
  /** 语言代码 */
  lan: z.string(),
  /** 语言名称 */
  lan_doc: z.string(),
  /** 是否锁定 */
  is_lock: z.boolean(),
  /** 字幕文件 URL */
  subtitle_url: z.string(),
  /** 字幕上传者mid */
  author_mid: z.number().optional(),
  /** 暂时不清楚 type 和 id_str 的意思*/
  type: z.number().optional(),
  id_str: z.string().optional(),
  /** AI 相关信息 - 可选 */
  ai_status: z.number().optional(),
  ai_type: z.number().optional(),
})

/**
 * B站字幕信息
 * subtitle 对象
 * interface BilibiliVideoSubtitle {
 *   allow_submit: boolean
 *   list: BilibiliVideoSubtitleItem[]
 * }
 */
export const BilibiliVideoSubtitleSchema = z.object({
  allow_submit: z.boolean(),
  subtitles: z.array(BilibiliVideoSubtitleItemSchema),
})
export const BilibiliVideoSubtitleInfoSchema = z.object({
  subtitle: BilibiliVideoSubtitleSchema,
})

/**
 * B站视频基本信息 - 根对象
 * B站 API 通用响应格式
 * interface BilibiliVideoRootInfo<T> {
 *   code: BilibiliVideoRootInfoCode
 *   message: string
 *   ttl: number
 *   data: T
 * }
 *
 * export type BilibiliVideoAPIResponse<T> = BilibiliVideoRootInfo<T>
 */
// 泛型函数: 创建 API 响应的 Schema
export function BilibiliVideoAPIResponseSchema<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    code: BilibiliVideoRootInfoCodeSchema,
    message: z.string(),
    ttl: z.number(),
    data: dataSchema,
  })
}
