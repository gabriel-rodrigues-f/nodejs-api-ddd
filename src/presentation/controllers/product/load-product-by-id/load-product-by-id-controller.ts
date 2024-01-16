import { type LoadProductById } from '@/domain/usecases/load-product-by-id'
import { type HttpResponse, type Controller } from './load-product-by-id-controller-protocols'

export class LoadProductByidController implements Controller {
  constructor (private readonly loadProductById: LoadProductById) { }
  async handle (request: any): Promise<HttpResponse> {
    const { productId } = request.params
    await this.loadProductById.loadById(productId)
    return await Promise.resolve(null)
  }
}
