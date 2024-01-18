import { type AddProductParams } from '@/domain/usecases/add-product'

export interface AddProductRepository {
  add: (productData: AddProductParams) => Promise<void>
}
