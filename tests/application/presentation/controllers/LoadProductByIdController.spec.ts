import { type Product } from '@/core/entities'
import { type ILoadProductById } from '@/core/ports/driving/services'
import { type IHTTPRequest } from '@/core/ports/driving/presentation'
import { LoadProductByIdController } from '@/application/presentation/controllers'
import {
  noContent,
  serverError,
  ok
} from '@/application/presentation/helpers'

const mockProduct = (): Product => ({
  id: 'any_id',
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  description: 'any_description',
  image: 'any_image'
})

const mockLoadProductById = (): ILoadProductById => {
  class LoadProductByIdStub implements ILoadProductById {
    async loadById (id: string): Promise<Product> {
      return await Promise.resolve(mockProduct())
    }
  }
  return new LoadProductByIdStub()
}

const mockRequest = (): IHTTPRequest => ({
  params: {
    id: 'any_productId'
  }
})

type SutTypes = {
  sut: LoadProductByIdController
  loadProductByIdStub: ILoadProductById
}

const mockSut = (): SutTypes => {
  const loadProductByIdStub = mockLoadProductById()
  const sut = new LoadProductByIdController(loadProductByIdStub)
  return {
    sut,
    loadProductByIdStub
  }
}

describe('ILoadProductById IController', () => {
  test(' Should call LoadProductBy with correct values', async () => {
    const { sut, loadProductByIdStub } = mockSut()
    const loadProductByIdSpy = jest.spyOn(loadProductByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadProductByIdSpy).toHaveBeenCalledWith('any_productId')
  })

  test('Should return 204 if ILoadProductById returns empty', async () => {
    const { sut, loadProductByIdStub } = mockSut()
    jest.spyOn(loadProductByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })

  test('Should return 500 if ILoadProductById throws', async () => {
    const { sut, loadProductByIdStub } = mockSut()
    jest.spyOn(loadProductByIdStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(mockProduct()))
  })
})
