import { APP_ENV } from '@/config.ts'
import { freeStorage, MemorySessionStorage, R } from '@/deps.ts'
import { SessionData } from '@/types.ts'

export const getSessionAdapter = (token?: string) =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(freeStorage<SessionData>(token!)),
  )(APP_ENV)
