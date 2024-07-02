import { PreferencesContext, SessionData } from '@/types/sessionData'

import {
  botInfo,
  chat,
  from,
  slashCommand,
  testSetupConversation,
} from '@/utils/testHelpers'
import { conversations } from '@grammyjs/conversations'
import { Bot, MemorySessionStorage, session } from 'grammy'

import * as R from 'ramda'

var storageAdapter!: MemorySessionStorage<SessionData> | undefined

vi.mock('@/utils', () => ({
  getSessionAdapter: vi.fn(() => {
    storageAdapter = new MemorySessionStorage()
    return storageAdapter
  }),
}))

import setup from '@/preference/setup'

describe('setup', () => {
  it('saves preferences', async () => {
    await testSetupConversation(
      [
        {
          update_id: 1,
          message: {
            message_id: 1,
            date: Date.now(),
            chat,
            from,
            text: 'test_preference',
          },
        },
        {
          update_id: 2,
          message: {
            message_id: 2,
            date: Date.now(),
            chat,
            from,
            text: 'some_other_preference',
          },
        },
      ],
      setup,
    )
    const preferences = storageAdapter.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(preferences).toHaveLength(2)
    expect(preferences).toEqual(['test_preference', 'some_other_preference'])
  })

  it('does not save duplicate preferences', async () => {
    await testSetupConversation(
      [
        {
          update_id: 1,
          message: {
            message_id: 1,
            date: Date.now(),
            chat,
            from,
            text: 'test_preference',
          },
        },
        {
          update_id: 2,
          message: {
            message_id: 2,
            date: Date.now(),
            chat,
            from,
            text: 'test_preference',
          },
        },
      ],
      setup,
    )

    const preferences = storageAdapter.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(preferences).toHaveLength(1)

    expect(preferences).toEqual(['test_preference'])
  })
})

describe('reset', () => {
  it('clears preferences', async () => {
    const bot = new Bot<PreferencesContext>('dummy', { botInfo })

    bot.use(setup)

    bot.api.config.use(() =>
      Promise.resolve({
        ok: true,
        result: {} as any,
      }),
    )

    await bot.handleUpdate(slashCommand('setup'))
    await bot.handleUpdate(slashCommand('reset'))
    await bot.handleUpdate(slashCommand('cancel'))

    const preferences = storageAdapter!.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(preferences).toHaveLength(1)

    await bot.handleUpdate({
      update_id: 1,
      message: {
        message_id: 1,
        date: Date.now(),
        chat,
        from,
        text: '/reset',
        entities: [{ type: 'bot_command', offset: 0, length: '/reset'.length }],
      },
    })

    const updatedPreferences = storageAdapter!.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(updatedPreferences).toHaveLength(0)
  })
})

/*
describe('list', () => {
  beforeEach(async () => {
    outgoingRequests = []
    bot.api.config.use((_, method, payload) => {
      outgoingRequests.push({ method, payload })
      return Promise.resolve({ ok: true, result: {} as any })
    })

    bot.botInfo = botInfo

    await bot.init()
  })

  it('lists preferences', async () => {
    await bot.handleUpdate(slashCommand('setup'))
    await bot.handleUpdate({
      update_id: 1,
      message: {
        message_id: 1,
        date: Date.now(),
        chat,
        from,
        text: 'test_preference',
      },
    })

    await bot.handleUpdate({
      update_id: 1,
      message: {
        message_id: 1,
        date: Date.now(),
        chat,
        from,
        text: 'some_other_preference',
      },
    })

    await bot.handleUpdate(slashCommand('list'))

    const listRequest = R.last(outgoingRequests)

    const payload = R.prop('payload', listRequest!)
    expect(payload).toHaveProperty(
      'text',
      'test_preference\nsome_other_preference',
    )
  })

  it('does not list preferences if there are none', async () => {
    await bot.handleUpdate(slashCommand('list'))

    const listRequest = R.last(outgoingRequests)

    const payload = R.prop('payload', listRequest!)
    expect(payload).toHaveProperty('text', '')
  })
})

*/
