import { type AddAccountParams } from '@/domain/ports/add-account'
import { type AccountModel } from '@/domain/models/account'

export interface IAddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel>
}
