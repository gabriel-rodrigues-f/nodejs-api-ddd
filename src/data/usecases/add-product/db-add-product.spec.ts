import { type AddProductModel } from '../../../domain/usecases/add-product'
import { DbAddProduct } from './db-add-product'
import { type AddProductRepository } from '../../protocols/db/product/add-product-repository'

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

interface SutTypes {
  sut: DbAddProduct
  addProductRepositoryStub: AddProductRepository
}

const makeAddProductRepository = (): AddProductRepository => {
  class AddProductRepositoryStub implements AddProductRepository {
    async add (productData: AddProductModel): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addProductRepositoryStub = new AddProductRepositoryStub()
  return addProductRepositoryStub
}

const makeSut = (): SutTypes => {
  const addProductRepositoryStub = makeAddProductRepository()
  const sut = new DbAddProduct(addProductRepositoryStub)
  return {
    sut,
    addProductRepositoryStub
  }
}

describe('DbAddProduct Usecase', () => {
  test('Should call AddProductRepository usign correct values', async () => {
    const { sut, addProductRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addProductRepositoryStub, 'add')
    const addProductData = makeFakeAddProduct()
    await sut.add(addProductData)
    expect(addSpy).toHaveBeenCalledWith(addProductData)
  })

  test('Shoud throw Error if Hasher Throw Error', async () => {
    const { sut, addProductRepositoryStub } = makeSut()
    jest.spyOn(addProductRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAddProduct())
    await expect(promise).rejects.toThrow()
  })
})
