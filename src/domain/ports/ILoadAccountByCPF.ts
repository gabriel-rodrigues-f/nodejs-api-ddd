import { type Account } from '@/domain/models'

export interface ILoadAccountByCPF {
  loadByCpf: (cpf: string) => Promise<Account>
}
