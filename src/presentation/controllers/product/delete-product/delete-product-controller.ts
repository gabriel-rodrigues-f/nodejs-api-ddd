import {
  type DeleteProduct,
  type Controller,
  type HttpResponse,
  serverError
} from '.'

export class DeleteProductController implements Controller {
  constructor (private readonly deleteProduct: DeleteProduct) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { id } = request.params
      await this.deleteProduct.delete(id)
      return await Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
