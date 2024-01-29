import { type AddProductParams } from '@/domain/ports/add-product'

export interface AddProductRepository {
  add: (productData: AddProductParams) => Promise<void>
}
