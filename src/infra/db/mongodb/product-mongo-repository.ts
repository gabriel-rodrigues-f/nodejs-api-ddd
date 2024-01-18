import { ObjectId } from 'mongodb'
import { MongoHelper } from '.'
import { type ProductModel } from '@/domain/models'
import { type AddProductParams } from '@/domain/usecases'
import {
  type AddProductRepository,
  type DeleteProductRepository,
  type LoadProductByCategoryRepository,
  type LoadProductByIdRepository,
  type LoadProductsRepository
} from '@/data/protocols'

export class ProductMongoRepository implements
  AddProductRepository,
  LoadProductsRepository,
  DeleteProductRepository,
  LoadProductByIdRepository,
  LoadProductByCategoryRepository {
  async add (productData: AddProductParams): Promise<void> {
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

  async delete (id: string): Promise<void> {
    const productsCollection = MongoHelper.getCollection('products')
    await productsCollection.deleteOne({ _id: new ObjectId(id) })
  }
}
