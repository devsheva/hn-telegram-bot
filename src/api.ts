import axios from 'axios'
import { HN_API } from './config'
import { Item, ItemResponse, ItemsResponse } from './types/item'

export const getTopStories = async (): Promise<number[]> => {
  const { data } = await axios({
    url: `${HN_API}/topstories.json`,
  })

  return data
}

export const getItem = async (id: number): Promise<Item> => {
  const { data } = await axios<ItemResponse>({
    url: `${HN_API}/item/${id}.json`,
  })

  return data
}
