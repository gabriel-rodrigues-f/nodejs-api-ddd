import { type IHTTPResponse } from '.'

export interface IMiddleware<T = any> {
  handle: (request: T) => Promise<IHTTPResponse>
}
