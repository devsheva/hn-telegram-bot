import * as R from 'ramda'
import { getItem, getTopStories } from '@/api'
import bot from './bot'

const main = async () => {
  const topStoriesIds = await getTopStories()

  const topItem = await getItem(R.head(topStoriesIds))
  console.log(bot)
  console.log(topItem)
}

main()
