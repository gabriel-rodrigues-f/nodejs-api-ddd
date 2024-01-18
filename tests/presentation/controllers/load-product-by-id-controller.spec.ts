import { type ProductModel } from '@/domain/models'
import { type LoadProductById } from '@/domain/usecases'
import { type HttpRequest } from '@/presentation/protocols'
import { LoadProductByidController } from '@/presentation/controllers'
import {
  noContent,
  serverError,
  ok
} from '@/presentation/helpers'

const mockProduct = (): ProductModel => ({
  id: 'any_id',
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  nutritionalInformation: {
    calorie: 'any_calorie',
    carbohydrate: 'any_carbohydrate',
    total_sugars: 'any_total_sugars',
    added_sugars: 'any_added_sugars',
    proteins: 'any_proteins',
    total_fat: 'any_total_fat',
    saturated_fat: 'any_saturated_fat',
    trans_fats: 'any_trans_fats',
    dietary_fiber: 'any_dietary_fiber',
    sodium: 'any_sodium'
  }
})

const mockLoadProductById = (): LoadProductById => {
  class LoadProductByIdStub implements LoadProductById {
    async loadById (id: string): Promise<ProductModel> {
      return await Promise.resolve(mockProduct())
    }
  }
  return new LoadProductByIdStub()
}

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_productId'
  }
})

type SutTypes = {
  sut: LoadProductByidController
  loadProductByIdStub: LoadProductById
}

const mockSut = (): SutTypes => {
  const loadProductByIdStub = mockLoadProductById()
  const sut = new LoadProductByidController(loadProductByIdStub)
  return {
    sut,
    loadProductByIdStub
  }
}

describe('LoadProductById Controller', () => {
  test(' Should call LoadProductBy with correct values', async () => {
    const { sut, loadProductByIdStub } = mockSut()
    const loadProductByIdSpy = jest.spyOn(loadProductByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadProductByIdSpy).toHaveBeenCalledWith('any_productId')
  })

  test('Should return 204 if LoadProductById returns empty', async () => {
    const { sut, loadProductByIdStub } = mockSut()
    jest.spyOn(loadProductByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })

  test('Should return 500 if LoadProductById throws', async () => {
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
