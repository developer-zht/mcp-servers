import { getConfig } from '@/configs/env-config.js'
import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'

describe('User Config', () => {
  describe('Env Variables', () => {
    beforeEach(() => {
      vi.unstubAllEnvs() // 清理之前的
    })

    afterEach(() => {
      vi.unstubAllEnvs() // 再清理一次,确保干净
    })

    it('应该使用默认配置', () => {
      // 保证 LLM_API_KEY 和 BILIBILI_SESSION_KEY 有值，才不会报错
      vi.stubEnv('AUTHORIZATION_AI_API_KEY', 'llm_api_key')
      vi.stubEnv('AUTHORIZATION_BILIBILI_SESSION_KEY', 'bilibili_session_key')

      const config = getConfig()
      expect(config.llm).toEqual({
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 2000,
        topP: 1.0,
      })
      expect(config.bilibili).toEqual({
        maxSubtitleLength: 14000,
      })
    })

    it('应该获取 authorization 对应的值', () => {
      // 保证 LLM_API_KEY 和 BILIBILI_SESSION_KEY 有值，才不会报错
      vi.stubEnv('AUTHORIZATION_AI_API_KEY', 'llm_api_key')
      vi.stubEnv('AUTHORIZATION_BILIBILI_SESSION_KEY', 'bilibili_session_key')

      const config = getConfig()
      expect(config.authorization?.AUTHORIZATION_AI_API_KEY).toEqual('llm_api_key')
      expect(config.authorization?.AUTHORIZATION_BILIBILI_SESSION_KEY).toEqual(
        'bilibili_session_key'
      )
    })

    it('环境变量中无 authorization 对应的值则报错', () => {
      // 使 AUTHORIZATION_BILIBILI_SESSION_KEY 为 undefined，导致报错
      vi.stubEnv('AUTHORIZATION_AI_API_KEY', 'llm_api_key')
      vi.stubEnv('AUTHORIZATION_BILIBILI_SESSION_KEY', undefined)
      expect(() => {
        getConfig()
      }).toThrowError('缺少必需的环境变量: AUTHORIZATION_BILIBILI_SESSION_KEY')

      // 使 AUTHORIZATION_AI_API_KEY 为 undefined，导致报错
      vi.stubEnv('AUTHORIZATION_AI_API_KEY', undefined)
      vi.stubEnv('AUTHORIZATION_BILIBILI_SESSION_KEY', 'bilibili_session_key')
      expect(() => {
        getConfig()
      }).toThrowError('缺少必需的环境变量: AUTHORIZATION_AI_API_KEY')
    })
  })
})
