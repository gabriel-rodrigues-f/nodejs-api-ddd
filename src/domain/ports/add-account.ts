import { type AccountModel } from '@/domain/models'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
