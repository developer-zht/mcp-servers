export interface Config {
  llm: {
    // provider: 'openai' | 'anthropic' | 'gemini'
    provider: string
    model: string
    temperature: number
    maxTokens: number
    topP: number
  }
  bilibili: {
    maxSubtitleLength: number
  }
  authorization?: {
    AUTHORIZATION_AI_API_KEY?: string
    AUTHORIZATION_BILIBILI_SESSION_KEY?: string
  }
}
