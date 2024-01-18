import { type DeleteProduct } from '@/domain/usecases'
import {
  noContent,
  serverError
} from '@/presentation/helpers'
import {
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'

export class DeleteProductController implements Controller {
  constructor (private readonly deleteProduct: DeleteProduct) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { id } = request.params
      await this.deleteProduct.delete(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
