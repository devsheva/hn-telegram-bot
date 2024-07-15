export async function bulkRetrieveItems(ids: number[]): Promise<Item[]> {
  if (R.isEmpty(ids)) {
    console.warn('No ids provided')
    return []
  }

  const promises = R.map(getItem, ids)
  const items = R.flatten(await Promise.all(promises))

  return R.flatten(items)
}
