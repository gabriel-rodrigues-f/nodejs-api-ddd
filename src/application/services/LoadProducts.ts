import { type ILoadProducts } from '@/core/ports/driving/services'
import { type Product } from '@/core/entities'
import { type ILoadProductsRepository } from '@/core/ports/driven/repositories'

export class LoadProducts implements ILoadProducts {
  constructor (private readonly repository: ILoadProductsRepository) { }
  async load (filter: any): Promise<Product[]> {
    return await this.repository.loadAll(filter)
  }
}
