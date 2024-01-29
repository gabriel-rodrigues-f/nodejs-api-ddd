import {
  type UpdateProductParams,
  type IUpdateProduct
} from '@/domain/ports'
import { type IUpdateProductRepository } from '@/data/adapters'

export class DbUpdateProduct implements IUpdateProduct {
  constructor (private readonly repository: IUpdateProductRepository) { }
  async update (params: UpdateProductParams): Promise<void> {
    await this.repository.update(params)
  }
}
