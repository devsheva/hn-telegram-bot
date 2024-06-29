import { ConversationContext, PreferencesContext } from '@/types/sessionData'
import { createConversation } from '@grammyjs/conversations'
import { Composer } from 'grammy'

const composer = new Composer<PreferencesContext>()

const greeting = async (
  conversation: ConversationContext,
  ctx: PreferencesContext,
) => {
  await ctx.reply('What is your name?')
  const nameCtx = await conversation.waitFor(':text')
  ctx.reply(`Hello, ${nameCtx.msg.text}!`)
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
