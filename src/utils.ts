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
      // deno-lint-ignore no-explicit-any
      schema: config.SUPABASE_SCHEMA as any, // FIXME: remove any when found a way to type custom schemas (#20)
    },
  },
)

export const getSessionAdapter = () =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(supabaseAdapter<SessionData>({
      supabase: connection,
      table: 'sessions',
    })),
  )(config.APP_ENV)
