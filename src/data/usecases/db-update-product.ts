import {
  type UpdateProductParams,
  type UpdateProduct
} from '@/domain/usecases'
import { type UpdateProductRepository } from '@/data/protocols'

export class DbUpdateProduct implements UpdateProduct {
  constructor (private readonly updateProductRepository: UpdateProductRepository) { }
  async update (params: UpdateProductParams): Promise<void> {
    await this.updateProductRepository.update(params)
  }
}
