import { freeStorage } from '@grammyjs/storage-free'
import { MemorySessionStorage } from 'grammy'
import * as R from 'ramda'
import { SessionData } from './types/sessionData'

export const getSessionAdapter = () =>
  R.ifElse(
    R.equals('test'),
    R.always(ramAdapter),
    R.always(freeStorageAdapter),
  )(process.env.NODE_ENV!)

const ramAdapter = (...args: any) => new MemorySessionStorage(args)
const freeStorageAdapter = () => freeStorage<SessionData>
