import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypt: Decrypter) { }
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypt.decrypt(accessToken)
    return new Promise(resolve => resolve(null))
  }
}
