// deno-lint-ignore-file no-explicit-any
import { GeminiAdapter } from '@/ai_adapters/gemini.ts'
import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertObjectMatch,
  assertRejects,
  assertThrows,
  assertType,
  describe,
  IsExact,
  it,
  stub,
} from '@/dev_deps.ts'
import { RequestContent } from '@/types.ts'
import { ResponseContent } from '@/ai_adapters/base.ts'

describe('GeminiAdapter', () => {
  describe('constructor', () => {
    it('should create an instance of GeminiAdapter', () => {
      const adapter = new GeminiAdapter()

      assertInstanceOf(adapter, GeminiAdapter)
      assertExists(adapter['_apiKey'])
      assertExists(adapter['_baseUrl'])
      assertExists(adapter['_model'])
    })
  })

  describe('buildBody', () => {
    it('throws an error when input not provided', () => {
      const adapter = new GeminiAdapter()

      assertThrows(
        () => adapter.buildBody(''),
      )
    })

    it('should return a request content', () => {
      const adapter = new GeminiAdapter()
      const requestContent = adapter.buildBody('Hello, world!')

      assertObjectMatch(requestContent, {
        contents: [
          {
            parts: [{
              text: 'Hello, world!',
            }],
          },
        ],
      })

      assertType<IsExact<typeof requestContent, RequestContent>>(true)
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

      const fakeResponse = Promise.resolve(
        new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: 'Hello, world!',
                    },
                  ],
                },
                safetyRatings: [],
              },
            ],
          }),
          { status: 200 },
        ),
      )

      using _fetchStub = stub(globalThis, 'fetch', () => fakeResponse)

      const response = await adapter.generateContent('Hello, world!')

      assertType<IsExact<typeof response, ResponseContent>>(true)
      assertEquals(response.text, 'Hello, world!')
    })

    // TODO: add handle API error test
  })
})
