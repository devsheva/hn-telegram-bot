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
      (id: number) => ({
        id,
        type: 'story',
        by: faker.person.fullName(),
        title: faker.lorem.sentence(),
        time: faker.date.recent().getTime(),
      } as Item),
      3,
    )

    using _fetchStub = stub(
      globalThis,
      'fetch',
      returnsNext(R.map(promisifyFactoryObj<Item>, fakeItems)),
    )

    const ids = [1, 2, 3]
    const result = await bulkRetrieveItems(ids)

    assertType<IsExact<typeof result, Item[]>>(true)
    assertEquals(result.length, ids.length)
    assertEquals(result, fakeItems)
  })

  // TODO: add error handling tests
})
