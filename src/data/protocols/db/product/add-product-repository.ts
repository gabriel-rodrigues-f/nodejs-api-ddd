import { type AddProductParams } from '@/domain/usecases/product/add-product'

export interface AddProductRepository {
  add: (productData: AddProductParams) => Promise<void>
}
