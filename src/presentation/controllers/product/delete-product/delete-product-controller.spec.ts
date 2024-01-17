import { DeleteProductController } from './delete-product-controller'
import {
  serverError,
  // noContent,
  type DeleteProduct,
  type HttpRequest
} from '.'

const makeDeleteProduct = (): DeleteProduct => {
  class DeleteProductStub implements DeleteProduct {
    async delete (id: string): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new DeleteProductStub()
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: DeleteProductController
  deleteProductStub: DeleteProduct
}

const makeSut = (): SutTypes => {
  const deleteProductStub = makeDeleteProduct()
  const sut = new DeleteProductController(deleteProductStub)
  return {
    sut,
    deleteProductStub
  }
}

describe('DeleteProduct Controller', () => {
  test('Should call DeleteProduct with correct values', async () => {
    const { sut, deleteProductStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProductStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteProduct throws', async () => {
    const { sut, deleteProductStub } = makeSut()
    jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  // test('', async () => {
  //   const { sut, deleteProductStub } = makeSut()
  //   jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.resolve(null))
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(noContent())
  // })
  // test('Should return 204 if DeleteProduct returns empty', async () => {
  //   const { sut, deleteProductStub } = makeSut()
  //   jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.resolve(null))
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(noContent())
  // })

  // test('Should return 500 if LoadProductById throws', async () => {
  //   const { sut, deleteProductStub } = makeSut()
  //   jest.spyOn(deleteProductStub, 'delete').mockReturnValueOnce(Promise.reject(new Error()))
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(serverError(new Error()))
  // })

  // test('Should return 204 on success', async () => {
  //   const { sut } = makeSut()
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(noContent(makeFakeProduct()))
  // })
})
