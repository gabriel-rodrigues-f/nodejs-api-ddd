import {
  type ProductModel,
  type LoadProductByCategory,
  type LoadProductByCategoryRepository
} from './index'

export class DbLoadProductByCategory implements LoadProductByCategory {
  constructor (private readonly loadProductByCategoryRepository: LoadProductByCategoryRepository) { }
  async loadByCategory (category: string): Promise<ProductModel> {
    await this.loadProductByCategoryRepository.loadByCategory(category)
    return await Promise.resolve(null)
  }
}
