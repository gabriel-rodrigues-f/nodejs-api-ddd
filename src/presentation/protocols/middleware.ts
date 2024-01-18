import { type HttpResponse } from '.'

export interface Middleware<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
