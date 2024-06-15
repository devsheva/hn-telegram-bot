import { getTopStories } from '@/api'

describe('getTopStories', () => {
  it('should return an array of top stories', async () => {
    // Test implementation goes here
    const topStories = await getTopStories()
    expect(topStories).toBeInstanceOf(Array)
    expect(topStories).toHaveLength(500)
  })

  it('should handle errors gracefully', () => {
    // Test implementation goes here
  })
})
