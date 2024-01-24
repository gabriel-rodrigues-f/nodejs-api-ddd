import {
  type HttpResponse,
  type Controller,
  type Validation,
  type HttpRequest
} from '@/presentation/protocols'
import { badRequest } from '../helpers'
import { type UpdateOrder } from '@/domain/usecases'

export class UpdateOrderController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateOrder: UpdateOrder
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request.body)
    if (error) return badRequest(error)
    const { id } = request.params
    const { status } = request.body
    await this.updateOrder.update({ id, status })
    return await Promise.resolve(null)
  }
}
