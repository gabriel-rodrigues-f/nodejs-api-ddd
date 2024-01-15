import { LoadProductsController } from './load-products-controller'
import { ProductModel, LoadProducts } from './load-products-controller-protocols'

const makeFakeProducts = (): ProductModel[] => ([
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

const makeLoadProducts = (): LoadProducts => {
  class LoadProductsStub implements LoadProducts {
    async load (): Promise<ProductModel[]> {
      return new Promise(resolve => resolve(makeFakeProducts()))
    }
  }
  return new LoadProductsStub()
}

interface SutType {
  sut: LoadProductsController
  loadProductsStub: LoadProducts
}

const makeSut = (): SutType => {
  const loadProductsStub = makeLoadProducts()
  const sut = new LoadProductsController(loadProductsStub)
  return {
    sut,
    loadProductsStub
  }
}

describe('LoadProducts Controller', () => {
  test('Should call LoadProducts ', async () => {
    const { sut, loadProductsStub } = makeSut()
    const loadSpy = jest.spyOn(loadProductsStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
