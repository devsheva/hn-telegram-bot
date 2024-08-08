import { R, z } from '@/deps.ts'
import { load } from '@std/dotenv'
import { parseArgs } from '@std/cli'

const envSchema = z.object({
  HN_API: z.string().default('https://hacker-news.firebaseio.com/v0'),
  BOT_TOKEN: z.string().default('dummy'),
  APP_ENV: z.enum(['development', 'test', 'production']).default('development'),
  GEMINI_API_KEY: z.string().default('dummy'),
  BASE_GEMINI_ENDPOINT: z.string().default(
    'https://generativelanguage.googleapis.com/v1beta',
  ),
  SUPABASE_URL: z.string().default('dummy'),
  SUPABASE_KEY: z.string().default('dummy'),
  SUPABASE_SCHEMA: z.string().default('public'),
})

try {
  const env = await R.ifElse(
    R.propEq('test', 'true'),
    R.always({}),
    () => load({ export: true }),
  )(parseArgs(Deno.args))

  if (R.isEmpty(env)) throw new Error('no env file found')
} catch {
  console.warn('no env file found, using environment variables')
}

export const config = envSchema.parse(Deno.env.toObject())
