import { BaseAdapter, ResponseContent } from '@/ai_adapters/base.ts'
import { R } from '@/deps.ts'
import { config } from '@/config.ts'
import { RequestContent } from '@/types.ts'

export class GeminiAdapter implements BaseAdapter {
  private readonly _apiKey: string
  private readonly _baseUrl: string
  private readonly _model: string

  constructor() {
    this._apiKey = config.GEMINI_API_KEY
    this._baseUrl = config.BASE_GEMINI_ENDPOINT
  }

  /**
   * Generate content using the Gemini API.
   */
  public generateContent(input: string): Promise<ResponseContent> {
    return new Promise((resolve, reject) => {
      if (R.isEmpty(input)) {
        reject(new Error('Text is required'))
      }

      resolve({
        text: 'Hello, world!',
      })
    })
  }

  /**
   * Build the body for the Gemini API.
   */
  public buildBody(input: string): RequestContent {
    if (R.isEmpty(input)) {
      throw new Error('Text is required')
    }

    const body: RequestContent = R.assocPath(
      ['contents', 0, 'parts', 0, 'text'],
      input,
      {},
    )

    return body
  }
}
