import { type Account } from '@/core/entities'

export interface ILoadAccountByCPF {
  loadByCpf: (cpf: string) => Promise<Account>
}
