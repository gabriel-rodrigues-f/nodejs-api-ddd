import { type Product } from '@/domain/entities'

export interface ILoadProductsRepository {
  loadAll: (filter: any) => Promise<Product[]>
}
