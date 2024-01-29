import { type Logout } from '@/domain/ports'
import { type IDeleteAccessTokenRepository } from '@/data/adapters'

export class DbLogout implements Logout {
  constructor (private readonly repository: IDeleteAccessTokenRepository) { }
  async logout (email: string): Promise<void> {
    await this.repository.deleteAccessToken(email)
  }
}
