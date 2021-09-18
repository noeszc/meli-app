type Dict<T = any> = Record<string, T>

export class ResponseError extends Error {
  public response: Response & Dict

  constructor(response: Response) {
    super(response.statusText)
    this.response = response
  }
}

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

async function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) return response
  const error = new ResponseError(response)
  error['response'] = response
  error['response']['data'] = await parseJSON(response)

  throw error
}

export default async function request(
  input: RequestInfo,
  options?: RequestInit,
): Promise<any> {
  return fetch(input, options).then(checkStatus).then(parseJSON)
}
