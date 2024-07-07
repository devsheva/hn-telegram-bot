import { Bot, conversations, session } from '@/deps.ts'
import setup from '@/preference/setup.ts'
import { PreferencesContext, SessionData } from '@/types.ts'
import { getSessionAdapter } from '@/utils.ts'
import { config } from '@/config.ts'

const bot = new Bot<PreferencesContext>(config.BOT_TOKEN)

bot.command(
  'help',
  (ctx) =>
    ctx.reply('Bot is under construction. Please wait for the next update.'),
)

bot.use(
  session({
    initial: (): SessionData => ({ preferences: [] }),
    storage: getSessionAdapter(config.BOT_TOKEN),
  }),
  conversations(),
)

bot.use(setup)

bot.catch((err) => console.error(err))

bot.start()
