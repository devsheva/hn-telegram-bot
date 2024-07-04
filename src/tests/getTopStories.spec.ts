import {
  assertInstanceOf,
  assertObjectMatch,
  describe,
  faker,
  it,
  stub,
} from '@dev_deps'
import { getTopStories } from '@/api.ts'

describe('getTopStories', () => {
  it('should return an array of top stories', async () => {
    const fakeResponse = Promise.resolve({
      json: () =>
        Promise.resolve(
          faker.helpers.multiple<number>(faker.number.int, { count: 500 }),
        ),
    } as any)

    // Stubbing globalThis.fetch directly with a function that returns the fake response
    using _fetchStub = stub(globalThis, 'fetch', () => fakeResponse)

    const result = await getTopStories()
    assertInstanceOf(result, Array<number>)

    assertObjectMatch(result, {
      length: 500,
    })
  })
})
