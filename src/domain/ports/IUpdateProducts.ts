import { type Product } from '@/domain/entities'

export type UpdateProductParams = {
  id: string
  body: Partial<Product>
}

export interface IUpdateProduct {
  update: (params: UpdateProductParams) => Promise<void>
}
