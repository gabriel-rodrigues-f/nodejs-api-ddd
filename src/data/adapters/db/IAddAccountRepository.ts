import { type AddAccountParams } from '@/domain/ports/IAddAccount'
import { type AccountModel } from '@/domain/models/account'

export interface IAddAccountRepository {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
