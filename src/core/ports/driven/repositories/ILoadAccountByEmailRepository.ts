import { type Account } from '@/core/entities'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<Account>
}
