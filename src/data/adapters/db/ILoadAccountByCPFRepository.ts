import { type Account } from '@/domain/models'

export interface ILoadAccountByCPFRepository {
  loadByCpf: (cpf: string) => Promise<Account>
}
