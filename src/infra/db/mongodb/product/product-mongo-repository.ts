import { ObjectId } from 'mongodb'
import {
  type ProductModel,
  type AddProductModel,
  type AddProductRepository,
  type LoadProductsRepository,
  type LoadProductByIdRepository,
  type LoadProductByCategoryRepository,
  MongoHelper
} from '.'

export class ProductMongoRepository implements
  AddProductRepository,
  LoadProductsRepository,
  LoadProductByIdRepository,
  LoadProductByCategoryRepository {
  async add (productData: AddProductModel): Promise<void> {
    const productCollection = MongoHelper.getCollection('products')
    await productCollection.insertOne(productData)
  }

  async loadAll (): Promise<ProductModel[]> {
    const productsCollection = MongoHelper.getCollection('products')
    const products = await productsCollection.find<ProductModel>({}).toArray()
    return products
  }

  async loadById (id: string): Promise<ProductModel> {
    const productsCollection = MongoHelper.getCollection('products')
    return await productsCollection.findOne<ProductModel>({ _id: { $eq: new ObjectId(id) } })
  }

  async loadByCategory (category: string): Promise<ProductModel> {
    const productsCollection = MongoHelper.getCollection('products')
    return await productsCollection.findOne<ProductModel>({ category })
  }
}
