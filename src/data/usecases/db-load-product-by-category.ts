import { type LoadProductByCategory } from '@/domain/usecases'
import { type ProductModel } from '@/domain/models'
import { type LoadProductByCategoryRepository } from '@/data/protocols'

export class DbLoadProductByCategory implements LoadProductByCategory {
  constructor (private readonly loadProductByCategoryRepository: LoadProductByCategoryRepository) { }
  async loadByCategory (category: string): Promise<ProductModel> {
    return await this.loadProductByCategoryRepository.loadByCategory(category)
  }
}
