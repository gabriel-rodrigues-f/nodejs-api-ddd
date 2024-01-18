import { type ProductModel } from '@/domain/models/product'

export interface LoadProducts {
  load: () => Promise<ProductModel[]>
}
