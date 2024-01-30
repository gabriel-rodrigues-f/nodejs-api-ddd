import { type Account } from '@/core/entities'

export interface ILoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<Account>
}
