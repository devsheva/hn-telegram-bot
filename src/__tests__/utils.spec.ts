import { getSessionAdapter } from '@/utils'
import { MemorySessionStorage } from 'grammy'

const adapter = getSessionAdapter()

describe('getSessionAdapter', () =>
  it('returns adapter', () => {
    expect(adapter).toBeDefined()
    expect(adapter()).toBeInstanceOf(MemorySessionStorage)
  }))
