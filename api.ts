import axios from 'axios'
import { HN_API } from './config'

export const getTopStories = async (): Promise<number[]> => {
  const { data } = await axios({
    url: `${HN_API}/topstories.json`,
  })

  return data
}
