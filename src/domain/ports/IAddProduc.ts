import { type ProductModel } from '@/domain/models'

export type AddProductParams = Omit<ProductModel, 'id'>

export interface IAddProduct {
  add: (params: AddProductParams) => Promise<void>
}
