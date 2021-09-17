import {check, validationResult} from 'express-validator'
import {
  always,
  compose,
  find,
  flatMap,
  flatten,
  isNil,
  juxt,
  map,
  matchesProperty,
  mergeAll,
  path,
  pick,
  prop,
  reject,
  uniq,
  zipObj,
} from 'lodash/fp'
import {trace} from 'utils/function'

import request from 'utils/request'
import {initMiddleware, validateMiddleware} from './express.helpers'

const API_URL = process.env.NEXT_MELI_API_PROXY_URL

// prettier-ignore
// isValidId :: String -> Boolean
const isValidId = (xs: string) => 
  /[A-Z]{3}\d+/g.test(xs)

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

const addItem = compose(
  (item) => ({item}),
  mergeAll,
  juxt([takeItemProps, takeItemPic, takeItemPrice, takeItemFreeShip]),
)
// normItem :: Object -> Object
export const normItem = compose(mergeAll, juxt([addAuthor, addItem]))

// extractItems :: Object -> Object
const extractItems = compose(map(normItem), prop('results'))

const mapName = map(prop('name'))

const findCategory = find(matchesProperty('id', 'category'))

const propValues = prop('values')

const getFilters = compose(
  mapName,
  flatMap(prop('path_from_root')),
  propValues,
  // trace('1'),
  findCategory,
  prop('filters'),
)
const getAvailableFilters = compose(
  mapName,
  propValues,
  findCategory,
  prop('available_filters'),
)
// TODO
// extractCategories ::
const extractCategories = compose(
  uniq,
  flatten,
  juxt([getAvailableFilters, getFilters]),
)

// normSearch :: Object -> Object
export const normSearch = compose(
  zipObj(['items', 'categories']),
  juxt([extractItems, extractCategories]),
)

// searchItems :: String -> Promise
export const searchItems = (q = '') =>
  request(API_URL + `/sites/MLA/search?q=${q}`)

// prettier-ignore
// fetchItem :: String -> Promise
export const fetchItem = (id: string) =>
  request(API_URL + `/items/${id}`)

// fetchItem :: String -> Promise
export const fetchDescription = (id: string) =>
  request(API_URL + `/items/${id}/description`)

// prettier-ignore
// validateSearchBody ::
export const validateSearchBody = initMiddleware(
  validateMiddleware(
    [ check('q').not().isEmpty() ],
    validationResult
  ),
)

// prettier-ignore
// validateSearchBody ::
export const validateItemBody = initMiddleware(
  validateMiddleware(
    [check('id').custom((id) => {
        if (!isValidId(id)) throw new Error('Not match id')
        return true
      }) 
    ],
    validationResult
  ),
)
