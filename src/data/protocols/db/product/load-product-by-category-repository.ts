import { type ProductModel } from '@/domain/models/product'

export interface LoadProductByCategoryRepository {
  loadByCategory: (category: string) => Promise<ProductModel>
}
