import { Bot } from 'grammy'
import setup from './preference/setup.ts'
import { BOT_TOKEN } from './config.ts'
import { PreferencesContext } from './types/sessionData.ts'

const bot = new Bot<PreferencesContext>(BOT_TOKEN!)

bot.command(
  'help',
  (ctx) =>
    ctx.reply('Bot is under construction. Please wait for the next update.'),
)

bot.use(setup)

bot.catch((err) => console.error(err))

bot.start()
