import { Bot } from 'grammy'

const bot = new Bot(process.env.BOT_TOKEN!)

bot.command('help', (ctx) => ctx.reply('This is a help text'))

await bot.api.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'setup', description: 'Setup your preferences' },
  { command: 'help', description: 'Display help text' },
])

bot.start()

export default bot
