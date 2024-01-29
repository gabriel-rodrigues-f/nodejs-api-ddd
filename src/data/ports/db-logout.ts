import { type Logout } from '@/domain/ports'
import { type DeleteAccessTokenRepository } from '@/data/adapters'

export class DbLogout implements Logout {
  constructor (private readonly repository: DeleteAccessTokenRepository) { }
  async logout (email: string): Promise<void> {
    await this.repository.deleteAccessToken(email)
  }
}
