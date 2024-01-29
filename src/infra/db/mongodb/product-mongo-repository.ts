import { ObjectId } from 'mongodb'
import { MongoHelper } from '.'
import { type ProductModel } from '@/domain/models'
import { type AddProductParams } from '@/domain/ports'
import {
  type IAddProductRepository,
  type LoadProductByIdRepository,
  type LoadProductsRepository,
  type DeleteProductRepository,
  type UpdateProductRepository,
  type UpdateProductParams
} from '@/data/adapters'

export class ProductMongoRepository implements
  IAddProductRepository,
  LoadProductsRepository,
  LoadProductByIdRepository,
  DeleteProductRepository,
  UpdateProductRepository {
  async add (params: AddProductParams): Promise<void> {
    const collection = MongoHelper.getCollection('products')
    await collection.insertOne(params)
  }

  async loadAll (filter: any): Promise<ProductModel[]> {
    const collection = MongoHelper.getCollection('products')
    const products = await collection.find<ProductModel>(filter).toArray()
    return products.map(product => MongoHelper.map(product))
  }

  async loadById (id: string): Promise<ProductModel> {
    const collection = MongoHelper.getCollection('products')
    const product = collection.findOne<ProductModel>({ _id: { $eq: new ObjectId(id) } })
    return product && MongoHelper.map(product)
  }

  async delete (id: string): Promise<void> {
    const collection = MongoHelper.getCollection('products')
    await collection.deleteOne({ _id: new ObjectId(id) })
  }

  async update (params: UpdateProductParams): Promise<void> {
    const collection = MongoHelper.getCollection('products')
    const { id, body } = params
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...body } })
  }
}
