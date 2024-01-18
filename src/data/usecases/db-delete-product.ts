import { type DeleteProduct } from '@/domain/usecases'
import { type DeleteProductRepository } from '@/data/protocols/db'

export class DbDeleteProduct implements DeleteProduct {
  constructor (private readonly deleteProductRepository: DeleteProductRepository) { }
  async delete (id: string): Promise<void> {
    await this.deleteProductRepository.delete(id)
  }
}
