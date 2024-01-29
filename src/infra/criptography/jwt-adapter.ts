import { type IEncrypter, type IDecrypter } from '@/data/adapters'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) { }
  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret, { expiresIn: 1800 })
  }

  async decrypt (token: string): Promise<string> {
    return jwt.verify(token, this.secret) as any
  }
}
