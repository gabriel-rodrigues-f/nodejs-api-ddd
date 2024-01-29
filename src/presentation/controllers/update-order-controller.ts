import {
  type HttpResponse,
  type Controller,
  type Validation,
  type HttpRequest
} from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '../helpers'
import { type IUpdateOrder } from '@/domain/ports'

export class UpdateOrderController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateOrder: IUpdateOrder
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { id } = request.params
      const { status } = request.body
      await this.updateOrder.update({ id, status })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
