import { Bot } from 'grammy'
import setupComposer from './preference/setup'

const bot = new Bot(process.env.BOT_TOKEN!)

bot.command('help', (ctx) =>
  ctx.reply('Bot is under construction. Please wait for the next update.')
)

await bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'setup', description: 'Setup your preferences' },
  { command: 'help', description: 'Display help text' },
])

bot.use(setupComposer)
bot.start()

export default bot
