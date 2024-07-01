import setup from '@/preference/setup'
import { chat, from, testSetupConversation } from '@/utils/testHelpers'

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
    throw new Error('Not implemented')
  })
})
