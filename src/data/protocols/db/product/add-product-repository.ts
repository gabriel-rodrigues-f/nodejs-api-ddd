import { type AddProductModel } from '@/domain/usecases/product/add-product'

export interface AddProductRepository {
  add: (productData: AddProductModel) => Promise<void>
}
