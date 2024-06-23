import { Bot } from 'grammy'
import setup from './preference/setup'
import { BOT_TOKEN } from './config'

const bot = new Bot(BOT_TOKEN!)

bot.command('help', (ctx) =>
  ctx.reply('Bot is under construction. Please wait for the next update.')
)

bot.use(setup)

export default bot
