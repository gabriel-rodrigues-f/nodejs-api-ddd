import { type LoadProductById, type HttpResponse, type Controller, noContent, serverError, ok } from './load-product-by-id-controller-protocols'

export class LoadProductByidController implements Controller {
  constructor (private readonly loadProductById: LoadProductById) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { productId } = request.params
      const product = await this.loadProductById.loadById(productId)
      if (!product) {
        return noContent()
      }
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
