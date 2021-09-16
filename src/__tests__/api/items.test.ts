import searchHandler from 'pages/api/items'
import itemHandler from 'pages/api/items/[id]'
import {testingServer} from 'lib/express.helpers'

describe('/api/items', () => {
  const request = testingServer(searchHandler)

  test('should return 422 if the query parameter is not valid', async () => {
    const response = await request.get('/items')
    expect(response.status).toBe(422)
  })

  test('should return a collection of items', async () => {
    const response = await request.get('/items').query({q: 'xbox'})
    expect(response.status).toBe(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        categories: expect.any(Array),
        items: expect.any(Array),
      }),
    )
  })
})

describe('/api/items/:id', () => {
  const request = testingServer(itemHandler)

  test('should return 422 if the id is not valid', async () => {
    const response = await request.get('/items/')
    expect(response.status).toBe(422)
  })

  test('should return a item', async () => {
    const mockResponse = {
      author: {name: '', lastname: ''},
      condition: '',
      description: {},
      price: {
        currency: '',
        amount: '',
        decimals: '',
      },
      picture: '',
      free_shipping: false,
    }

    const response = await request.get('/items/').query({id: 'MLA921509653'})

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        author: expect.any(Object),
        item: expect.any(Object),
      }),
    )
  })
})
