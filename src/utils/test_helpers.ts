// deno-lint-ignore-file no-explicit-any
import {
  ApiResponse,
  Bot,
  Chat,
  Composer,
  conversations,
  MemorySessionStorage,
  Middleware,
  R,
  RawApi,
  session,
  Update,
  User,
} from '@/deps.ts'
import { faker } from '@/dev_deps.ts'
import { PreferencesContext, SessionData } from '@/types.ts'
import { connection } from '@/utils.ts'

export interface ApiCall<M extends keyof RawApi = keyof RawApi> {
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
  storageAdapter: () => MemorySessionStorage<SessionData>,
  update: Update | Update[] = [],
  afterCancel: Update | Update[] = [],
  mw: Middleware<PreferencesContext> = new Composer(),
) => {
  const updates = Array.isArray(update) ? update : [update]
  const afterCancelUpdates = Array.isArray(afterCancel)
    ? afterCancel
    : [afterCancel]

  const results: Array<{
    method: string
    payload: any
  }> = []

  const bot = new Bot<PreferencesContext>('dummy', { botInfo })

  bot.api.config.use((_prev, method, payload) => {
    results.push({ method, payload })
    return Promise.resolve({ ok: true, result: {} as any })
  })

  bot.use(
    session({
      initial: (): SessionData => ({ preferences: [] }),
      storage: storageAdapter(),
    }),
    conversations(),
  )

  bot.use(mw)

  await bot.handleUpdate(slashCommand('setup'))
  for (const update of updates) {
    await bot.handleUpdate(update)
  }

  await bot.handleUpdate(slashCommand('cancel'))

  for (const update of afterCancelUpdates) {
    await bot.handleUpdate(update)
  }

  return results
}

export function promisifyFactoryObj<TFactory>(
  obj: TFactory,
  status = 200,
): Promise<Response> {
  return Promise.resolve(
    new Response(JSON.stringify(obj), { status }),
  )
}

export async function seedDatabase() {
  await connection.from('sessions')
    .upsert(
      R.times(
        (id: number) => ({
          id: R.join('_', ['test', id]),
          session: JSON.stringify({
            preferences: faker.helpers.multiple(faker.commerce.department, {
              count: faker.number.int({ min: 1, max: 5 }),
            }),
          }),
        }),
        10,
      ),
    )
}

export async function cleanupDatabase() {
  await connection.from('sessions')
    .delete().like('id', 'test%')
}
