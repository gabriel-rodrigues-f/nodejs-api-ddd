import { ProductModel } from '../models/product'

export type AddProductModel = Omit<ProductModel, 'id'>

export type AddProduct = {
  add (account: AddProductModel): Promise<void>
}
