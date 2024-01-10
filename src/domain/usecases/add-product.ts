import { ProductModel } from '../models/product'

export type AddProductModel = Omit<ProductModel, 'id'>

export interface AddProduct {
  add (account: AddProductModel): Promise<void>
}
