import { type Account } from '@/domain/entities'
import { type ILoadAccountByCPF } from '@/domain/ports'
import { type ILoadAccountByCPFRepository } from '@/data/adapters'

export class LoadACcountByCPF implements ILoadAccountByCPF {
  constructor (private readonly repository: ILoadAccountByCPFRepository) { }
  async loadByCpf (cpf: string): Promise<Account> {
    return await this.repository.loadByCpf(cpf)
  }
}
