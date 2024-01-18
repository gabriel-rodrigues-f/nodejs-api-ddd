import { DbDeleteProduct } from './db-delete-product'
import {
  type DeleteProductRepository
} from './'

const mockDeleteProductRepository = (): DeleteProductRepository => {
  class DeleteProductRepositoryStub implements DeleteProductRepository {
    async delete (id: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new DeleteProductRepositoryStub()
}

type SutTypes = {
  sut: DbDeleteProduct
  deleteProductRepositoryStub: DeleteProductRepository
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
  test('Should call DeleteProduct Repository with correct values', async () => {
    const { sut, deleteProductRepositoryStub } = mockSut()
    const deleteSpy = jest.spyOn(deleteProductRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if DeleteProductRepository throws', async () => {
    const { sut, deleteProductRepositoryStub } = mockSut()
    jest.spyOn(deleteProductRepositoryStub, 'delete').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })
})
