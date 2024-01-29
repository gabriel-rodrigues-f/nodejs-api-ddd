import { type Product } from '@/domain/models'

export interface ILoadProductByIdRepository {
  loadById: (id: string) => Promise<Product>
}
