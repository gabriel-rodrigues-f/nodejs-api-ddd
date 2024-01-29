import { type Account } from '@/domain/entities'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<Account>
}
