import { type ILoadOrders } from '@/core/ports/driving/services'
import {
  type IHTTPResponse,
  type IController
} from '@/core/ports/driving/presentation'
import { noContent, ok, serverError } from '@/application/presentation/helpers'

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
