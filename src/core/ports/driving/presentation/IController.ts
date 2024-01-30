import { type IHTTPResponse } from '.'

export interface IController<T = any> {
  handle: (request: T) => Promise<IHTTPResponse>
}
