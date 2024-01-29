import { type Account } from '@/domain/models'

export type AddAccountParams = Omit<Account, 'id'>

export interface IAddAccount {
  add: (params: AddAccountParams) => Promise<Account>
}
