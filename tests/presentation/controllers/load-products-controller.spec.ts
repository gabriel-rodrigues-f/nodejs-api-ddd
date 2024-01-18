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
  },
  {
    id: 'other_id',
    category: 'other_category',
    name: 'other_name',
    price: 'other_price',
    nutritionalInformation: {
      calorie: 'other_calorie',
      carbohydrate: 'other_carbohydrate',
      total_sugars: 'other_total_sugars',
      added_sugars: 'other_added_sugars',
      proteins: 'other_proteins',
      total_fat: 'other_total_fat',
      saturated_fat: 'other_saturated_fat',
      trans_fats: 'other_trans_fats',
      dietary_fiber: 'other_dietary_fiber',
      sodium: 'other_sodium'
    }
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
