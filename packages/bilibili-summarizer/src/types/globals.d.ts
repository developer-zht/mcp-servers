import { env } from 'process'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LLM_PROVIDER: string
      LLM_MODEL: string
      LLM_TEMPERATURE: string
      LLM_MAX_TOKENS: string
      LLM_TOP_P: string
      BILIBILI_MAX_SUBTITLE_LENGTH: string
    }
  }
}
