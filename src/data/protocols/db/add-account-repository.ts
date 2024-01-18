import { type AddAccountParams } from '@/domain/usecases/add-account'
import { type AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
