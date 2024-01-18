import { type ProductModel } from '@/domain/models'
import { type LoadProductById } from '@/domain/usecases'
import { type LoadProductByIdRepository } from '@/data/protocols'

export class DbLoadProductById implements LoadProductById {
  constructor (private readonly loadProductByIdRepository: LoadProductByIdRepository) { }
  async loadById (id: string): Promise<ProductModel> {
    return await this.loadProductByIdRepository.loadById(id)
  }
}
