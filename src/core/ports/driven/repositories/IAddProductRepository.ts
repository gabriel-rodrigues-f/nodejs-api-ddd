import { type AddProductParams } from '@/core/ports/driving/services/IAddProduc'

export interface IAddProductRepository {
  add: (params: AddProductParams) => Promise<void>
}
