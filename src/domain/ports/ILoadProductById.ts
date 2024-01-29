import { type Product } from '@/domain/models'

export interface ILoadProductById {
  loadById: (id: string) => Promise<Product>
}
