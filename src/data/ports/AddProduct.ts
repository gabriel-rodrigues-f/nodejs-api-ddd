import { type IAddProduct, type AddProductParams } from '@/domain/ports'
import { type IAddProductRepository } from '@/data/adapters'

export class AddProduct implements IAddProduct {
  constructor (private readonly repository: IAddProductRepository) { }
  async add (params: AddProductParams): Promise<void> {
    await this.repository.add(params)
  }
}
