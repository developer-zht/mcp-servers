export class EnvironmentVariableManagemer {
  // private errors: string[] = []
  constructor() {}

  /**
   * 验证必需的环境变量
   * 在应用启动时调用,提前发现配置问题
   */
  // validateEnv(): void {
  //   if (this.errors.length > 0) {
  //     console.error('环境变量验证失败:')
  //     this.errors.forEach(err => console.error(`  - ${err}`))
  //     console.error('\n请参考 .env.example 配置环境变量')
  //     process.exit(1)
  //   }
  // }

  /**
   * 获取字符串类型的环境变量
   * @param key 环境变量名
   * @param defaultValue 默认值
   * @returns 环境变量值或默认值
   */
  getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key]

    if (value === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`缺少必需的环境变量: ${key}`)
      }
      return defaultValue
    }

    return value
  }

  /**
   * 获取可选的环境变量
   * @param key 环境变量名
   * @returns 环境变量值或 undefined
   */
  getOptionalEnv(key: string): string | undefined {
    return process.env[key]
  }

  /**
   * 获取布尔类型的环境变量
   * @param key 环境变量名
   * @param defaultValue 默认值
   */
  getBoolEnv(key: string, defaultValue: boolean = false): boolean {
    const value = process.env[key]
    if (value === undefined) return defaultValue

    return value === 'true' ? true : false
  }

  /**
   * 获取整数类型的环境变量
   * @param key 环境变量名
   * @param defaultValue 默认值
   */
  getIntEnv(key: string, defaultValue?: number): number {
    const value = process.env[key]
    if (value === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`缺少必需的环境变量: ${key}`)
      }
      return defaultValue
    }

    const num = parseInt(value, 10)
    if (isNaN(num)) {
      throw new Error(`环境变量 ${key} 不是有效的数字: ${value}`)
    }

    return num
  }

  /**
   * 获取浮点数类型的环境变量
   * @param key 环境变量名
   * @param defaultValue 默认值
   */
  getFloatEnv(key: string, defaultValue?: number): number {
    const value = process.env[key]
    if (value === undefined) {
      if (defaultValue === undefined) {
        throw new Error(`缺少必需的环境变量: ${key}`)
      }
      return defaultValue
    }

    const num = parseFloat(value)
    if (isNaN(num)) {
      throw new Error(`环境变量 ${key} 不是有效的数字: ${value}`)
    }

    return num
  }
}
