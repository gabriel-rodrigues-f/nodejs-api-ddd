import { type AddAccountParams } from '@/core/ports/driving/services'
import { type Account } from '@/core/entities'

export interface IAddAccountRepository {
  add: (params: AddAccountParams) => Promise<Account>
}
