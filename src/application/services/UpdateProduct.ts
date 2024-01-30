import {
  type UpdateProductParams,
  type IUpdateProduct
} from '@/core/ports/driving/services'
import { type IUpdateProductRepository } from '@/core/ports/driven'

export class UpdateProduct implements IUpdateProduct {
  constructor (private readonly repository: IUpdateProductRepository) { }
  async update (params: UpdateProductParams): Promise<void> {
    await this.repository.update(params)
  }
}
