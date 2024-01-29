import { type Account } from '@/domain/entities'

export interface ILoadAccountByCPFRepository {
  loadByCpf: (cpf: string) => Promise<Account>
}
