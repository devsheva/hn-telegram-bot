import { describe, it } from '@/dev_deps.ts'

describe('filterStories', () => {
  it('filters stories by preferences', () => {
    const preferences = ['TypeScript', 'AWS', 'Deno']

    filterStories(preferences)
  })
})
