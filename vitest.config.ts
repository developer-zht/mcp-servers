import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    maxConcurrency: 5, // 限制并发数为 5，避免同时发起太多请求
  },
})
