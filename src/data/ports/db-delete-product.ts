import { type DeleteProduct } from '@/domain/ports'
import { type IDeleteProductRepository } from '@/data/adapters/db'

export class DbDeleteProduct implements DeleteProduct {
  constructor (private readonly repository: IDeleteProductRepository) { }
  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
