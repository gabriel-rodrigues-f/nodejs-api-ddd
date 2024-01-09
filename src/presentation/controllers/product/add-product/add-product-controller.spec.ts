import { HttpRequest } from '../../../protocols/http'
import { AddProductController } from './add-product-controller'
import { Validation } from './add-product-controller-protocols'

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

describe('Add Product Controller', () => {
  test('Should call Validation using correct values ', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validation = new ValidationStub()
    const validationSpy = jest.spyOn(validation, 'validate')
    const sut = new AddProductController(validation)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
