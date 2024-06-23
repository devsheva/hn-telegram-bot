import { Bot } from 'grammy'
import setup from './preference/setup'
import { BOT_TOKEN } from './config'

const bot = new Bot(BOT_TOKEN!)

bot.command('help', (ctx) =>
  ctx.reply('Bot is under construction. Please wait for the next update.')
)

await bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'setup', description: 'Setup your preferences' },
  { command: 'help', description: 'Display help text' },
])

bot.use(setup)

export default bot
