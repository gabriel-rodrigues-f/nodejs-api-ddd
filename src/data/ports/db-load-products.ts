import { type ILoadProducts } from '@/domain/ports'
import { type Product } from '@/domain/entities'
import { type ILoadProductsRepository } from '@/data/adapters/db'

export class DbLoadProducts implements ILoadProducts {
  constructor (private readonly repository: ILoadProductsRepository) { }
  async load (filter: any): Promise<Product[]> {
    return await this.repository.loadAll(filter)
  }
}
