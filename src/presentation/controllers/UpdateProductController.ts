import { type IUpdateProduct } from '@/domain/ports/IUpdateProducts'
import {
  type IValidation,
  type IController,
  type IHTTPRequest,
  type IHTTPResponse
} from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

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
