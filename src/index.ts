import * as R from 'ramda'
import { getItem, getTopStories } from '@/api'

const main = async () => {
  const topStoriesIds = await getTopStories()

  const topItem = await getItem(R.head(topStoriesIds))
  console.log(topItem)
}

main()
