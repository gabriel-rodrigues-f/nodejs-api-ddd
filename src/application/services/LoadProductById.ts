import { type Product } from '@/core/entities'
import { type ILoadProductById } from '@/core/ports/driving/services'
import { type ILoadProductByIdRepository } from '@/core/ports/driven'

export class LoadProductById implements ILoadProductById {
  constructor (private readonly repository: ILoadProductByIdRepository) { }
  async loadById (id: string): Promise<Product> {
    return await this.repository.loadById(id)
  }
}
