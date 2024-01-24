import { type LoadOrders } from '@/domain/usecases'
import {
  type HttpResponse,
  type Controller
} from '@/presentation/protocols'

export class LoadOrdersController implements Controller {
  constructor (private readonly repository: LoadOrders) { }
  async handle (request: any): Promise<HttpResponse> {
    await this.repository.load({})
    return await Promise.resolve(null)
  }
}
