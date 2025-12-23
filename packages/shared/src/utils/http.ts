import { z } from 'zod'

/**
 * HTTP 请求工具
 *
 * 封装 fetch API，添加超时、错误处理等功能
 */
export interface FetchOption extends RequestInit {
  timeout?: number
}

/**
 * 带超时的 fetch
 */
export async function fetchWithTimeout(url: string, options: FetchOption): Promise<Response> {
  const { timeout = 60000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`请求超时 (${timeout}ms)`)
      }
    }

    throw error
  }
}

/**
 * 请求 JSON 函数
 */
export async function fetchJSON<T>(url: string, options: FetchOption = {}): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchJSONValidated<T>(
  url: string,
  schema: z.ZodType<T>,
  options: FetchOption = {}
): Promise<T> {
  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const rawData = await response.json()

    // 运行时验证 + 转换，parse会：
    // 1. 验证数据结构
    // 2. 移除schema中未定义的字段
    // 3. 抛出错误如果验证失败
    const validatedData = schema.parse(rawData)
    return validatedData
  } catch (error) {
    console.error(error)
    throw error
  }
}
