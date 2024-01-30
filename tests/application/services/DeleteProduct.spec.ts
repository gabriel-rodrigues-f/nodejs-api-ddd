import { type IDeleteProductRepository } from '@/core/ports/driven'
import { DeleteProduct } from '@/application/services'

const mockDeleteProductRepository = (): IDeleteProductRepository => {
  class DeleteProductRepositoryStub implements IDeleteProductRepository {
    async delete (id: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new DeleteProductRepositoryStub()
}

type SutTypes = {
  sut: DeleteProduct
  deleteProductRepositoryStub: IDeleteProductRepository
}

const mockSut = (): SutTypes => {
  const deleteProductRepositoryStub = mockDeleteProductRepository()
  const sut = new DeleteProduct(deleteProductRepositoryStub)
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
