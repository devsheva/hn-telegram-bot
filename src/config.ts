import { R, z } from '@/deps.ts'
import { load } from '@std/dotenv'

const envSchema = z.object({
  HN_API: z.string().default('https://hacker-news.firebaseio.com/v0'),
  BOT_TOKEN: z.string().default('dummy'),
  APP_ENV: z.enum(['development', 'test', 'production']).default('development'),
  GEMINI_API_KEY: z.string().default('dummy'),
  BASE_GEMINI_ENDPOINT: z.string().default(
    'https://generativelanguage.googleapis.com/v1',
  ),
})

try {
  const env = await load({ export: true })
  if (R.isEmpty(env)) throw new Error('no env file found')
} catch {
  console.warn('no env file found, using environment variables')
}

export const config = envSchema.parse(Deno.env.toObject())
