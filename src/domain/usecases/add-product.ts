import { type ProductModel } from '@/domain/models'

export type AddProductParams = Omit<ProductModel, 'id'>

export interface AddProduct {
  add: (account: AddProductParams) => Promise<void>
}
