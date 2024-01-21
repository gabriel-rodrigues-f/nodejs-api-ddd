import { type ProductModel } from '@/domain/models/product'

export interface LoadProductsRepository {
  loadAll: (filter: any) => Promise<ProductModel[]>
}
