import { type ProductModel } from '@/domain/models/product'

export interface LoadProductByCategory {
  loadByCategory: (category: string) => Promise<ProductModel>
}
