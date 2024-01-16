import { type ProductModel } from '../models/product'

export interface LoadProductById {
  loadById: (id: string) => Promise<ProductModel>
}
