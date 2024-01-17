import { DbDeleteProduct } from './db-delete-product'
import {
  type DeleteProductRepository
} from './'

const makeDeleteProductRepository = (): DeleteProductRepository => {
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

const makeSut = (): SutTypes => {
  const deleteProductRepositoryStub = makeDeleteProductRepository()
  const sut = new DbDeleteProduct(deleteProductRepositoryStub)
  return {
    sut,
    deleteProductRepositoryStub
  }
}

describe('Delete Product Usecase', () => {
  test('Should call DeleteProduct Repository with correct values', async () => {
    const { sut, deleteProductRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProductRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
})
