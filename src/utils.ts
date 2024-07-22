import {
  createClient,
  MemorySessionStorage,
  R,
  supabaseAdapter,
} from '@/deps.ts'
import { SessionData } from '@/types.ts'
import { config } from '@/config.ts'

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

export const getSessionAdapter = () =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(supabaseAdapter({
      supabase,
      table: 'sessions',
    })),
  )(config.APP_ENV)
