// deno-lint-ignore-file no-explicit-any
import { getItem } from '@/api.ts'
import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  describe,
  it,
  stub,
} from '@/dev_deps.ts'

describe('getItem', () => {
  it('should return an item', async () => {
    const fakeResponse = Promise.resolve({
      json: () =>
        Promise.resolve({
          by: 'dhouston',
          descendants: 71,
          id: 8863,
          score: 104,
          time: 1175714200,
          title: 'My YC app: Dropbox - Throw away your USB drive',
          type: 'story',
          url: 'http://www.getdropbox.com/u/2/screencast.html',
        }),
    } as any)

    using _fetchStub = stub(
      globalThis,
      'fetch',
      () => fakeResponse,
    )

    const item = await getItem(8863)

    assertInstanceOf(item, Object)
    assertExists(Object.prototype.hasOwnProperty.call(item, 'by'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'descendants'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'id'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'score'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'time'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'title'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'type'))
    assertExists(Object.prototype.hasOwnProperty.call(item, 'url'))
  })

  it('should handle not found item', async () => {
    using _fetchStub = stub(globalThis, 'fetch', () =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      } as any))

    const item = await getItem(-1)
    assertEquals(item, null)
  })
})
