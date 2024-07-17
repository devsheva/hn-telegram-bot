import { config } from '@/config.ts'
import { R } from '@/deps.ts'
import { RequestContent, responseSchema } from '@/types.ts'
import { BaseAdapter, HttpStatus, ResponseContent } from '@/ai_adapters/base.ts'
import { filteredContentSchema } from '@/types.ts'

export class GeminiAdapter implements BaseAdapter {
  private readonly _apiKey: string
  private readonly _baseUrl: string
  private readonly _model: string

  constructor() {
    this._apiKey = config.GEMINI_API_KEY
    this._baseUrl = config.BASE_GEMINI_ENDPOINT
    this._model = 'gemini-1.5-flash'
  }

  /**
   * Generate content using the Gemini API.
   */
  public generateContent(input: string): Promise<ResponseContent> {
    return new Promise((resolve, reject) => {
      if (R.isEmpty(input)) {
        reject(new Error('Text is required'))
      }

      const urlJoiner = R.join('/')
      const request = new Request(
        urlJoiner(
          [
            this._baseUrl,
            'models',
            `${this._model}:generateContent`,
          ],
        ),
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this._apiKey,
          },
          body: JSON.stringify(
            this.buildBody(input),
          ),
        },
      )

      fetch(request)
        .then((response) => {
          if (response.status !== HttpStatus.OK) {
            console.error(R.prop('statusText')(response))
            reject(new Error('Failed to generate content'))
          } else {
            response.json().then((data) => {
              const parsedData = filteredContentSchema.parse(data)

              resolve(
                R.path(
                  ['candidates', 0, 'content', 'parts', 0],
                )(parsedData),
              )
            })
          }
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

    const body: RequestContent = R.pipe(
      R.assocPath(
        ['contents', 0, 'parts', 0, 'text'],
        input,
      ),
      R.assocPath(
        ['generationConfig', 'responseMimeType'],
        'application/json',
      ),
      R.assocPath(
        ['generationConfig', 'responseSchema'],
        responseSchema,
      ),
    )({})

    return body
  }
}
