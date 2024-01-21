import { type ProductModel } from '@/domain/models'

export interface LoadProducts {
  load: (filter: any) => Promise<ProductModel[]>
}
