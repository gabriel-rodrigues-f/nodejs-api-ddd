import { type LoadProductById } from '@/domain/usecases/load-product-by-id'
import { LoadProductByidController } from './load-product-by-id-controller'
import { noContent, type HttpRequest, type ProductModel } from './load-product-by-id-controller-protocols'

const makeFakeProduct = (): ProductModel => ({
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

const makeLoadProductById = (): LoadProductById => {
  class LoadProductByIdStub implements LoadProductById {
    async loadById (id: string): Promise<ProductModel> {
      return await Promise.resolve(makeFakeProduct())
    }
  }
  return new LoadProductByIdStub()
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    productId: 'any_productId'
  }
})

type SutTypes = {
  sut: LoadProductByidController
  loadProductByIdStub: LoadProductById
}

const makeSut = (): SutTypes => {
  const loadProductByIdStub = makeLoadProductById()
  const sut = new LoadProductByidController(loadProductByIdStub)
  return {
    sut,
    loadProductByIdStub
  }
}

describe('LoadProductById Controller', () => {
  test(' Should call LoadProductBy with correct values', async () => {
    const { sut, loadProductByIdStub } = makeSut()
    const loadProductByIdSpy = jest.spyOn(loadProductByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadProductByIdSpy).toHaveBeenCalledWith('any_productId')
  })

  test('Should return 204 if LoadAccountById returns empty', async () => {
    const { sut, loadProductByIdStub } = makeSut()
    jest.spyOn(loadProductByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
