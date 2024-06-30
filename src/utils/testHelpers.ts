import { PreferencesContext, SessionData } from '@/types/sessionData'
import { faker } from '@faker-js/faker'
import {
  Conversation,
  ConversationFlavor,
  conversations,
  createConversation,
} from '@grammyjs/conversations'
import {
  Api,
  Bot,
  Context,
  MemorySessionStorage,
  RawApi,
  SessionFlavor,
  session,
} from 'grammy'
import { ApiResponse, Chat, Update, User } from 'grammy/types'
import * as R from 'ramda'

interface ApiCall<M extends keyof RawApi = keyof RawApi> {
  method: M
  result: Awaited<ReturnType<RawApi[M]>> | ApiResponse<ApiCall>
}

export const botInfo = {
  id: faker.number.int(),
  is_bot: true as const,
  first_name: 'Dummy Bot',
  username: 'dummy_bot',
  can_join_groups: true as const,
  can_read_all_group_messages: false as const,
  supports_inline_queries: false as const,
}

export const chat: Chat.PrivateChat = {
  id: faker.number.int(),
  first_name: 'Test',
  last_name: 'User',
  type: 'private',
}

export const from: User = {
  id: faker.number.int(),
  first_name: 'Test',
  last_name: 'User',
  is_bot: false,
}

export const slashStart: Update = {
  update_id: faker.number.int(),
  message: {
    message_id: faker.number.int(),
    date: faker.date.anytime().getTime(),
    chat,
    from,
    text: '/start',
    entities: [{ type: 'bot_command', offset: 0, length: '/start'.length }],
  },
}

export const slashSetup: Update = {
  update_id: 1,
  message: {
    message_id: 1,
    date: faker.date.anytime().getTime(),
    chat,
    from,
    text: '/setup',
    entities: [{ type: 'bot_command', offset: 0, length: '/setup'.length }],
  },
}

export const generateHandleUpdate = (text: string): Update => {
  return {
    update_id: faker.number.int(),
    message: {
      message_id: faker.number.int(),
      date: faker.date.anytime().getTime(),
      chat: {
        id: faker.number.int(),
        first_name: 'Test',
        last_name: 'User',
        type: 'private',
      },
      from: {
        id: faker.number.int(),
        first_name: 'Test',
        last_name: 'User',
        is_bot: false,
      },
      text,
      entities: [{ type: 'bot_command', offset: 0, length: 6 }],
    },
  }
}

export const testConversation = async <T>(
  builder: (
    conversation: Conversation<PreferencesContext>,
    ctx: PreferencesContext,
  ) => T,
  update: Update | Update[] = [],
  result: ApiCall | ApiCall[] = [],
) => {
  const updates = R.is(Array, update) ? update : [update]
  const results = R.is(Array, result) ? result : [result]

  console.log('updates', updates)
  console.log('results', results)
  const bot = new Bot<PreferencesContext>('dummy', { botInfo })
  bot.api.config.use((_prev, method) => {
    console.log('APICall', method)
    return Promise.resolve({
      ok: true,
      result: {} as any,
    })
  })

  let t: T | undefined
  const wrapper = async (
    conversation: Conversation<PreferencesContext>,
    ctx: PreferencesContext,
  ) => {
    t = builder(conversation, ctx)
  }

  bot.use(
    session({
      initial: (): SessionData => ({
        preferences: [],
      }),
    }),
    conversations(),
    createConversation(wrapper),
  )

  bot.command('start', async (ctx) => ctx.conversation.enter('wrapper'))
  await bot.handleUpdate(slashStart)

  for (const update of updates) {
    await bot.handleUpdate(update)
  }

  return t
}
