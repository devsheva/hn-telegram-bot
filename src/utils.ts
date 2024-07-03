import { freeStorage } from '@grammyjs/storage-free'
import { MemorySessionStorage } from 'grammy'

import { SessionData } from '@/types/sessionData.ts'
import { DENO_ENV } from '@/config.ts'
import { R } from '@deps'

export const getSessionAdapter = (token?: string) =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(freeStorage<SessionData>(token!)),
  )(DENO_ENV)
