import { jest } from '@jest/globals'
import * as R from 'ramda'
import bot from '@/bot'

const TIMEOUT = 5000

let outgoingRequests: {
  method: string
  payload: any
}[] = []

const extractProp =
  <K extends keyof (typeof outgoingRequests)[0]>(prop: K) =>
  (request: (typeof outgoingRequests)[0]) =>
    R.prop(prop, request)

beforeAll(async () => {
  bot.api.config.use((_, method, payload) => {
    outgoingRequests.push({ method, payload })
    return { ok: true, result: {} } as any
  })

  await bot.init()
}, TIMEOUT)

beforeEach(() => {
  outgoingRequests = []
})

describe('commands', () => {
  it('responds to setup command', async () => {
    await bot.handleUpdate({
      update_id: 10000,
      message: {
        date: Date.now(),
        text: '/setup',
        message_id: 1,
        from: {
          id: 1,
          is_bot: false,
          first_name: 'Test',
          last_name: 'Lastname',
          username: 'test',
        },
        entities: [
          {
            type: 'bot_command',
            offset: 0,
            length: 6,
          },
        ],
        chat: {
          id: 1,
          type: 'private',
          first_name: 'Test',
          last_name: 'Lastname',
        },
      },
    })
    expect(outgoingRequests).toHaveLength(1)

    const method = R.pipe(R.head, extractProp('method'))(outgoingRequests)
    expect(method).toEqual('sendMessage')

    const payload = R.pipe(R.head, extractProp('payload'))(outgoingRequests)
    expect(payload).toHaveProperty('text', 'Setting up your preferences...')
  })
})

describe('persist user preferences', () => {
  it('responds to user preferences', async () => {})
})
