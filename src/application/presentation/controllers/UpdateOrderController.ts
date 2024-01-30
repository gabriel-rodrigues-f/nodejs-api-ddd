import {
  type IHTTPResponse,
  type IController,
  type IValidation,
  type IHTTPRequest
} from '@/core/ports/driving/presentation'
import { badRequest, noContent, serverError } from '../helpers'
import { type IUpdateOrder } from '@/core/ports/driving/services'

export class UpdateOrderController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly updateOrder: IUpdateOrder
  ) { }

  async handle (request: IHTTPRequest): Promise<IHTTPResponse> {
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
