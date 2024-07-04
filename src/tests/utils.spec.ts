import { MemorySessionStorage } from '@deps'
import { getSessionAdapter } from '@/utils.ts'
import { assertInstanceOf, describe, it } from '@dev_deps'

const adapter = getSessionAdapter()

describe('getSessionAdapter', () =>
  it('returns adapter', () => {
    assertInstanceOf(adapter, MemorySessionStorage)
  }))
