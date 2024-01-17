import {
  type DeleteProduct,
  type Controller,
  type HttpResponse,
  serverError,
  noContent
} from '.'

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
