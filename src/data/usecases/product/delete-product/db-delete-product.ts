import {
  type DeleteProductRepository,
  type DeleteProduct
} from './'

export class DbDeleteProduct implements DeleteProduct {
  constructor (private readonly deleteProductRepository: DeleteProductRepository) { }
  async delete (id: string): Promise<void> {
    await this.deleteProductRepository.delete(id)
  }
}
