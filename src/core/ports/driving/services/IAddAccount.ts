import { type Account } from '@/core/entities'

export type AddAccountParams = Omit<Account, 'id'>

export interface IAddAccount {
  add: (params: AddAccountParams) => Promise<Account>
}
