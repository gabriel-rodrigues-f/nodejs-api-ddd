import { DeleteProductController } from './delete-product-controller'
import {
  serverError,
  noContent,
  type DeleteProduct,
  type HttpRequest
} from '.'

const mockDeleteProduct = (): DeleteProduct => {
  class DeleteProductStub implements DeleteProduct {
    async delete (id: string): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new DeleteProductStub()
}

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: DeleteProductController
  deleteProductStub: DeleteProduct
}

const mockSut = (): SutTypes => {
  const deleteProductStub = mockDeleteProduct()
  const sut = new DeleteProductController(deleteProductStub)
  return {
    sut,
    deleteProductStub
  }
}

describe('DeleteProduct Controller', () => {
  test('Should call DeleteProduct with correct values', async () => {
    const { sut, deleteProductStub } = mockSut()
    const deleteSpy = jest.spyOn(deleteProductStub, 'delete')
    await sut.handle(mockRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteProduct throws', async () => {
    const { sut, deleteProductStub } = mockSut()
    jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if DeleteProduct returns empty', async () => {
    const { sut, deleteProductStub } = mockSut()
    jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
