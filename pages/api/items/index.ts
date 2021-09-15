// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {
  always,
  compose,
  isNil,
  juxt,
  map,
  mergeAll,
  path,
  pick,
  prop,
  reject,
  zipObj,
} from 'lodash/fp'
import {check, validationResult} from 'express-validator'

import request from 'utils/request'
import {validateMiddleware, initMiddleware} from 'utils/middlewares'

type Dict<T = any> = Record<string, T>

const API_URL = process.env.NEXT_MELI_API_PROXY_URL

// prettier-ignore
// searchItems :: String -> Promise
const searchItems = (q = '') =>
  request(API_URL + `/sites/MLA/search?q=${q}`)

// isValidId :: String -> Boolean
const isValidId = (xs = '') => xs.match(/[A-Z]{3}\D+/)

// takeItemProps :: Object -> Object
const takeItemProps = pick(['id', 'title', 'condition', 'sold_quantity'])

// takeItemPic :: Object -> Object
const takeItemPic = compose(
  zipObj(['picture']),
  reject(isNil),
  juxt([path(['pictures', '0', 'secure_url']), prop('thumbnail')]),
)

// takeItemFreeShip :: Object -> Object
const takeItemFreeShip = compose(
  zipObj(['free_shipping ']),
  (x) => [x],
  path(['shipping', 'free_shipping']),
)

// takeItemPrice :: Object -> Object
const takeItemPrice = compose(
  (xs) => ({price: xs}),
  zipObj(['amount', 'currency']),
  juxt([prop('price'), prop('currency_id')]),
)

// TODO
// addAuthor ::
const addAuthor = compose(
  (author) => ({author}),
  zipObj(['name', 'lastname']),
  always(['', '']),
)

// normItem :: Object -> Object
const normItem = compose(
  mergeAll,
  juxt([
    addAuthor,
    takeItemProps,
    takeItemPic,
    takeItemPrice,
    takeItemFreeShip,
  ]),
)

// extractItems :: Object -> Object
const extractItems = compose(map(normItem), prop('results'))

// TODO
// extractCategories ::
const extractCategories = compose(always([]))

// normSearch :: Object -> Object
export const normSearch = compose(
  zipObj(['items', 'categories']),
  juxt([extractItems, extractCategories]),
)

const validateSearchQ = initMiddleware(
  validateMiddleware([check('q').isAlpha()], validationResult),
)

const handleGetItems = async (
  req: NextApiRequest,
  res: NextApiResponse<Dict>,
) => {
  await validateSearchQ(req, res)
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

  try {
    const {q} = req.query as any
    const body = await searchItems(q).then(normSearch)

    return res.status(200).json(body)
  } catch (err: any) {
    return res.status(500).json({error: err?.message})
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Dict>,
) {
  const {method} = req

  switch (method) {
    case 'GET':
      await handleGetItems(req, res)
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
