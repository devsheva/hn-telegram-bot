import { HN_API } from './config'
import { Item } from './types/item'

export const getTopStories = async (): Promise<number[]> => {
  const data = await fetch(`${HN_API}/topstories.json`).then((res) =>
    res.json()
  )

  return data
}

export const getItem = async (id: number): Promise<Item | null> => {
  const data = await fetch(`${HN_API}/item/${id}.json`).then((res) =>
    res.json()
  )

  return data
}
