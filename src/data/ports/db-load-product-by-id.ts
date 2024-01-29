import { type ProductModel } from '@/domain/models'
import { type LoadProductById } from '@/domain/ports'
import { type ILoadProductByIdRepository } from '@/data/adapters'

export class DbLoadProductById implements LoadProductById {
  constructor (private readonly repository: ILoadProductByIdRepository) { }
  async loadById (id: string): Promise<ProductModel> {
    return await this.repository.loadById(id)
  }
}
