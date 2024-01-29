import {
  MongoClient,
  type Collection,
  type ClientSession
} from 'mongodb'
import env from '@/main/config/env'

export const MongoDBHelper = {
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

  async startTransaction (): Promise<ClientSession> {
    const session = this.client.startSession()
    await session.startTransaction()
    return session
  },

  async commitTransaction (session: ClientSession): Promise<void> {
    try {
      await session.commitTransaction()
    } finally { await session.endSession() }
  },

  async abortTransaction (session: ClientSession): Promise<void> {
    try {
      await session.abortTransaction()
    } finally {
      await session.endSession()
    }
  },

  map (data: any, id?: string): any {
    const { _id, ...object } = data
    if (id) return { ...object, id }
    if (!_id) return data
    return { ...object, id: _id }
  }
}
