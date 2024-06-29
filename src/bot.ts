import { Bot, session } from 'grammy'
import setup from './preference/setup'
import { BOT_TOKEN } from './config'
import { PreferencesContext } from './types/sessionData'
import { getSessionAdapter } from './utils'

const bot = new Bot<PreferencesContext>(BOT_TOKEN!)

bot.command('help', (ctx) =>
  ctx.reply('Bot is under construction. Please wait for the next update.'),
)

bot.use(
  session({
    initial: () => ({ preferences: [] }),
    storage: getSessionAdapter(bot.token!),
  }),
)

bot.use(setup)

bot.catch((err) => console.error(err))

export default bot
