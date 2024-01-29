import { type Product } from '@/domain/entities'

export type AddProductParams = Omit<Product, 'id'>

export interface IAddProduct {
  add: (params: AddProductParams) => Promise<void>
}
