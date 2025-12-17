/**
 * 测试 OpenAI API 返回数据格式
 */
async function testOpenAI() {
  console.log('🔍 测试 OpenAI API...\n')
  const testText = `
    大家好，我是 Jimmy。
    今天给大家介绍一个 AI 工具 BibiGPT。
    它可以一键总结 B站 视频内容。
    只需要粘贴视频 URL 就可以了。
  `.trim()

  try {
    // 1. 测试基础调用
    console.log('1️⃣ 测试基础 Chat Completion...')
    // const response = await createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: '你好，请介绍一下自己' }],
    //   max_tokens: 100,
    // })
    // console.log('✅ 返回数据:', JSON.stringify(response, null, 2))
    // console.log(`   回复: ${response.choices[0].message.content}\n`)
    // 2. 测试总结功能
    console.log('2️⃣ 测试视频总结...')
    // const summary = await summarizeText('测试视频', testText, {
    //   language: '中文',
    //   maxBulletPoints: 3,
    //   showEmoji: true,
    //   stream: false,
    // })
    // console.log('✅ 总结结果:')
    // console.log(summary)
  } catch (error) {
    console.error('❌ 错误:', error)
    if (error instanceof Error) {
      console.error('   消息:', error.message)
      console.error('   堆栈:', error.stack)
    }
  }
}

testOpenAI()
