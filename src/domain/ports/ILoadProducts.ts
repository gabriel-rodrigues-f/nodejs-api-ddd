import { type Product } from '@/domain/entities'

export interface ILoadProducts {
  load: (filter: any) => Promise<Product[]>
}
