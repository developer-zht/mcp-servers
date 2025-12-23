import { VIDEO_ROOT_INFO_CODE_MESSAGE } from '@/constants/bilibili.constants.js'
import type { BilibiliVideoRootInfoCode } from '@/apis/types/video-info.js'

export class BilibiliVideoInfoCodeError extends Error {
  public code: number

  constructor(code: BilibiliVideoRootInfoCode, message?: string) {
    // 如果提供了 message 就用提供的，否则用映射的默认消息
    const errorMessage = message || VIDEO_ROOT_INFO_CODE_MESSAGE[code]
    super(errorMessage)

    this.name = 'BilibiliApiError'
    this.code = code
  }
}
