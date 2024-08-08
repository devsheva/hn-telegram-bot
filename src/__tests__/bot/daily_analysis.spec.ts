import {
  afterAll,
  assertType,
  beforeAll,
  describe,
  faker,
  IsExact,
  it,
  returnsNext,
  simpleFaker,
  stub,
} from '@/dev_deps.ts'
import {
  botInfo,
  cleanupDatabase,
  promisifyFactoryObj,
  seedDatabase,
} from '@/utils/test_helpers.ts'
import dailyAnalysis, {
  getUsersPreferences,
} from '@/preference/daily_analysis.ts'
import { R } from '@/deps.ts'
import * as F from '@/functions.ts'
import { Item, TopStories } from '@/types.ts'

beforeAll(async () => {
  await seedDatabase()
})

afterAll(async () => {
  await cleanupDatabase()
})

function mockFullSetup() {
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
  const fakeItems: Item[] = F.mapIndexed(
    (id, idx) => ({
      id,
      type: 'story',
      by: faker.person.fullName(),
      title: fakeStoryTitles[idx],
      time: faker.date.recent().getTime(),
    }),
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

  const fakeResponses = [
    promisifyFactoryObj<TopStories>(fakeTopStories),
    ...R.map(promisifyFactoryObj<Item>, fakeItems),
    promisifyFactoryObj(fakeGeminiResponse),
  ]

  stub(
    globalThis,
    'fetch',
    returnsNext(
      fakeResponses,
    ),
  )
}

describe('dailyAnalysis', () => {
  it('should reply with filtered articles', async () => {
    mockFullSetup()
    await dailyAnalysis()

    // TODO: it should send a message to the user
    // TODO: find a way to test bot sending message
  })

  it('should skip run if there are no users', async () => {
  })
})

describe('getUsersPreferences', () => {
  it('should return the user preferences', async () => {
    const usersPreferences = await getUsersPreferences()
    assertType<
      IsExact<
        typeof usersPreferences,
        { id: string; session: string | null }[]
      >
    >(true)
  })

  it('should throw an error if the response is not valid', async () => {
    // ...
    // FIXME: dunno how to test this
  })
})
