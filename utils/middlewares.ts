// @ts-nocheck
export const initMiddleware = (middleware) => (req, res) =>
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
