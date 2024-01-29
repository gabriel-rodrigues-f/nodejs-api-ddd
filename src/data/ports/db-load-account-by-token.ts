import { type AccountModel } from '@/domain/models'
import { type LoadAccountByToken } from '@/domain/ports'
import { type IDecrypter, type LoadAccountByTokenRepository } from '@/data/adapters'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypt: IDecrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    let token: string
    try { token = await this.decrypt.decrypt(accessToken) } catch (error) { return null }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) return account
    }
    return null
  }
}
