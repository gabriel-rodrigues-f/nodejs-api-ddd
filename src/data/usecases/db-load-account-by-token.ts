import { type AccountModel } from '@/domain/models'
import { type LoadAccountByToken } from '@/domain/usecases'
import { type Decrypter, type LoadAccountByTokenRepository } from '@/data/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypt: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    let token: string
    try {
      token = await this.decrypt.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) return account
    }
    return null
  }
}
