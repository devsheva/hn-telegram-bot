import { load } from '@std/dotenv'

import { parseArgs } from '@std/cli'
import { R } from '@/deps.ts'

type EnvKeys = 'BOT_TOKEN' | 'APP_ENV'

const isTest = parseArgs(Deno.args).test
const envPath = R.ifElse(
  R.equals(true),
  R.always('.env.test'),
  R.always('.env'),
)(isTest)

const env = await load({
  envPath,
}) as Record<EnvKeys, string>

export const HN_API = 'https://hacker-news.firebaseio.com/v0/'
export const BOT_TOKEN = env.BOT_TOKEN || Deno.env.get('BOT_TOKEN')
export const APP_ENV = env.APP_ENV || Deno.env.get('APP_ENV')
