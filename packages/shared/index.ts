/**
 * @mcp-servers/shared
 *
 * 共享工具库 - 为所有 MCP Server 提供通用功能
 *
 * 为什么不能写 .ts?
 * // ❌ 错误
 * import { env } from './env.ts';
 * // 编译后:
 * import { env } from './env.ts';  // Node.js 找不到 .ts 文件!
 *
 * // ❌ 错误 (在 ESM 模式下)
 * import { env } from './env';
 * // Node.js 不知道是:
 * // ./env.js?
 * // ./env.json?
 * // ./env/index.js?
 */

import 'dotenv/config'

// export * from './env.js'
export * from './src/utils/http.js'

// 未来会添加:
// export * from './utils/http.js';      // HTTP 请求工具
// export * from './utils/prompt.js';    // 提示词处理
// export * from './utils/logger.js';    // 日志工具
