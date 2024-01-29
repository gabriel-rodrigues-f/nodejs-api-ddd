import { type Product } from '@/domain/entities'

export interface ILoadProductById {
  loadById: (id: string) => Promise<Product>
}
