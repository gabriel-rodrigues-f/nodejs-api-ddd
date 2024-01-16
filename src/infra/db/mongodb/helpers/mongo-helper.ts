import { type Collection, MongoClient } from 'mongodb'
import env from '@/main/config/env'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db(env.MONGO_DB_DATABASE).collection(name)
  },

  map (data: any, id?: string): any {
    const { _id, ...object } = data
    if (id) {
      return { ...object, id }
    }
    return { ...object, id: _id }
  }
}
