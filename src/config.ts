import { load } from '@std/dotenv'
import { R } from '@deps'
import { parseArgs } from '@std/cli'

type EnvKeys = 'BOT_TOKEN' | 'DENO_ENV'

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
export const BOT_TOKEN = env.BOT_TOKEN
export const DENO_ENV = env.DENO_ENV
