import { AddProduct, AddProductModel } from '../../../domain/usecases/add-product'
import { AddProductRepository } from './db-add-product-protocols'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) { }
  async add (data: AddProductModel): Promise<void> {
    await this.addProductRepository.add(data)
  }
}
