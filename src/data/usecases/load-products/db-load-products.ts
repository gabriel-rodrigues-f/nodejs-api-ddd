import { LoadProducts } from '../../../domain/usecases/load-products'
import { LoadProductsRepository } from '../../protocols/db/product/load-products-repository'
import { ProductModel } from '../add-product/db-add-product-protocols'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) { }
  async load (): Promise<ProductModel[]> {
    return await this.loadProductsRepository.loadAll()
  }
}
