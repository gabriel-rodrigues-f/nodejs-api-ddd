import { type ILoadOrders } from '@/domain/ports'
import {
  type IHTTPResponse,
  type IController
} from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadOrdersController implements IController {
  constructor (private readonly repository: ILoadOrders) { }
  async handle (request: any): Promise<IHTTPResponse> {
    try {
      const { query } = request
      const filter = query ? { ...query } : {}
      const orders = await this.repository.loadAll(filter)
      return (orders.length > 0) ? ok(orders) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
