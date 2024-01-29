import { type ProductModel } from '@/domain/models/product'

export interface ILoadProductByIdRepository {
  loadById: (id: string) => Promise<ProductModel>
}
