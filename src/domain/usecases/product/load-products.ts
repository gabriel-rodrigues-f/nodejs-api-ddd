import { type ProductModel } from '../../models/product'

export interface LoadProducts {
  load: () => Promise<ProductModel[]>
}
