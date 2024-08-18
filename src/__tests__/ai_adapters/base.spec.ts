import { assertType, describe, IsExact, it } from '@/dev_deps.ts'
import { BaseAdapter, ResponseContent } from '../../ai_adapters/base.ts'

describe('baseAdapter', () => {
  describe('constructor', () => {
    it('correctly gets implemented', () => {
      class MyAdapter extends BaseAdapter {
        protected _apiKey: string
        protected _baseUrl: string
        protected _model: string

        constructor() {
          super()
          this._apiKey = '123'
          this._baseUrl = 'http://localhost'
          this._model = 'gpt-3'
        }

        generateContent(_input: string): Promise<ResponseContent> {
          return Promise.resolve({ text: 'Hello World!' })
        }

        buildBody(_input: string): object {
          return { text: 'Hello World!' }
        }
      }

      const adapter = new MyAdapter()
      assertType<
        IsExact<
          typeof adapter.generateContent,
          (text: string) => Promise<ResponseContent>
        >
      >(
        true,
      )

      assertType<IsExact<typeof adapter.buildBody, (input: string) => object>>(
        true,
      )
    })
  })
})
