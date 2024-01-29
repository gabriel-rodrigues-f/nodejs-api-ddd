import { type Product } from '@/domain/models'

export type UpdateProductParams = {
  id: string
  body: Partial<Product>
}

export interface IUpdateProductRepository {
  update: (params: UpdateProductParams) => Promise<void>
}
