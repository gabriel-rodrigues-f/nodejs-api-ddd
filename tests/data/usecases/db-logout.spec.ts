import { type DeleteAccessTokenRepository } from '@/data/adapters'
import { DbLogout } from '@/data/ports'

const mockDeleteAccesstokenRepository = (): DeleteAccessTokenRepository => {
  class DeleteAccessTokenRepositoryStub implements DeleteAccessTokenRepository {
    async deleteAccessToken (email: string): Promise<void> {
      await Promise.resolve()
    }
  }
  return new DeleteAccessTokenRepositoryStub()
}

type SutTypes = {
  deleteAccessTokenStub: DeleteAccessTokenRepository
  sut: DbLogout
}

const mockSut = (): SutTypes => {
  const deleteAccessTokenStub = mockDeleteAccesstokenRepository()
  const sut = new DbLogout(deleteAccessTokenStub)
  return {
    sut,
    deleteAccessTokenStub
  }
}

describe('Logout Usecase', () => {
  test('Should call DeleteAccesstoken with correct values', async () => {
    const { sut, deleteAccessTokenStub } = mockSut()
    const loadSpy = jest.spyOn(deleteAccessTokenStub, 'deleteAccessToken')
    await sut.logout('any_email')
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should throw if deleteAccessTokenStubRepository throws', async () => {
    const { sut, deleteAccessTokenStub } = mockSut()
    jest.spyOn(deleteAccessTokenStub, 'deleteAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.logout('any_email')
    await expect(promise).rejects.toThrow()
  })
})
