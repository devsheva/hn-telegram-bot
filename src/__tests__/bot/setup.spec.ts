import { jest } from '@jest/globals'
import bot from '@/bot'

const TIMEOUT = 5000
let outgoingRequest = []

beforeAll(async () => {
  // Incorrectly return undefined instead of the respective object types.
  bot.api.config.use((prev, method, payload) => {
    outgoingRequest.push({ method, payload })
    return { ok: true, result: {} } as any
  })

  await bot.init()
}, TIMEOUT)

beforeEach(() => {
  outgoingRequest = []
})
