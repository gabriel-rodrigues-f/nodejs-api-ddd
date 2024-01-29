import { type AddAccountParams } from '@/domain/ports'
import { type Account } from '@/domain/models'

export interface IAddAccountRepository {
  add: (params: AddAccountParams) => Promise<Account>
}
