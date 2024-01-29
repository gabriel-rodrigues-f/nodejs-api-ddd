import { type ProductModel } from '@/domain/models/product'

export interface LoadProductByIdRepository {
  loadById: (id: string) => Promise<ProductModel>
}
