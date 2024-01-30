import { type Product } from '@/core/entities'

export interface ILoadProductsRepository {
  loadAll: (filter: any) => Promise<Product[]>
}
