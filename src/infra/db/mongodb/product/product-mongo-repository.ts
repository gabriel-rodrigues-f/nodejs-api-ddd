import { type LoadProductsRepository } from '@/data/protocols/db/product/load-products-repository'
import { type AddProductModel, type AddProductRepository, type ProductModel } from '@/data/usecases/add-product/db-add-product-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class ProductMongoRepository implements AddProductRepository, LoadProductsRepository {
  async add (productData: AddProductModel): Promise<void> {
    const productCollection = MongoHelper.getCollection('products')
    await productCollection.insertOne(productData)
  }

  async loadAll (): Promise<ProductModel[]> {
    const productsCollection = MongoHelper.getCollection('products')
    const products = await productsCollection.find<ProductModel>({}).toArray()
    return products
  }
}
