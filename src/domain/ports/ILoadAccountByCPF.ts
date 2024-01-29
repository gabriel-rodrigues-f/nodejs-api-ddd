import { type Account } from '@/domain/entities'

export interface ILoadAccountByCPF {
  loadByCpf: (cpf: string) => Promise<Account>
}
