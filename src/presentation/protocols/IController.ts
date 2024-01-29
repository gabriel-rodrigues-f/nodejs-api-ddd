import { type HttpResponse } from '.'

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
