import { type AddProductParams } from '@/domain/ports/IAddProduc'

export interface IAddProductRepository {
  add: (params: AddProductParams) => Promise<void>
}
