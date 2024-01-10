import { AddProduct } from '../../../../domain/usecases/add-product'
import { badRequest } from '../../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-product-controller-protocols'

export class AddProductController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { category, name, price, nutritionalInformation } = httpRequest.body
    await this.addProduct.add({ category, name, price, nutritionalInformation })
    return new Promise(resolve => resolve(null))
  }
}
