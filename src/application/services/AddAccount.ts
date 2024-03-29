import { type Account } from '@/core/entities'
import { type AddAccountParams, type IAddAccount } from '@/core/ports/driving/services'
import {
  type IHasher,
  type IAddAccountRepository,
  type ILoadAccountByEmailRepository
} from '@/core/ports/driven'

export class AddAccount implements IAddAccount {
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
