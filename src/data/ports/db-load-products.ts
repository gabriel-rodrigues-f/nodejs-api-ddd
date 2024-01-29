import { type LoadProducts } from '@/domain/ports'
import { type ProductModel } from '@/domain/models'
import { type LoadProductsRepository } from '@/data/adapters/db'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) { }
  async load (filter: any): Promise<ProductModel[]> {
    return await this.loadProductsRepository.loadAll(filter)
  }
}
