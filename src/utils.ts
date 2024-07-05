import { SessionData } from '@/types/sessionData.ts'
import { freeStorage, MemorySessionStorage, R } from '@deps'
import { APP_ENV } from '@/config.ts'

export const getSessionAdapter = (token?: string) =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(freeStorage<SessionData>(token!)),
  )(APP_ENV)
