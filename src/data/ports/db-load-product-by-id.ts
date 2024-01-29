import { type ProductModel } from '@/domain/models'
import { type LoadProductById } from '@/domain/ports'
import { type LoadProductByIdRepository } from '@/data/adapters'

export class DbLoadProductById implements LoadProductById {
  constructor (private readonly loadProductByIdRepository: LoadProductByIdRepository) { }
  async loadById (id: string): Promise<ProductModel> {
    return await this.loadProductByIdRepository.loadById(id)
  }
}
