import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel, LoadAccountByTokenRepository } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypt: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypt.decrypt(accessToken)
    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }
    return new Promise(resolve => resolve(null))
  }
}
