import { type ProductModel } from '@/domain/models'
import { type ILoadProductById } from '@/domain/ports'
import { type ILoadProductByIdRepository } from '@/data/adapters'

export class DbLoadProductById implements ILoadProductById {
  constructor (private readonly repository: ILoadProductByIdRepository) { }
  async loadById (id: string): Promise<ProductModel> {
    return await this.repository.loadById(id)
  }
}
