export async function bulkRetrieveItems(ids: number[]): Promise<Item[]> {
  if (R.isEmpty(ids)) {
    console.warn('No ids provided')
    return []
  }

  const urlJoiner = R.join('/')
  const fetchItem = async (id: number) => {
    const response = await fetch(
      urlJoiner([config.HN_API, 'item', `${id}.json`]),
    )

    const data = await response.json()
    return data
  }

  const promises = R.map(fetchItem, ids)
  const items = R.flatten(await Promise.all(promises))

  return R.flatten(items)
}
