import { getTopStories } from '@/api'
import { faker } from '@faker-js/faker'
import { jest } from '@jest/globals'

describe('getTopStories', () => {
  it('should return an array of top stories', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () =>
        Promise.resolve(
          faker.helpers.multiple<Number>(faker.number.int, { count: 500 })
        ),
    } as any)

    const result = await getTopStories()
    expect(result).toBeInstanceOf(Array<number>)
    expect(result).toHaveLength(500)
  })
})
