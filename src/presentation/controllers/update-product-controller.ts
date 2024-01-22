import { type UpdateProduct } from '@/domain/usecases/update-product'
import {
  type Validation,
  type Controller,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'
import { badRequest, serverError } from '../helpers'

export class UpdateProductController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateProduct: UpdateProduct
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const { body } = request
      const { id } = request.params
      await this.updateProduct.update({ id, body })
      return await Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
