import { Item, itemSchema, storiesSchema, TopStories } from '@/types.ts'
import { config } from '@/config.ts'

export const getTopStories = async (): Promise<TopStories> => {
  const data: TopStories = await fetch(`${config.HN_API}/topstories.json`).then(
    (
      res,
    ) => res.json()
  )

  storiesSchema.parse(data)

  return data
}

export const getItem = async (id: number): Promise<Item | null> => {
  const data: Item | null = await fetch(`${config.HN_API}/item/${id}.json`)
    .then(
      (res) => res.json(),
    )

  itemSchema.parse(data)

  return data
}
