import { faker } from '@dev_deps'
import { getTopStories } from '@/api.ts'

describe('getTopStories', () => {
  it('should return an array of top stories', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () =>
        Promise.resolve(
          faker.helpers.multiple<number>(faker.number.int, { count: 500 }),
        ),
    } as any)

    const result = await getTopStories()
    expect(result).toBeInstanceOf(Array<number>)
    expect(result).toHaveLength(500)
  })
})
