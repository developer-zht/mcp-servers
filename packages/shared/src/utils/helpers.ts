/**
 * 辅助函数: sleep
 * @param ms 等待时间 (毫秒)
 * @example
 * ```typescript
 * await sleep(1000);  // 等待 1 秒
 * ```
 */
export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
