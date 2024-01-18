import { type Controller, type HttpRequest } from '@/presentation/protocols'
import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params
    }
    const response = await controller.handle(request)
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      res.status(response.statusCode).json(response.body)
    } else {
      res.status(response.statusCode).json({
        error: response.body.message
      })
    }
  }
}
