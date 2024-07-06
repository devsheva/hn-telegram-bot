import { HN_API } from '@/config.ts'
import { Item, itemSchema } from '@/types/item.ts'

export const getTopStories = async (): Promise<number[]> => {
  const data: number[] = await fetch(`${HN_API}/topstories.json`).then((res) =>
    res.json()
  )

  return data
}

export const getItem = async (id: number): Promise<Item | null> => {
  const data: Item | null = await fetch(`${HN_API}/item/${id}.json`).then(
    (res) => res.json(),
  )

  itemSchema.parse(data)

  return data
}
