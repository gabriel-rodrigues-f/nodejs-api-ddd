import { type Logout } from '@/domain/usecases'
import { type DeleteAccessTokenRepository } from '@/data/protocols'

export class DbLogout implements Logout {
  constructor (private readonly repository: DeleteAccessTokenRepository) { }
  async logout (token: string): Promise<void> {
    await this.repository.deleteAccessToken(token)
  }
}
