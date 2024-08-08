import { connection } from '@/utils.ts'
import { R } from '@/deps.ts'
import { filterStories } from '@/analysis.ts'
import { SessionData } from '@/types.ts'

async function getUsersPreferences(): Promise<
  {
    id: string
    session: string | null
  }[]
> {
  const { data, error } = await connection.from('sessions')
    .select('id, session')

  R.unless(
    R.isNil,
    (err) => {
      console.error(JSON.stringify(err))
      throw new Error('Error fetching user preferences')
    },
  )(error)

  return data || []
}

async function dailyAnalysis() {
  console.group('dailyAnalysis')
  const usersPreferences = await getUsersPreferences()
  console.debug('start', usersPreferences)

  const botModule = await import('@/bot.ts')
  const bot = botModule.default

  R.forEach<typeof usersPreferences[0]>(
    async ({ id, session: sessionJson }) => {
      const session = JSON.parse(sessionJson!)
      console.debug('user, session:', id, session.preferences)
      const preferences = R.propOr<object>(
        {},
        'preferences',
      )<SessionData, string[]>(session)

      console.debug('preferences', preferences)
      const filteredStories = await filterStories(preferences)
      console.debug('filteredStories', filteredStories)
      bot.api.sendMessage(id, filteredStories.join('\n'))
    },
  )(usersPreferences)

  console.groupEnd()
}

export default dailyAnalysis
export { getUsersPreferences }
