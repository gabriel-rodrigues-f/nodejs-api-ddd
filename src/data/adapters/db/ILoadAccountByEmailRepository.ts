import { type Account } from '@/domain/entities'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<Account>
}
