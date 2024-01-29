import {
  type UpdateProductParams,
  type UpdateProduct
} from '@/domain/ports'
import { type IUpdateProductRepository } from '@/data/adapters'

export class DbUpdateProduct implements UpdateProduct {
  constructor (private readonly repository: IUpdateProductRepository) { }
  async update (params: UpdateProductParams): Promise<void> {
    await this.repository.update(params)
  }
}
