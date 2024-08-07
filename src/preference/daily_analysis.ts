import { Preferences } from '@/types.ts'
import { connection } from '@/utils.ts'
import { R } from '@/deps.ts'

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
}
