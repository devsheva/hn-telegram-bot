import { assertType, describe, IsExact } from '@/dev_deps.ts'
import { it } from 'jsr:@std/testing@^0.225.3/bdd'
import { GeminiAdapter } from '@/ai_adapters/mod.ts'
import { assertExists, assertInstanceOf, assertRejects } from '@std/assert'

describe('GeminiAdapter', () => {
  describe('constructor', () => {
    it('should create an instance of GeminiAdapter', () => {
      const adapter = new GeminiAdapter()

      assertInstanceOf(adapter, GeminiAdapter)
      assertExists(adapter['_apiKey'])
      assertExists(adapter['_baseUrl'])
    })
  })

  describe('generateContent', () => {
    it('should throw an error when input not provided', () => {
      const adapter = new GeminiAdapter()

      assertRejects(
        () => adapter.generateContent(''),
        Error,
        'Text is required',
      )
    })

    it('should return a response content', async () => {
      const adapter = new GeminiAdapter()
      const response = await adapter.generateContent('Hello, world!')

      assertExists(response)
      assertType<IsExact<typeof response.text, string>>(true)
    })
  })
})
