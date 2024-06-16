import { getTopStories } from '@/api'
import axios from 'axios'
import { faker } from '@faker-js/faker'

jest.mock('axios')

const mockedAxios = axios as jest.MockedFunction<typeof axios>

describe('getTopStories', () => {
  it('should return an array of top stories', async () => {
    mockedAxios.mockResolvedValueOnce({
      data: faker.helpers.multiple<Number>(faker.number.int, { count: 500 }),
    })
    const result = await getTopStories()
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(500)
  })
})
