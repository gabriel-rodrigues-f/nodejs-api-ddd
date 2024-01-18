import { LoadProductByCategoryController } from './load-product-by-category-controller'
import {
  type LoadProductByCategory,
  type HttpRequest,
  type ProductModel,
  notFound,
  serverError,
  ok
} from '.'

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

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_category'
  }
})

const mockLoadProductByCategory = (): LoadProductByCategory => {
  class LoadProductByCategoryStub implements LoadProductByCategory {
    async loadByCategory (category: string): Promise<ProductModel> {
      return await Promise.resolve(mockProduct())
    }
  }
  return new LoadProductByCategoryStub()
}

type SutType = {
  sut: LoadProductByCategoryController
  loadProductByCategoryStub: LoadProductByCategory
}

const mockSut = (): SutType => {
  const loadProductByCategoryStub = mockLoadProductByCategory()
  const sut = new LoadProductByCategoryController(loadProductByCategoryStub)
  return {
    sut,
    loadProductByCategoryStub
  }
}

describe('LoadProductByCategory Controller', () => {
  test('Should call LoadProductByCategory with correct values', async () => {
    const { sut, loadProductByCategoryStub } = mockSut()
    const loadProductByCategorySpy = jest.spyOn(loadProductByCategoryStub, 'loadByCategory')
    await sut.handle(mockRequest())
    expect(loadProductByCategorySpy).toHaveBeenCalledWith('any_category')
  })

  test('Should return 404 if LoadProductByCategory returns empty', async () => {
    const { sut, loadProductByCategoryStub } = mockSut()
    jest.spyOn(loadProductByCategoryStub, 'loadByCategory').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if LoadProductByCategory throws', async () => {
    const { sut, loadProductByCategoryStub } = mockSut()
    jest.spyOn(loadProductByCategoryStub, 'loadByCategory').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadProductByCategory succeeds', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockProduct()))
  })
})
