import { load } from '@std/dotenv'
import { R } from '@deps'
import { parseArgs } from '@std/cli'

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

console.log('deno env', Deno.env.toObject())

export const HN_API = 'https://hacker-news.firebaseio.com/v0/'
export const BOT_TOKEN = env.BOT_TOKEN || Deno.env.get('BOT_TOKEN')
export const APP_ENV = env.APP_ENV || Deno.env.get('APP_ENV')
