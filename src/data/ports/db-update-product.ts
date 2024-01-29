import {
  type UpdateProductParams,
  type UpdateProduct
} from '@/domain/ports'
import { type UpdateProductRepository } from '@/data/adapters'

export class DbUpdateProduct implements UpdateProduct {
  constructor (private readonly updateProductRepository: UpdateProductRepository) { }
  async update (params: UpdateProductParams): Promise<void> {
    await this.updateProductRepository.update(params)
  }
}
