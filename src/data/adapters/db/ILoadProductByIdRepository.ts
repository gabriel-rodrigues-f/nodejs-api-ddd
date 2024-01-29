import { type Product } from '@/domain/entities'

export interface ILoadProductByIdRepository {
  loadById: (id: string) => Promise<Product>
}
