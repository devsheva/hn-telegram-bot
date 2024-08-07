import { assertType, describe, IsExact, it } from '@/dev_deps.ts'
import { BaseAdapter, ResponseContent } from '../../ai_adapters/base.ts'

describe('baseAdapter', () => {
  describe('constructor', () => {
    it('correctly gets implemented', () => {
      class MyAdapter implements BaseAdapter {
        generateContent(_input: string): Promise<ResponseContent> {
          return Promise.resolve({ text: 'Hello World!' })
        }

        buildBody(_input: string): object {
          return { text: 'Hello World!' }
        }
      }

      const adapter = new MyAdapter()
      assertType<IsExact<typeof adapter, BaseAdapter>>(true)
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
