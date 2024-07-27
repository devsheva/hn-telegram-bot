// deno-lint-ignore-file no-explicit-any
import {
  afterEach,
  assertEquals,
  assertType,
  beforeEach,
  describe,
  faker,
  IsExact,
  it,
  restore,
  returnsNext,
  simpleFaker,
  stub,
} from '@/dev_deps.ts'
import { bulkRetrieveItems, filterStories } from '@/analysis.ts'
import { Item, TopStories } from '@/types.ts'
import { R } from '@/deps.ts'
import { promisifyFactoryObj } from '@/utils/test_helpers.ts'
import * as F from '@/functions.ts'

describe('filterStories', () => {
  beforeEach(() => {
    // Mock the getTopStories function
    const fakeTopStories = simpleFaker.helpers.multiple(
      simpleFaker.number.int,
      {
        count: 3,
      },
    )

    const fakeStoryTitles = [
      'Watch out this new AWS Service: Deno on TypeScript',
      'Deno vs Node: A Comprehensive Comparison',
      'My journey to become a lazy developer',
    ]

    // Mock getItem function
    const fakeItems = F.mapIndexed(
      (id: number, idx: number) => ({
        id,
        type: 'story',
        by: faker.person.fullName(),
        title: fakeStoryTitles[idx],
        time: faker.date.recent().getTime(),
      } as Item),
      fakeTopStories,
    )

    const fakeGeminiResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: R.pipe(
                  R.take(2),
                  R.map(R.toString),
                  R.assoc('storyIds', R.__, {}),
                  (v: any) => JSON.stringify(v),
                )(fakeTopStories),
              },
            ],
          },
          safetyRatings: [],
        },
      ],
    }

    stub(
      globalThis,
      'fetch',
      returnsNext([
        promisifyFactoryObj<TopStories>(fakeTopStories),
        ...R.map(promisifyFactoryObj<Item>, fakeItems),
        promisifyFactoryObj(fakeGeminiResponse),
      ]),
    )
  })

  afterEach(() => {
    restore()
  })

  it('does nothing when no preferences are provided', async () => {
    const preferences: string[] = []
    const result = await filterStories(preferences)
    assertEquals(result, [])
  })

  it('filters stories by preferences', async () => {
    const preferences = ['TypeScript', 'AWS', 'Deno']

    const filteredStories = await filterStories(preferences)
    assertEquals(
      filteredStories,
      [
        'Watch out this new AWS Service: Deno on TypeScript',
        'Deno vs Node: A Comprehensive Comparison',
      ],
    )
  })
})

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
