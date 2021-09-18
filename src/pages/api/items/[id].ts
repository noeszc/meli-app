import {validationResult} from 'express-validator'
import {NextApiRequest, NextApiResponse} from 'next'

import {
  fetchDescription,
  fetchItem,
  normItem,
  validateItemBody,
} from 'lib/items.helpers'
import {assoc} from 'lodash/fp'

/////////////////////////////////////////////////////////////

const handleGetItem = async (req: NextApiRequest, res: NextApiResponse) => {
  await validateItemBody(req, res)
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

  try {
    const {id} = req.query as any
    const item = await fetchItem(id).then(normItem)
    const description = await fetchDescription(id)
    const body = assoc('item.description', description, item)

    return res.status(200).json(body)
  } catch (err: any) {
    return res.status(500).json({error: err?.message})
  }
}

/////////////////////////////////////////////////////////////

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {method} = req

  switch (method) {
    case 'GET':
      await handleGetItem(req, res)
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
