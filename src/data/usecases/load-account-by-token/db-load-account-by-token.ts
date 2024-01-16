import { type LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { type AccountModel, type LoadAccountByTokenRepository } from '../account/add-account/db-add-account-protocols'
import { type Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypt: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypt.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
