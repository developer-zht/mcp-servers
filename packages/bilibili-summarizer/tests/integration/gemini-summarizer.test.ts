/**
 * 测试 Gemini API 返回数据格式
 */
import { fetchJSON } from '../../shared/src/utils/http.js'
import { envManager } from '@/utils/env-manager.js'

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>
    }
  }>
}

async function testGemini() {
  console.log('🔍 测试 Gemini API...\n')
  const apiKey = envManager.getEnv('GEMINI_API_KEY')
  const model = 'gemini-pro'
  try {
    console.log('1️⃣ 发送请求到 Gemini...')
    const response = await fetchJSON<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: '请用一句话介绍 Node.js',
                },
              ],
            },
          ],
        }),
      }
    )
    console.log('✅ 完整返回数据:')
    console.log(JSON.stringify(response, null, 2))
    console.log('\n✅ 提取的回复:')
    // const text = response.candidates[0].content.parts[0].text
    // console.log(text)
  } catch (error) {
    console.error('❌ 错误:', error)
    if (error instanceof Error) {
      console.error('   消息:', error.message)
    }
  }
}

testGemini()
