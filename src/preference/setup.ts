import { Composer } from 'grammy'
import { MessageAutoDeleteTimerChanged } from 'grammy/types'
const composer = new Composer()

composer.command('setup', (ctx) => ctx.reply('Setting up your preferences...'))

composer.on('message', (ctx) =>
  ctx.reply('Please use the /setup command to setup your preferences.')
)

export default composer
