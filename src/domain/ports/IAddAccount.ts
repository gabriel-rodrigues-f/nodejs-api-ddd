import { type Account } from '@/domain/entities'

export type AddAccountParams = Omit<Account, 'id'>

export interface IAddAccount {
  add: (params: AddAccountParams) => Promise<Account>
}
