import { getItem } from '@/api'
import { jest } from '@jest/globals'

describe('getItem', () => {
  it('should return an item', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          by: 'dhouston',
          descendants: 71,
          id: 8863,
          score: 104,
          time: 1175714200,
          title: 'My YC app: Dropbox - Throw away your USB drive',
          type: 'story',
          url: 'http://www.getdropbox.com/u/2/screencast.html',
        }),
    } as any)

    const item = await getItem(8863)

    expect(item).toBeInstanceOf(Object)
    expect(item).toHaveProperty('by')
    expect(item).toHaveProperty('descendants')
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('score')
    expect(item).toHaveProperty('time')
    expect(item).toHaveProperty('title')

    expect(item).toHaveProperty('type')
    expect(item).toHaveProperty('url')
  })

  it('should handle not found item', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(null),
    } as any)
    const item = await getItem(-1)
    expect(item).toBeNull()
  })
})
