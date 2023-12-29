import { DbAddAccount } from "./db-add-account"

describe('DbAddAccount Usecase', () => {
  it('Shoud call Encripter using correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encryptStub = new EncrypterStub()
    const sut = new DbAddAccount(encryptStub)
    const encriptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encriptSpy).toHaveBeenCalledWith('valid_password')
  })
})
