import { type Account } from '@/domain/entities'
import { type AddAccountParams, type IAddAccount } from '@/domain/ports'
import {
  type IHasher,
  type IAddAccountRepository,
  type ILoadAccountByEmailRepository
} from '@/data/adapters'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addRepository: IAddAccountRepository,
    private readonly loadRepository: ILoadAccountByEmailRepository
  ) { }

  async add (params: AddAccountParams): Promise<Account> {
    const account = await this.loadRepository.loadByEmail(params.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(params.password)
      return await this.addRepository.add(Object.assign({}, params, { password: hashedPassword }))
    }
    return null
  }
}
