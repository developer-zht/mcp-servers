import { VIDEO_ROOT_INFO_CODE_MESSAGE } from '@/constants/bilibili.constants.js'
import { BilibiliVideoInfoCodeError } from '@/errors/BilibiliVideoInfoCodeError.js'
import {
  BilibiliVideoAPIResponse,
  BilibiliVideoBasicInfo,
  BilibiliVideoId,
  BilibiliVideoSubtitle,
  BilibiliVideoSubtitleItem,
} from '@/apis/types/video-info.js'
import { fetchJSON, fetchJSONValidated } from '@mcp-servers/shared'
import {
  BilibiliVideoAPIResponseSchema,
  BilibiliVideoBasicInfoSchema,
  BilibiliVideoSubtitleInfoSchema,
} from '@/apis/schemas/video-info.js'
import { envManager } from '@/utils/env-manager.js'

/**
 * 从视频 URL 中提取 BV 号或 AV 号
 * @param url 视频 URL 或 BV/AV 号
 * @returns { type: 'bvid' | 'aid', id: string }
 *
 * @example
 * ```typescript
 * parseVideoId('https://www.bilibili.com/video/BV1xx411c7mD')
 * // => { type: 'bvid', id: 'BV1xx411c7mD' }
 *
 * parseVideoId('BV1xx411c7mD')
 * // => { type: 'bvid', id: 'BV1xx411c7mD' }
 *
 * parseVideoId('av12345678')
 * // => { type: 'aid', id: '12345678' }
 */
export function parseVideoId(url: string): BilibiliVideoId {
  // 如果是完整的 URL
  if (url.includes('bilibili.com')) {
    const bvMatch = url.match(/\/video\/(BV[a-zA-Z0-9]+)/)
    if (bvMatch && bvMatch[1]) {
      return { type: 'bvid', id: bvMatch[1] }
    }

    const avMatch = url.match(/\/video\/av(\d+)/)
    if (avMatch && avMatch[1]) {
      return { type: 'aid', id: avMatch[1] }
    }
  }

  // 如果是 BV 号
  if (url.startsWith('BV')) {
    const bvMatch = url.match(/BV[a-zA-Z0-9]+/)
    if (bvMatch && bvMatch[0]) return { type: 'bvid', id: bvMatch[0] }
  }

  // 如果是 AV 号
  if (url.startsWith('av')) {
    const avMatch = url.match(/av(\d+)/)
    if (avMatch && avMatch[1]) return { type: 'aid', id: avMatch[1] }
  }

  throw new Error(`无法解析视频 ID: ${url}`)
}

/**
 * 获取视频基本信息
 * API: GET /x/web-interface/view
 * @param videoId BV 号或 AV 号
 * @returns 视频信息
 */
export async function getVideoInfo(videoId: string) {
  const { type, id } = parseVideoId(videoId)

  const params = type == 'aid' ? `?aid=${id}` : `?bvid=${id}`
  const url = `https://api.bilibili.com/x/web-interface/view${params}`

  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    Referer: 'https://www.bilibili.com',
  }

  // bilibili sessionCookie
  const sessionCookie = envManager.getEnv('AUTHORIZATION_BILIBILI_SESSION_KEY')
  if (sessionCookie) {
    // headers['Cookie'] = `SESSDATA=${sessionCookie}`
    headers['Cookie'] = `${sessionCookie}`
  }

  // 原来没有数据格式校验与格式化的请求方式
  // const response = await fetchJSON<BilibiliVideoAPIResponse<BilibiliVideoBasicInfo>>(url, {
  //   headers,
  // })

  // 现在有数据格式校验与格式化的请求方式
  const bilibiliVideoAPIResponseSchema = BilibiliVideoAPIResponseSchema(
    BilibiliVideoBasicInfoSchema
  )

  const response = await fetchJSONValidated(url, bilibiliVideoAPIResponseSchema, { headers })

  if (response.code !== 0) {
    throw new BilibiliVideoInfoCodeError(
      response.code,
      VIDEO_ROOT_INFO_CODE_MESSAGE[response.code] || '获取视频信息失败'
    )
  }

  console.log(response.data)
  return response.data
}

// getVideoInfo('BV1jJ411X7KE')

/**
 * 获取视频的字幕列表
 *
 * API: GET /x/player/v2
 *
 * @param aid 视频 AV 号
 * @param cid 分P的 cid
 * @returns 字幕列表
 */
export async function getSubtitleList(aid: number, cid: number) {
  const url = `https://api.bilibili.com/x/player/v2?aid=${aid}&cid=${cid}`

  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    Referer: 'https://www.bilibili.com',
  }

  // bilibili sessionCookie
  const sessionCookie = envManager.getEnv('AUTHORIZATION_BILIBILI_SESSION_KEY')
  if (sessionCookie) {
    headers['Cookie'] = `${sessionCookie}`
  }

  // 原来没有数据格式校验与格式化的请求方式
  // const response = await fetchJSON<
  //   BilibiliVideoAPIResponse<{
  //     subtitle?: BilibiliVideoSubtitle
  //   }>
  // >(url, {
  //   headers,
  // })

  // 现在有数据格式校验与格式化的请求方式
  // const bilibiliVideoSubtitleInfoSchema = BilibiliVideoSubtitleInfoSchema
  const bilibiliVideoAPIResponseSchema = BilibiliVideoAPIResponseSchema(
    BilibiliVideoSubtitleInfoSchema
  )
  const response = await fetchJSONValidated(url, bilibiliVideoAPIResponseSchema, { headers })

  if (response.code !== 0) {
    throw new BilibiliVideoInfoCodeError(
      response.code,
      VIDEO_ROOT_INFO_CODE_MESSAGE[response.code] || '获取字幕列表失败'
    )
  }

  console.log(response.data.subtitle?.subtitles)

  return response.data.subtitle?.subtitles || []
}

getSubtitleList(77125133, 192650636)

/**
 * 下载字幕文件
 *
 * @param subtitleUrl 字幕文件 URL
 * @returns 字幕内容
 */
export function downloadSubtitle(subtitleUrl: string) {}
