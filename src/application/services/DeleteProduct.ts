import { type IDeleteProduct } from '@/core/ports/driving/services'
import { type IDeleteProductRepository } from '@/core/ports/driven/repositories'

export class DeleteProduct implements IDeleteProduct {
  constructor (private readonly repository: IDeleteProductRepository) { }
  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
