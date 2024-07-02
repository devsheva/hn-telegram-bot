import { SessionData } from '@/types/sessionData'

import {
  chat,
  from,
  slashCommand,
  testSetupConversation,
} from '@/utils/testHelpers'

import { MemorySessionStorage } from 'grammy'

import * as R from 'ramda'

var storageAdapter!: MemorySessionStorage<SessionData> | undefined

vi.mock('@/utils', () => ({
  getSessionAdapter: vi.fn(() => {
    storageAdapter = new MemorySessionStorage()
    return storageAdapter
  }),
}))

import setup from '@/preference/setup'

beforeEach(() => {
  vi.resetAllMocks()
})

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
      [],
      setup,
    )
    const preferences = storageAdapter!.read(
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
      [],
      setup,
    )

    const preferences = storageAdapter!.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(preferences).toHaveLength(1)

    expect(preferences).toEqual(['test_preference'])
  })
})

describe('reset', () => {
  it('clears preferences', async () => {
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
      slashCommand('reset'),
      setup,
    )

    const updatedPreferences = storageAdapter!.read(
      R.toString(R.prop('id', chat)),
    )?.preferences

    expect(updatedPreferences).toHaveLength(0)
  })
})

describe('list', () => {
  it('lists preferences', async () => {
    const outgoingRequests = await testSetupConversation(
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
      slashCommand('list'),
      setup,
    )

    const listRequest = R.last(outgoingRequests)

    const payload = R.prop('payload', listRequest!)
    expect(payload).toHaveProperty(
      'text',
      'test_preference\nsome_other_preference',
    )
  })

  it('does not list preferences if there are none', async () => {
    const outgoingRequests = await testSetupConversation(
      [],
      slashCommand('list'),
      setup,
    )

    const listRequest = R.last(outgoingRequests)

    const payload = R.prop('payload', listRequest!)
    expect(payload).toHaveProperty('text', 'No preferences set.')
  })
})
