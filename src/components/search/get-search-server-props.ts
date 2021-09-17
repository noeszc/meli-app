import {isEmpty} from 'lodash/fp'
import request from 'utils/request'
import {Dict} from 'utils/types'

export const fetchQuerySearch = async (query?: string) => {
  const response = {error: false, errorMessage: '', data: null}

  if (!query)
    return {error: true, errorMessage: 'Empty search is not supported'}

  response.data = await request(
    'http://localhost:3000/api/items/' + `?q=${query}`,
  )
    .then(
      (res) =>
        res ?? {
          error: true,
          errorMessage: `An error occurred while trying to retrieve data for ${query} search.`,
        },
    )
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message,
      }
    })

  return response
}

export const getSearchsServerProps = async ({
  search: q,
}: Dict): Promise<any> => {
  if (isEmpty(q)) return {notFound: true}

  const {error, ...results} = await fetchQuerySearch(q!)

  const props = {error, ...results}
  if (props.error) return {notFound: true}

  return {
    props,
  }
}
