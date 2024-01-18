import { type AddProduct, type AddProductParams } from '@/domain/usecases/product/add-product'
import { type AddProductRepository } from '.'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) { }
  async add (data: AddProductParams): Promise<void> {
    await this.addProductRepository.add(data)
  }
}
