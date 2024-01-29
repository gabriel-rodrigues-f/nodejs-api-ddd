import { type IDeleteProductRepository } from '@/data/adapters'
import { DbDeleteProduct } from '@/data/ports'

const mockDeleteProductRepository = (): IDeleteProductRepository => {
  class DeleteProductRepositoryStub implements IDeleteProductRepository {
    async delete (id: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new DeleteProductRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteProduct
  deleteProductRepositoryStub: IDeleteProductRepository
}

const mockSut = (): SutTypes => {
  const deleteProductRepositoryStub = mockDeleteProductRepository()
  const sut = new DbDeleteProduct(deleteProductRepositoryStub)
  return {
    sut,
    deleteProductRepositoryStub
  }
}

describe('Delete Product Usecase', () => {
  test('Should call IDeleteProduct Repository with correct values', async () => {
    const { sut, deleteProductRepositoryStub } = mockSut()
    const deleteSpy = jest.spyOn(deleteProductRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if IDeleteProductRepository throws', async () => {
    const { sut, deleteProductRepositoryStub } = mockSut()
    jest.spyOn(deleteProductRepositoryStub, 'delete').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})
