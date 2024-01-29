import { type Account } from '@/domain/models'

export interface ILoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<Account>
}
