import { type IUpdateProduct } from '@/core/ports/driving/services/IUpdateProducts'
import {
  type IValidation,
  type IController,
  type IHTTPRequest,
  type IHTTPResponse
} from '@/core/ports/driving/presentation'
import { badRequest, noContent, serverError } from '@/application/presentation/helpers'

export class UpdateProductController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly updateProduct: IUpdateProduct
  ) { }

  async handle (request: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { body } = request
      const { id } = request.params
      await this.updateProduct.update({ id, body })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
