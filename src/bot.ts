import setup from './preference/setup.ts'
import { BOT_TOKEN } from './config.ts'

import { Bot, conversations, session } from '@deps'
import { getSessionAdapter } from '@/utils.ts'
import { PreferencesContext, SessionData } from '@/types.ts'

const bot = new Bot<PreferencesContext>(BOT_TOKEN!)

bot.command(
  'help',
  (ctx) =>
    ctx.reply('Bot is under construction. Please wait for the next update.'),
)

bot.use(
  session({
    initial: (): SessionData => ({ preferences: [] }),
    storage: getSessionAdapter(BOT_TOKEN),
  }),
  conversations(),
)

bot.use(setup)

bot.catch((err) => console.error(err))

bot.start()
