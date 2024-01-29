import { type AccountModel } from '@/domain/models'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface IAddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
