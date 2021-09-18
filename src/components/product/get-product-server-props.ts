import {isEmpty} from 'lodash/fp'
import request from 'utils/request'
import {Dict} from 'utils/types'

export const fetchQueryProduct = async (id?: string) => {
  const response = {error: false, errorMessage: '', data: null}

  if (!id) return {error: true, errorMessage: 'Empty search is not supported'}

  response.data = await request('http://localhost:3000/api/items/' + `${id}`)
    .then(
      (res) =>
        res ?? {
          error: true,
          errorMessage: `An error occurred while trying to retrieve data for ${id} search.`,
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

export const getProductServerProps = async ({id}: Dict): Promise<any> => {
  if (isEmpty(id)) return {notFound: true}

  const {error, ...results} = await fetchQueryProduct(id!)

  const props = {error, ...results}
  if (props.error) return {notFound: true}

  return {
    props,
  }
}
