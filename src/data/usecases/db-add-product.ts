import { type AddProduct, type AddProductParams } from '@/domain/usecases'
import { type AddProductRepository } from '@/data/protocols'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) { }
  async add (data: AddProductParams): Promise<void> {
    await this.addProductRepository.add(data)
  }
}
