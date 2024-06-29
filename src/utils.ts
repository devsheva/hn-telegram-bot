import { freeStorage } from '@grammyjs/storage-free'
import { MemorySessionStorage } from 'grammy'
import * as R from 'ramda'
import { SessionData } from './types/sessionData'

export const getSessionAdapter = (token?: string) =>
  R.ifElse(
    R.equals('test'),
    R.always(new MemorySessionStorage<SessionData>()),
    R.always(freeStorage<SessionData>(token!)),
  )(process.env.NODE_ENV!)
