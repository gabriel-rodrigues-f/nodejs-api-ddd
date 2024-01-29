import { type AccountModel } from '@/domain/models'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}
