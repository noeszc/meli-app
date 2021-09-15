import 'isomorphic-fetch'
const apiRoot = 'http://localhost:3000/api'

// searchItems ::
const searchItems = (q = ' ') => fetch(apiRoot + `/items?q=${q}`)

describe('/api/items', () => {
  test('GET /api/items', async () => {
    const response = await searchItems()

    expect(response.status).toBe(422)

    const search = await searchItems('xbox')
    expect(await search.json()).toHaveProperty('items')
  })
})
