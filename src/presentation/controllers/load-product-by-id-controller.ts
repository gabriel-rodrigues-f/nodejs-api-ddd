import { type LoadProductById } from '@/domain/ports'
import {
  ok,
  noContent,
  serverError
} from '@/presentation/helpers'
import {
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'

export class LoadProductByidController implements Controller {
  constructor (private readonly loadProductById: LoadProductById) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { id } = request.params
      const product = await this.loadProductById.loadById(id)
      return product ? ok(product) : noContent()
    } catch (error) { return serverError(error) }
  }
}
