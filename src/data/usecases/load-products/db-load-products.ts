import { LoadProductsRepository } from '../../protocols/db/product/load-products-repository'
import { ProductModel } from '../add-product/db-add-product-protocols'

export class DbLoadProducts implements LoadProductsRepository {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) { }
  async loadAll (): Promise<ProductModel[]> {
    return await this.loadProductsRepository.loadAll()
  }
}
