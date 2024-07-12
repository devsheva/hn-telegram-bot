import { assertType, describe, IsExact, it } from '@/dev_deps.ts'
import { BaseAdapter } from '@/adapters/base.ts'

describe('baseAdapter', () => {
  describe('constructor', () => {
    it('correctly gets implemented', () => {
      class MyAdapter implements BaseAdapter {
        generateContent(): object {
          throw new Error('Method not implemented.')
        }
      }

      const adapter = new MyAdapter()
      assertType<IsExact<typeof adapter, BaseAdapter>>(true)
      assertType<IsExact<typeof adapter.generateContent, () => object>>(
        true,
      )
    })
  })
})
