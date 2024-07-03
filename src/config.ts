import { load } from '@std/dotenv'

type EnvKeys = 'BOT_TOKEN' | 'DENO_ENV' | 'HN_API'

const env = await load() as Record<EnvKeys, string>

export const HN_API = 'https://hacker-news.firebaseio.com/v0/'
export const BOT_TOKEN = env.BOT_TOKEN
export const DENO_ENV = env.DENO_ENV
