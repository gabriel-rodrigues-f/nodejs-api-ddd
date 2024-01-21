import { type LoadProducts } from '@/domain/usecases'
import { type ProductModel } from '@/domain/models'
import { type LoadProductsRepository } from '@/data/protocols/db'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) { }
  async load (filter: any): Promise<ProductModel[]> {
    return await this.loadProductsRepository.loadAll(filter)
  }
}
