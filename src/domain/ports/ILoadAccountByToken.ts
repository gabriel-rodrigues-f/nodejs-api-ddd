import { type Account } from '@/domain/models'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<Account>
}
