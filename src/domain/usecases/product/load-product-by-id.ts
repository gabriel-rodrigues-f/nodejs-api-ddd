import { type ProductModel } from '@/domain/models/product'

export interface LoadProductById {
  loadById: (id: string) => Promise<ProductModel>
}
