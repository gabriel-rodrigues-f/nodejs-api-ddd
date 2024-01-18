import { type AccountModel } from '@/domain/models'

export interface LoadAccountByCpf {
  loadByCpf: (cpf: string) => Promise<AccountModel>
}
