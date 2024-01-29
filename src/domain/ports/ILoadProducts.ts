import { type ProductModel } from '@/domain/models'

export interface ILoadProducts {
  load: (filter: any) => Promise<ProductModel[]>
}
