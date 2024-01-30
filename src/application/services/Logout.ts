import { type ILogout } from '@/core/ports/driving/services'
import { type IDeleteAccessTokenRepository } from '@/core/ports/driven'

export class Logout implements ILogout {
  constructor (private readonly repository: IDeleteAccessTokenRepository) { }
  async logout (email: string): Promise<void> {
    await this.repository.deleteAccessToken(email)
  }
}
