import { type ProductModel } from '@/domain/models'

export type UpdateProductParams = {
  id: string
  body: Partial<ProductModel>
}

export interface IUpdateProductRepository {
  update: (params: UpdateProductParams) => Promise<void>
}
