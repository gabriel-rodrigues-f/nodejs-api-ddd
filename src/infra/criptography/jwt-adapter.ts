import { type Encrypter, type Decrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) { }
  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret, { expiresIn: 20 })
  }

  async decrypt (token: string): Promise<string> {
    return jwt.verify(token, this.secret) as any
  }
}
