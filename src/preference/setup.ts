import { PreferencesContext } from '@/types/sessionData'
import { Composer } from 'grammy'

const composer = new Composer<PreferencesContext>()

composer.command('setup', (ctx) => ctx.reply('Setting up your preferences...'))

composer.on('message', (ctx) =>
  ctx.reply('Please use the /setup command to setup your preferences.'),
)

export default composer
