import { type Product } from '@/core/entities'

export interface ILoadProductByIdRepository {
  loadById: (id: string) => Promise<Product>
}
