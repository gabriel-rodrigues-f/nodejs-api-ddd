import { ObjectId } from 'mongodb'
import { MongoHelper } from '.'
import { type Product } from '@/domain/models'
import { type AddProductParams } from '@/domain/ports'
import {
  type IAddProductRepository,
  type ILoadProductByIdRepository,
  type ILoadProductsRepository,
  type IDeleteProductRepository,
  type IUpdateProductRepository,
  type UpdateProductParams
} from '@/data/adapters'

export class ProductMongoRepository implements
  IAddProductRepository,
  ILoadProductsRepository,
  ILoadProductByIdRepository,
  IDeleteProductRepository,
  IUpdateProductRepository {
  async add (params: AddProductParams): Promise<void> {
    const collection = MongoHelper.getCollection('products')
    await collection.insertOne(params)
  }

  async loadAll (filter: any): Promise<Product[]> {
    const collection = MongoHelper.getCollection('products')
    const products = await collection.find<Product>(filter).toArray()
    return products.map(product => MongoHelper.map(product))
  }

  async loadById (id: string): Promise<Product> {
    const collection = MongoHelper.getCollection('products')
    const product = collection.findOne<Product>({ _id: { $eq: new ObjectId(id) } })
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
