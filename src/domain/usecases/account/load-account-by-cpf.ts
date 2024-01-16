import { type AccountModel } from '../../models/account'

export interface LoadAccountByCpf {
  loadByCpf: (cpf: string) => Promise<AccountModel>
}
