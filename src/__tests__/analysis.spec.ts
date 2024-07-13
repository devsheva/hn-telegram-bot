import { describe, it } from '@/dev_deps.ts'

describe('filterStories', () => {
  it('filters stories by preferences', () => {
    const preferences = ['TypeScript', 'AWS', 'Deno']

describe('bulkRetrieveItems', () => {
  describe('no items', () => {
    it('returns an empty array', async () => {
      assertEquals(await bulkRetrieveItems([]), [])
    })
  })

  it('retrieves items in bulk', async () => {
    const fakeItems = R.times(
      (id: number) =>
        Promise.resolve(
          new Response(
            JSON.stringify(id),
            { status: 200 },
          ),
        ),
      3,
    )

    using _fetchStub = stub(
      globalThis,
      'fetch',
      returnsNext(fakeItems),
    )

    const ids = [1, 2, 3]
    const result = await bulkRetrieveItems(ids)

    assertType<IsExact<typeof result, Item[]>>(true)
    assertEquals(result.length, ids.length)
    assertEquals(result, [])
  })
})
