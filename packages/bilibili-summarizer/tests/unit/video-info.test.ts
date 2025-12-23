import { it, describe, expect } from 'vitest'
import { parseVideoId } from '@/apis/video-info.js'

describe('Bilibili API', () => {
  describe('parseVideoId', () => {
    // 标记待完成的测试
    it.todo('应该解析 BV 号')
    it.todo('应该从 URL 中提取 BV 号')

    it('应该解析 BV 号', () => {
      const result = parseVideoId('BV1fX4y1Q7Ux')
      expect(result).toEqual({ type: 'bvid', id: 'BV1fX4y1Q7Ux' })
    })

    // it('应该从 URL 中提取 BV 号', () => {
    //   const result = parseVideoId('https://www.bilibili.com/video/BV1fX4y1Q7Ux')
    //   expect(result).toEqual({ type: 'bvid', id: 'BV1fX4y1Q7Ux' })
    // })
  })

  describe('getVideoInfo', () => {
    // 标记待完成的测试
    it.todo('应该获取视频信息')

    // it('应该获取视频信息', async () => {
    //   const info = await getVideoInfo('BV1fX4y1Q7Ux')

    //   expect(info).toHaveProperty('title')
    //   expect(info).toHaveProperty('aid')
    //   expect(info).toHaveProperty('cid')
    //   expect(typeof info.title).toBe('string')

    //   console.log('✅ 视频信息:', info)
    // }, 10000) // 10 秒超时
  })
})
