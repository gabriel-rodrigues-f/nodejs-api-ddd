import { type ILoadProductById } from '@/core/ports/driving/services'
import {
  ok,
  noContent,
  serverError
} from '@/application/presentation/helpers'
import {
  type IController,
  type IHTTPResponse
} from '@/core/ports/driving/presentation'

export class LoadProductByIdController implements IController {
  constructor (private readonly loadProductById: ILoadProductById) { }
  async handle (request: any): Promise<IHTTPResponse> {
    try {
      const { id } = request.params
      const product = await this.loadProductById.loadById(id)
      return product ? ok(product) : noContent()
    } catch (error) { return serverError(error) }
  }
}
