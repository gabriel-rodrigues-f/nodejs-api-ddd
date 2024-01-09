import { HttpRequest } from '../../../protocols/http'
import { AddProductController } from './add-product-controller'
import { Validation } from './add-product-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: '1',
    category: 'snack',
    name: 'Duc Tasty',
    price: '39,90',
    nutritionalInformation: {
      calorie: '44g',
      carbohydrate: '10g',
      total_sugars: '6g',
      added_sugars: '42g',
      proteins: '57g',
      total_fat: '23g',
      saturated_fat: '1.5g',
      trans_fats: '4.5g',
      dietary_fiber: '4.5g',
      sodium: '1370.89mg'
    }
  }
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

interface SutTypes {
  sut: AddProductController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddProductController(validationStub)
  return {
    sut,
    validationStub
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
})
