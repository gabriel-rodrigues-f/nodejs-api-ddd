import {
  type DeleteProduct,
  type Controller,
  type HttpResponse
} from '.'

export class DeleteProductController implements Controller {
  constructor (private readonly deleteProduct: DeleteProduct) { }
  async handle (request: any): Promise<HttpResponse> {
    const { id } = request.params
    await this.deleteProduct.delete(id)
    return await Promise.resolve(null)
  }
}
