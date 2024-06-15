import { getTopStories } from './api'
import * as R from 'ramda'

const main = async () => {
  const topStoriesIds = await getTopStories()
  console.log('topStoriesIds', topStoriesIds)
}

main()
