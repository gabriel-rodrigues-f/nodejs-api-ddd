import { ProductModel } from '@/domain/models/product'

export interface LoadProductsRepository {
  loadAll: () => Promise<ProductModel[]>
}
