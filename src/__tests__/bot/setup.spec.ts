import setup from '@/preference/setup'
import { PreferencesContext, SessionData } from '@/types/sessionData'
import {
  botInfo,
  chat,
  from,
  slashCancel,
  slashSetup,
  testSetupConversation,
} from '@/utils/testHelpers'
import { conversations } from '@grammyjs/conversations'
import { Bot, MemorySessionStorage, session } from 'grammy'

import * as R from 'ramda'

describe('setup', () => {
  it('saves preferences', async () => {
    const storageAdapter = await testSetupConversation(
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
      [],
      setup,
    )

    const preferences = storageAdapter.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(preferences).toHaveLength(2)
    expect(preferences).toEqual(['test_preference', 'some_other_preference'])
  })

  it('does not save duplicate preferences', async () => {
    const storageAdapter = await testSetupConversation(
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
      [],
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

    let storageAdapter: MemorySessionStorage<SessionData>

    bot.use(
      session({
        initial: (): SessionData => ({
          preferences: [],
        }),
        storage: (() => {
          storageAdapter = new MemorySessionStorage()
          return storageAdapter
        })(),
      }),
      conversations(),
    )

    bot.use(setup)

    bot.api.config.use(() =>
      Promise.resolve({
        ok: true,
        result: {} as any,
      }),
    )

    await bot.handleUpdate(slashSetup)
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
    await bot.handleUpdate(slashCancel)

    const preferences = storageAdapter.read(
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

    const updatedPreferences = storageAdapter.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(updatedPreferences).toHaveLength(0)
  })
})
