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

    R.when(R.equals('/cancel'), async () => {
      conversation.session.preferences = Array.from(inputPreferences)
      await ctx.reply('Leaving...')
      return
    })(text)

    inputPreferences.add(text)
  }
}

composer.use(createConversation(preferencesBuilder, 'preferences'))
composer.command('setup', async (ctx) => {
  await ctx.conversation.enter('preferences')
})

// TODO: add a command to clear preferences

composer.on('message', (ctx) =>
  ctx.reply('Please use the /setup command to setup your preferences.'),
)

export default composer
