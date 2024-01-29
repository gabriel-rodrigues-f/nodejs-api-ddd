import { type AccountModel } from '@/domain/models/account'

export interface ILoadAccountByCPFRepository {
  loadByCpf: (cpf: string) => Promise<AccountModel>
}
