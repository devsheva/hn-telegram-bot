import { chat, from, testConversation } from '@/utils/testHelpers'
import { faker } from '@faker-js/faker'

describe('setup', () => {
  it('asks for preference', async () => {
    await testConversation(
      async (c, _) => {
        const preferenceCtx = await c.waitFor(':text')
        expect(preferenceCtx.msg.text).toBe('test_preference')
      },
      {
        update_id: 1,
        message: {
          message_id: 1,
          date: faker.date.anytime().getTime(),
          from,
          chat,
          text: 'test_preference',
        },
      },
    )
  })

  it('does not save duplicate preferences', async () => {
    throw new Error('Not implemented')
  })
})

describe('cancel', () => {
  it('clears preferences', async () => {
    throw new Error('Not implemented')
  })
})
