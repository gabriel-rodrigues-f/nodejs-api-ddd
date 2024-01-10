import { AddProductModel, AddProductRepository } from '../../../../data/usecases/add-product/db-add-product-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class ProductMongoRepository implements AddProductRepository {
  async add (productData: AddProductModel): Promise<void> {
    const productCollection = MongoHelper.getCollection('product')
    await productCollection.insertOne(productData)
  }
}
