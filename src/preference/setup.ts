import { ConversationContext, PreferencesContext } from '@/types/sessionData'
import { createConversation } from '@grammyjs/conversations'
import { Composer } from 'grammy'
import * as R from 'ramda'

const composer = new Composer<PreferencesContext>()
const preferencesBuilder = async (
  conversation: ConversationContext,
  ctx: PreferencesContext,
) => {
  const inputPreferences = new Set<string>()

  while (R.T()) {
    await ctx.reply('Type your preference. Use /cancel to exit.')
    const {
      msg: { text },
    } = await conversation.waitFor(':text')

    if (text === '/cancel') {
      conversation.session.preferences = Array.from(inputPreferences)
      await ctx.reply('Leaving...')
      return
    }

    inputPreferences.add(text)
  }
}

composer.use(createConversation(preferencesBuilder, 'preferences'))
composer.command('setup', async (ctx) => {
  await ctx.conversation.enter('preferences')
})

composer.command('reset', (ctx) => {
  ctx.session.preferences = []
  ctx.reply('Preferences reset.')
})

composer.on('message', (ctx) => {
  ctx.reply('Please use the /setup command to setup your preferences.')
})

export default composer
