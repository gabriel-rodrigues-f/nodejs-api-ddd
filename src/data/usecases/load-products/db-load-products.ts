import { type LoadProducts } from '@/domain/usecases/load-products'
import { type ProductModel } from '../add-product/db-add-product-protocols'
import { type LoadProductsRepository } from '../../protocols/db/product/load-products-repository'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) { }
  async load (): Promise<ProductModel[]> {
    return await this.loadProductsRepository.loadAll()
  }
}
