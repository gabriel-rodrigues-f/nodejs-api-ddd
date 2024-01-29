import { type ProductModel } from '@/domain/models'

export interface ILoadProductById {
  loadById: (id: string) => Promise<ProductModel>
}
