import { type DeleteProduct } from '@/domain/ports'
import { type DeleteProductRepository } from '@/data/adapters/db'

export class DbDeleteProduct implements DeleteProduct {
  constructor (private readonly deleteProductRepository: DeleteProductRepository) { }
  async delete (id: string): Promise<void> {
    await this.deleteProductRepository.delete(id)
  }
}
