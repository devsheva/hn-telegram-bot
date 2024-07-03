import { getSessionAdapter } from '@/utils.ts'

import { ConversationContext, PreferencesContext } from '@/types/sessionData.ts'
import { Composer, conversations, createConversation, R, session } from '@deps'

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

composer.use(
  session({
    initial: () => ({ preferences: [] }),
    storage: getSessionAdapter(''),
  }),
  conversations(),
  createConversation(preferencesBuilder, 'preferences'),
)

composer.command('setup', async (ctx) => {
  await ctx.conversation.enter('preferences')
})

composer.command('reset', (ctx) => {
  ctx.session.preferences = []
  ctx.reply('Preferences reset.')
})

composer.command('list', (ctx) =>
  ctx.reply(
    R.ifElse(
      R.isEmpty,
      R.always('No preferences set.'),
      R.join('\n'),
    )(ctx.session.preferences),
  ))
composer.on('message', (ctx) => {
  ctx.reply('Please use the /setup command to setup your preferences.')
})

export default composer
