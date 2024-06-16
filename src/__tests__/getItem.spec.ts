import { getItem } from '@/api'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.MockedFunction<typeof axios>

describe('getItem', () => {
  it('should return an item', async () => {
    mockedAxios.mockResolvedValue({
      data: {
        by: 'dhouston',
        descendants: 71,
        id: 8863,
        score: 104,
        time: 1175714200,
        title: 'My YC app: Dropbox - Throw away your USB drive',
        type: 'story',
        url: 'http://www.getdropbox.com/u/2/screencast.html',
      },
    })

    const item = await getItem(8863)

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
    mockedAxios.mockResolvedValueOnce({
      data: null,
    })
    const item = await getItem(-1)
    expect(item).toBeNull()
  })
})
