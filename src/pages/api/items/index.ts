// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {validationResult} from 'express-validator'

import {normSearch, searchItems, validateSearchBody} from 'lib/items.helpers'

type Dict<T = any> = Record<string, T>

/////////////////////////////////////////////////////////////

const handleGetItems = async (
  req: NextApiRequest,
  res: NextApiResponse<Dict>,
) => {
  // validate body
  await validateSearchBody(req, res)
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

  try {
    const {q} = req.query as any
    const body = await searchItems(q).then(normSearch)

    return res.status(200).json(body)
  } catch (err: any) {
    console.log(err.message)
    return res.status(500).json({error: err?.message})
  }
}

/////////////////////////////////////////////////////////////

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
