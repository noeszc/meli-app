// @ts-nocheck
import {createServer, RequestListener} from 'http'
import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import {apiResolver} from 'next/dist/server/api-utils'
import request from 'supertest'
import qs from 'qs'
import url from 'url'

export const initMiddleware =
  (middleware) => (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })

export const validateMiddleware =
  (validations, result) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))
    const errors = result(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(422).json({errors: errors.array()})
  }

export const testingServer = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) =>
    apiResolver(
      req,
      res,
      qs.parse(url.parse(req.url).search, {ignoreQueryPrefix: true}),

      handler,
      {
        previewModeEncryptionKey: '',
        previewModeId: '',
        previewModeSigningKey: '',
      },
      false,
    )

  return request(createServer(listener))
}
