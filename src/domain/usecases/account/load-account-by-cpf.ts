import { type AccountModel } from '@/domain/models/account'

export interface LoadAccountByCpf {
  loadByCpf: (cpf: string) => Promise<AccountModel>
}
