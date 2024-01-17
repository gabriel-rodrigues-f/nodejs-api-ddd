import jwt from 'jsonwebtoken'
import {
  type Encrypter,
  type Decrypter
} from '.'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) { }
  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt (token: string): Promise<string> {
    return jwt.verify(token, this.secret) as any
  }
}
