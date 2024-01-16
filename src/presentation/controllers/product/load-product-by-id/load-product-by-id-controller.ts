import { InvalidParamError, type LoadProductById, type HttpResponse, type Controller, forbidden } from './load-product-by-id-controller-protocols'

export class LoadProductByidController implements Controller {
  constructor (private readonly loadProductById: LoadProductById) { }
  async handle (request: any): Promise<HttpResponse> {
    const { productId } = request.params
    const product = await this.loadProductById.loadById(productId)
    if (!product) {
      return forbidden(new InvalidParamError('productId'))
    }
    return null
  }
}
