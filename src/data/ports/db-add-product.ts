import { type AddProduct, type AddProductParams } from '@/domain/ports'
import { type IAddProductRepository } from '@/data/adapters'

export class DbAddProduct implements AddProduct {
  constructor (private readonly repository: IAddProductRepository) { }
  async add (params: AddProductParams): Promise<void> {
    await this.repository.add(params)
  }
}
