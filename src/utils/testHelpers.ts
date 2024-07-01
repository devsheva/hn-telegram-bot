import { PreferencesContext, SessionData } from '@/types/sessionData'
import { faker } from '@faker-js/faker'
import { conversations } from '@grammyjs/conversations'
import {
  Bot,
  Composer,
  MemorySessionStorage,
  Middleware,
  RawApi,
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

type AvailableCommands = 'setup' | 'reset' | 'list' | 'cancel'

export const slashCommand = (command: AvailableCommands): Update => ({
  update_id: 1,
  message: {
    message_id: 1,
    date: faker.date.anytime().getTime(),
    chat,
    from,
    text: R.concat('/', command),
    entities: [
      { type: 'bot_command', offset: 0, length: R.inc(command.length) },
    ],
  },
})

export const testSetupConversation = async (
  update: Update | Update[] = [],
  result: ApiCall | ApiCall[] = [],
  mw: Middleware<PreferencesContext> = new Composer(),
) => {
  const updates = Array.isArray(update) ? update : [update]
  const results = Array.isArray(result) ? result : [result]

  const bot = new Bot<PreferencesContext>('dummy', { botInfo })

  let storageAdapter: MemorySessionStorage<SessionData>

  bot.use(
    session({
      initial: (): SessionData => ({ preferences: [] }),
      storage: (() => {
        storageAdapter = new MemorySessionStorage()
        return storageAdapter
      })(),
    }),
    conversations(),
  )

  bot.api.config.use((_prev, _method) => {
    // TODO: not working yet
    // const { result } = results.splice(
    //   results.findIndex((res) => res.method === method),
    //   1,
    // )[0]

    // return Promise.resolve(
    //   typeof result === 'object' && result !== null && 'ok' in result
    //     ? result
    //     : {
    //         ok: true,
    //         result: result as any,
    //       },
    // )
    return Promise.resolve({ ok: true, result: {} as any })
  })

  bot.use(mw)

  await bot.handleUpdate(slashCommand('setup'))
  for (const update of updates) {
    await bot.handleUpdate(update)
  }

  await bot.handleUpdate(slashCommand('cancel'))

  return storageAdapter
}
