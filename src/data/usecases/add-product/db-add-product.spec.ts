import { AddProductModel } from '../../../domain/usecases/add-product'
import { DbAddProduct } from './db-add-product'
import { AddProductRepository } from '../../protocols/db/product/add-product-repository'

const makeFakeAddProduct = (): AddProductModel => ({
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

describe('DbAddProduct Usecase', () => {
  test('Should call AddProductRepository usign correct values', async () => {
    class AddProductRepositoryStub implements AddProductRepository {
      async add (productData: AddProductModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const addProductRepositoryStub = new AddProductRepositoryStub()
    const sut = new DbAddProduct(addProductRepositoryStub)
    const addSpy = jest.spyOn(addProductRepositoryStub, 'add')
    const addProductData = makeFakeAddProduct()
    await sut.add(addProductData)
    expect(addSpy).toHaveBeenCalledWith(addProductData)
  })
})
