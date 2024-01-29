import { type ProductModel } from '@/domain/models/product'

export interface ILoadProductsRepository {
  loadAll: (filter: any) => Promise<ProductModel[]>
}
