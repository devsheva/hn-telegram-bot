import { ConversationContext, PreferencesContext } from '@/types/sessionData'
import { createConversation } from '@grammyjs/conversations'
import { Composer } from 'grammy'
import * as R from 'ramda'
const composer = new Composer<PreferencesContext>()

const printPreferences = async (ctx: PreferencesContext) => {
  const preferences = ctx.session.preferences
  if (R.isEmpty(preferences)) {
    await ctx.reply('No preferences set.')
  } else {
    await ctx.reply(`Your preferences are: ${R.join(',')(preferences)}`)
  }
}

const greeting = async (
  conversation: ConversationContext,
  ctx: PreferencesContext,
) => {
  const inputPreferences = new Set<string>()

  do {
    await printPreferences(ctx)
    await ctx.reply('Type your preference. Use /cancel to exit.')
    const preferenceCtx = await conversation.waitFor(':text')
    inputPreferences.add(preferenceCtx.msg.text)
  } while (!ctx.hasCommand('cancel'))

  ctx.session.preferences = Array.from(inputPreferences)
}

composer.use(createConversation(greeting))
composer.command('setup', async (ctx) => {
  await ctx.conversation.enter('greeting')
})

// TODO: add a command to clear preferences

composer.on('message', (ctx) =>
  ctx.reply('Please use the /setup command to setup your preferences.'),
)

export default composer
