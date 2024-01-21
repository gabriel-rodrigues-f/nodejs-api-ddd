import { type UpdateProduct } from '@/domain/usecases/update-product'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'

export class UpdateProductController implements Controller {
  constructor (private readonly updateProduct: UpdateProduct) { }
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params
    const { body } = request
    await this.updateProduct.update({ id, body })
    return await Promise.resolve(null)
  }
}
