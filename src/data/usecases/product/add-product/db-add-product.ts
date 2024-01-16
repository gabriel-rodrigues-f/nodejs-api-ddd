import { type AddProduct, type AddProductModel } from '@/domain/usecases/product/add-product'
import { type AddProductRepository } from '.'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) { }
  async add (data: AddProductModel): Promise<void> {
    await this.addProductRepository.add(data)
  }
}
