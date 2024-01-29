import { type Authentication, type AuthenticationParams } from '@/domain/ports'
import {
  type IHashComparer,
  type ILoadAccountByEmailRepository,
  type IEncrypter,
  type UpdateAccessTokenRepository
} from '@/data/adapters'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateRepository: UpdateAccessTokenRepository
  ) { }

  async auth (params: AuthenticationParams): Promise<string> {
    const account = await this.loadRepository.loadByEmail(params.email)
    if (account) {
      const isValid = await this.hashComparer.compare(params.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
