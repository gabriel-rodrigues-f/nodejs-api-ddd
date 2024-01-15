import { ProductModel } from '../models/product'

export type LoadProducts = {
  load (): Promise<ProductModel[]>
}
