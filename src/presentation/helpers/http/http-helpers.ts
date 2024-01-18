import { NotFoundError } from '@/presentation/errors/not-found-error'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { type HttpResponse } from '@/presentation/protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
