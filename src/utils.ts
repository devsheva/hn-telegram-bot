import {
  createClient,
  MemorySessionStorage,
  R,
  supabaseAdapter,
} from '@/deps.ts'
import { SessionData } from '@/types.ts'
import { config } from '@/config.ts'
import { Database } from '@/database.ts'

export const connection = createClient<Database>(
  config.SUPABASE_URL,
  config.SUPABASE_KEY,
  {
    db: {
      schema: config.SUPABASE_SCHEMA,
    },
  },
)

export const getSessionAdapter = () =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(supabaseAdapter({
      supabase: connection,
      table: 'sessions',
    } as any)),
  )(config.APP_ENV)
