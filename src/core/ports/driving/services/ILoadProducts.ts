import { type Product } from '@/core/entities'

export interface ILoadProducts {
  load: (filter: any) => Promise<Product[]>
}
