import { type Account } from '@/core/entities'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<Account>
}
