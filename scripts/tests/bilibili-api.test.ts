export function testBilibiliAPI() {
  console.log('🔍 测试 Bilibili API...\n')

  const bv = 'BV1jJ411X7KE'

  try {
    // 1. 获取视频信息
    console.log('1️⃣ 获取视频信息...')
    // TODO:  getVideoInfo()
    // const videoInfo = await getVideoInfo(videoId);
    // console.log('✅ 视频信息:', JSON.stringify(videoInfo, null, 2));
    // console.log(`   标题: ${videoInfo.title}`);
    // console.log(`   AID: ${videoInfo.aid}`);
    // console.log(`   CID: ${videoInfo.cid}\n`);

    // 2. 获取字幕列表
    console.log('2️⃣ 获取字幕列表...')
    // const subtitles = await getSubtitleList(videoInfo.aid, videoInfo.cid);
    // console.log('✅ 字幕列表:', JSON.stringify(subtitles, null, 2));

    // if (subtitles.length === 0) {
    //   console.log('   ⚠️  该视频没有字幕\n');
    //   return;
    // }

    // 3. 下载第一个字幕
    console.log('3️⃣ 下载字幕...')
    // const subtitle = await downloadSubtitle(subtitles[0].subtitle_url)
    // console.log('✅ 字幕内容 (前 500 字符):')
    // console.log(JSON.stringify(subtitle, null, 2).substring(0, 500))
    // console.log(`\n   字幕条目数: ${subtitle.body.length}`)
    // console.log(`   第一条: ${subtitle.body[0]?.content || '无'}\n`)
  } catch (error) {
    console.error('❌ 错误:', error)

    if (error instanceof Error) {
      console.error('   消息:', error.message)
      console.error('   堆栈:', error.stack)
    }
  }
}

// 运行测试
testBilibiliAPI()
