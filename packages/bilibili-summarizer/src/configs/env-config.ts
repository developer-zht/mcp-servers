import type { Config } from '@/configs/types/default.config.js'
import { envManager } from '@/utils/env-manager.js'

export const DEFAULT_CONFIG: Config = {
  llm: {
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
  },
  bilibili: {
    maxSubtitleLength: 14000,
  },
}

/**
 * 获取配置 (环境变量优先于默认值)
 */
export function getConfig(): Config {
  const config: Config = {
    llm: {
      provider: envManager.getEnv('LLM_PROVIDER', DEFAULT_CONFIG.llm.provider),
      model: envManager.getEnv('LLM_MODEL', DEFAULT_CONFIG.llm.model),
      temperature: envManager.getFloatEnv('LLM_TEMPERATURE', DEFAULT_CONFIG.llm.temperature),
      maxTokens: envManager.getIntEnv('LLM_MAX_TOKENS', DEFAULT_CONFIG.llm.maxTokens),
      topP: envManager.getFloatEnv('LLM_TOP_P', DEFAULT_CONFIG.llm.topP),
    },
    bilibili: {
      maxSubtitleLength: envManager.getIntEnv(
        'BILIBILI_MAX_SUBTITLE_LENGTH',
        DEFAULT_CONFIG.bilibili.maxSubtitleLength
      ),
    },
    authorization: {
      AUTHORIZATION_AI_API_KEY: envManager.getEnv('AUTHORIZATION_AI_API_KEY'),
      AUTHORIZATION_BILIBILI_SESSION_KEY: envManager.getEnv('AUTHORIZATION_BILIBILI_SESSION_KEY'),
    },
  }

  return config
}
