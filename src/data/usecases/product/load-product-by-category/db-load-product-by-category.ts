import {
  type ProductModel,
  type LoadProductByCategory,
  type LoadProductByCategoryRepository
} from './index'

export class DbLoadProductByCategory implements LoadProductByCategory {
  constructor (private readonly loadProductByCategoryRepository: LoadProductByCategoryRepository) { }
  async loadByCategory (category: string): Promise<ProductModel> {
    return await this.loadProductByCategoryRepository.loadByCategory(category)
  }
}
