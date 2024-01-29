import { type ProductModel } from '@/domain/models'

export type UpdateProductParams = {
  id: string
  body: Partial<ProductModel>
}

export interface UpdateProductRepository {
  update: (params: UpdateProductParams) => Promise<void>
}
