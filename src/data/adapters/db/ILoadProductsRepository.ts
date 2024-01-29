import { type Product } from '@/domain/models'

export interface ILoadProductsRepository {
  loadAll: (filter: any) => Promise<Product[]>
}
