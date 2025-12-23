export class BilibiliAPIError extends Error {
  public code: number
  constructor(code: number, message: string) {
    super(message)
    this.name = 'BilibiliAPIError'
    this.code = code
  }
}
