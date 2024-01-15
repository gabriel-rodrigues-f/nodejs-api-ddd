import { type HttpRequest } from '../../../protocols/http'
import { AddProductController } from './add-product-controller'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helpers'
import { type AddProduct, type AddProductModel, type Validation } from './add-product-controller-protocols'

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

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeAddProduct()
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  const validationStub = new ValidationStub()
  return validationStub
}

const makeAddProduct = (): AddProduct => {
  class AddProductStub implements AddProduct {
    async add (data: AddProductModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  const addProductStub = new AddProductStub()
  return addProductStub
}

interface SutTypes {
  sut: AddProductController
  validationStub: Validation
  addProductStub: AddProduct
}

const makeSut = (): SutTypes => {
  const addProductStub = makeAddProduct()
  const validationStub = makeValidation()
  const sut = new AddProductController(validationStub, addProductStub)
  return {
    sut,
    validationStub,
    addProductStub
  }
}

describe('Add Product Controller', () => {
  test('Should call Validation using correct values ', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddProduct usign correct values', async () => {
    const { sut, addProductStub } = makeSut()
    const addProductSpy = jest.spyOn(addProductStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addProductSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddProduct throws', async () => {
    const { sut, addProductStub } = makeSut()
    jest.spyOn(addProductStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, addProductStub } = makeSut()
    jest.spyOn(addProductStub, 'add')
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
