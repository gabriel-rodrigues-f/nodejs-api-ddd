import { type AccountModel } from '@/domain/models'

export interface ILoadAccountByCPF {
  loadByCpf: (cpf: string) => Promise<AccountModel>
}
