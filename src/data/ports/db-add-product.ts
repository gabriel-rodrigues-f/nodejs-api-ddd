import { type AddProduct, type AddProductParams } from '@/domain/ports'
import { type AddProductRepository } from '@/data/adapters'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) { }
  async add (data: AddProductParams): Promise<void> {
    await this.addProductRepository.add(data)
  }
}
