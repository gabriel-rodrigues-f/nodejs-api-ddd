import { type LoadProducts } from '@/domain/ports'
import { type ProductModel } from '@/domain/models'
import { type ILoadProductsRepository } from '@/data/adapters/db'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly repository: ILoadProductsRepository) { }
  async load (filter: any): Promise<ProductModel[]> {
    return await this.repository.loadAll(filter)
  }
}
