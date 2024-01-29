import { type Account } from '@/domain/models'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<Account>
}
