import { type Product } from '@/core/entities'

export interface ILoadProductById {
  loadById: (id: string) => Promise<Product>
}
