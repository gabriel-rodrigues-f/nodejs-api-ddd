import { type Account } from '@/domain/models'
import { type ILoadAccountByToken } from '@/domain/ports'
import { type IDecrypter, type ILoadAccountByTokenRepository } from '@/data/adapters'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypt: IDecrypter,
    private readonly repository: ILoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<Account> {
    let token: string
    try { token = await this.decrypt.decrypt(accessToken) } catch (error) { return null }
    if (token) {
      const account = await this.repository.loadByToken(accessToken, role)
      if (account) return account
    }
    return null
  }
}
