import { type AccountModel } from '@/domain/models/account'

export interface LoadAccountByCpfRepository {
  loadByCpf: (cpf: string) => Promise<AccountModel>
}
