import { type Authentication, type AuthenticationParams } from '@/domain/ports'
import {
  type IHashComparer,
  type LoadAccountByEmailRepository,
  type IEncrypter,
  type UpdateAccessTokenRepository
} from '@/data/adapters'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  ) { }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepositoryStub.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
