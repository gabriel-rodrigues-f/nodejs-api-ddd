import { type ProductModel } from '@/domain/models'

export interface LoadProductByCategory {
  loadByCategory: (category: string) => Promise<ProductModel[]>
}
