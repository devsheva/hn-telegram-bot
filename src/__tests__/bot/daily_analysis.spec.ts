import {
  afterAll,
  assertType,
  beforeAll,
  describe,
  IsExact,
  it,
} from '@/dev_deps.ts'
import { cleanupDatabase, seedDatabase } from '@/utils/test_helpers.ts'
import dailyAnalysis, {
  getUsersPreferences,
} from '@/preference/daily_analysis.ts'
import { Preferences } from '@/types.ts'

beforeAll(async () => {
  await seedDatabase()
})

afterAll(async () => {
  await cleanupDatabase()
})

describe('dailyAnalysis', () => {
  it('should reply with filtered articles', async () => {
    // dailyAnalysis()
  })
})

describe('getUsersPreferences', () => {
  it('should return the user preferences', async () => {
    const usersPreferences = await getUsersPreferences()
    assertType<
      IsExact<typeof usersPreferences, { id: string; session: string }[]>
    >(true)
  })

  it('should throw an error if the response is not valid', async () => {
    // ...
    // FIXME: dunno how to test this
  })
})
