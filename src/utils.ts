import { freeStorage, MemorySessionStorage, R } from '@/deps.ts'
import { SessionData } from '@/types.ts'
import { config } from '@/config.ts'

export const getSessionAdapter = (token?: string) =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(freeStorage<SessionData>(token!)),
  )(config.APP_ENV)
