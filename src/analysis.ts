import { R } from '@/deps.ts'
import { getItem, getTopStories } from '@/api.ts'
import { Item } from '@/types.ts'
import { GeminiAdapter } from '@/ai_adapters/mod.ts'

const baseInput: string = `
  Filter the following HackerNews stories by the provided preferences and return only the list of corresponding ids in an array format:
`
function generateInput(preferences: string[], titles: string[]): string {
  return `
  ${baseInput}
  Preferences: ${preferences.join(', ')}
  Titles: ${titles.join(', ')}
  `
}

export async function filterStories(preferences: string[]): Promise<string[]> {
  if (R.isEmpty(preferences)) {
    console.warn('No preferences provided')
    return []
  }

  const topStories = await getTopStories()
  const items = await bulkRetrieveItems(topStories)

  const adapter = new GeminiAdapter()
  const idTitlePairs = R.map(
    (item: Item) => R.pair(item!.id, item!.title),
  )(items)
  const input = generateInput(
    preferences,
    idTitlePairs,
  )

  const { text } = await adapter.generateContent(input)

  const filteredIds = R.pipe(
    (text: string) => JSON.parse(text),
    R.prop('storyIds'),
    R.map(Number),
  )(text)

  const filteredTitles = R.pluck('title')(R.innerJoin(
    (item: NonNullable<Item>, id: number) => item.id === id,
    items,
    filteredIds,
  ))

  return filteredTitles
}

export async function bulkRetrieveItems(ids: number[]): Promise<Item[]> {
  if (R.isEmpty(ids)) {
    console.warn('No ids provided')
    return []
  }

  const promises = R.map(getItem, ids)
  const items = R.flatten(await Promise.all(promises))

  return R.flatten(items)
}
