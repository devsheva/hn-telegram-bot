import { MemorySessionStorage, R } from '@deps'
import {
  afterAll,
  afterEach,
  assertEquals,
  beforeEach,
  describe,
  it,
} from '@dev_deps'
import { SessionData } from '@/types/sessionData.ts'
import {
  chat,
  from,
  slashCommand,
  testSetupConversation,
} from '@/utils/testHelpers.ts'

let storageAdapter: MemorySessionStorage<SessionData> | undefined

const storageAdapterFn = () => {
  storageAdapter = new MemorySessionStorage<SessionData>()
  return storageAdapter
}

beforeEach(() => {
  storageAdapter = undefined
})

// TODO: Remove this once we have a better way to wait for the event loop to clear
afterAll(async () => {
  await new Promise((r) => setTimeout(r, 0))
})

import setup from '@/preference/setup.ts'

describe('setup', () => {
  it('saves preferences', async () => {
    await testSetupConversation(
      storageAdapterFn,
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

    assertEquals(preferences!.length, 2)
    assertEquals(preferences, ['test_preference', 'some_other_preference'])
  })

  it('does not save duplicate preferences', async () => {
    await testSetupConversation(
      storageAdapterFn,
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

    assertEquals(preferences!.length, 1)
    assertEquals(preferences, ['test_preference'])
  })
})

describe('reset', () => {
  it('clears preferences', async () => {
    await testSetupConversation(
      storageAdapterFn,
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

    assertEquals(updatedPreferences, [])
  })
})

describe('list', () => {
  it('lists preferences', async () => {
    const outgoingRequests = await testSetupConversation(
      storageAdapterFn,
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
    assertEquals(payload.text, 'test_preference\nsome_other_preference')
  })

  it('does not list preferences if there are none', async () => {
    const outgoingRequests = await testSetupConversation(
      storageAdapterFn,
      [],
      slashCommand('list'),
      setup,
    )

    const listRequest = R.last(outgoingRequests)

    const payload = R.prop('payload', listRequest!)
    assertEquals(payload.text, 'No preferences set.')
  })
})
