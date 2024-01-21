import { type ProductModel } from '@/domain/models'
import { type LoadProducts } from '@/domain/usecases'
import { LoadProductsController } from '@/presentation/controllers'
import {
  ok,
  noContent,
  serverError
} from '@/presentation/helpers'

const mockProducts = (): ProductModel[] => ([
  {
    id: 'any_id',
    category: 'any_category',
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    image: 'any_image'
  },
  {
    id: 'other_id',
    category: 'other_category',
    name: 'other_name',
    price: 'other_price',
    description: 'other_description',
    image: 'other_image'
  }
])

const mockLoadProducts = (): LoadProducts => {
  class LoadProductsStub implements LoadProducts {
    async load (): Promise<ProductModel[]> {
      return await Promise.resolve(mockProducts())
    }
  }
  return new LoadProductsStub()
}

interface SutType {
  sut: LoadProductsController
  loadProductsStub: LoadProducts
}

const mockSut = (): SutType => {
  const loadProductsStub = mockLoadProducts()
  const sut = new LoadProductsController(loadProductsStub)
  return {
    sut,
    loadProductsStub
  }
}

describe('LoadProducts Controller', () => {
  test('Should call LoadProducts', async () => {
    const { sut, loadProductsStub } = mockSut()
    const loadSpy = jest.spyOn(loadProductsStub, 'load')
    await sut.handle()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(mockProducts()))
  })

  test('Should return 204 LoadProduct returns empty', async () => {
    const { sut, loadProductsStub } = mockSut()
    jest.spyOn(loadProductsStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle()
    expect(response).toEqual(noContent())
  })

  test('Should 500 if LoadProducts throws', async () => {
    const { sut, loadProductsStub } = mockSut()
    jest.spyOn(loadProductsStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })
})
