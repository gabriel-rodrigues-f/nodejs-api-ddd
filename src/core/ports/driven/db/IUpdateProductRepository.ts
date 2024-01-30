import { type Product } from '@/core/entities'

export type UpdateProductParams = {
  id: string
  body: Partial<Product>
}

export interface IUpdateProductRepository {
  update: (params: UpdateProductParams) => Promise<void>
}
