import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@mcp-servers/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    maxConcurrency: 5, // 限制并发数为 5，避免同时发起太多请求
  },
})
