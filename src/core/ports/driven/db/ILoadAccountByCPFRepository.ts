import { type Account } from '@/core/entities'

export interface ILoadAccountByCPFRepository {
  loadByCpf: (cpf: string) => Promise<Account>
}
