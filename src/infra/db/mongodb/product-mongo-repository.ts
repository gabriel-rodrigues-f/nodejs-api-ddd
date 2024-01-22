import { ObjectId } from 'mongodb'
import { MongoHelper } from '.'
import { type ProductModel } from '@/domain/models'
import { type AddProductParams } from '@/domain/usecases'
import {
  type AddProductRepository,
  type LoadProductByIdRepository,
  type LoadProductsRepository,
  type DeleteProductRepository,
  type UpdateProductRepository,
  type UpdateProductParams
} from '@/data/protocols'

export class ProductMongoRepository implements
  AddProductRepository,
  LoadProductsRepository,
  LoadProductByIdRepository,
  DeleteProductRepository,
  UpdateProductRepository {
  async add (productData: AddProductParams): Promise<void> {
    const productCollection = MongoHelper.getCollection('products')
    await productCollection.insertOne(productData)
  }

  async loadAll (filter: any): Promise<ProductModel[]> {
    const productsCollection = MongoHelper.getCollection('products')
    const products = await productsCollection.find<ProductModel>(filter).toArray()
    return products.map(product => MongoHelper.map(product))
  }

  async loadById (id: string): Promise<ProductModel> {
    const productsCollection = MongoHelper.getCollection('products')
    const product = productsCollection.findOne<ProductModel>({ _id: { $eq: new ObjectId(id) } })
    return product && MongoHelper.map(product)
  }

  async delete (id: string): Promise<void> {
    const productsCollection = MongoHelper.getCollection('products')
    await productsCollection.deleteOne({ _id: new ObjectId(id) })
  }

  async update (params: UpdateProductParams): Promise<void> {
    const productCollection = MongoHelper.getCollection('products')
    const { id, body } = params
    await productCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...body } })
  }
}
