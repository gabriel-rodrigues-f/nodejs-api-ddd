import { type IHasher, type IHashComparer } from '@/data/adapters'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (private readonly salt: number) { }
  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
