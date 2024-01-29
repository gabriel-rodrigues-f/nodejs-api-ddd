import { type AddProductParams } from '@/domain/ports/add-product'

export interface IAddProductRepository {
  add: (params: AddProductParams) => Promise<void>
}
