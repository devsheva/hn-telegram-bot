import {
  Application,
  Bot,
  conversations,
  session,
  webhookCallback,
} from '@/deps.ts'
import setup from '@/preference/setup.ts'
import { config } from '@/config.ts'
import dailyAnalysis from '@/preference/daily_analysis.ts'
import { PreferencesContext, SessionData } from '@/types.ts'
import { getSessionAdapter } from '@/utils.ts'

const bot = new Bot<PreferencesContext>(config.BOT_TOKEN)

bot.command(
  'help',
  (ctx) =>
    ctx.reply('Bot is under construction. Please wait for the next update.'),
)
bot.use(
  session({
    initial: (): SessionData => ({ preferences: [] }),
    storage: getSessionAdapter(),
  }),
  conversations(),
)

bot.use(setup)

bot.catch((err) => console.error(err))

Deno.cron('daily analysis', '0 1 * * *', async () => {
  console.info('Running daily analysis')
  await dailyAnalysis()
  console.info('Daily analysis completed')
})

const app = new Application()

app.use(webhookCallback(bot, 'oak'))
app.listen({ port: 8080 })
