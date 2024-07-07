import { MemorySessionStorage } from '@/deps.ts'
import { assertInstanceOf, describe, it } from '@/dev_deps.ts'
import { getSessionAdapter } from '@/utils.ts'

const adapter = getSessionAdapter()

describe('getSessionAdapter', () =>
  it('returns adapter', () => {
    assertInstanceOf(adapter, MemorySessionStorage)
  }))
