import { type Product } from '@/domain/models'

export interface ILoadProducts {
  load: (filter: any) => Promise<Product[]>
}
