import {
  type AddProductParams,
  type AddProduct
} from '@/domain/usecases'
import {
  type HttpRequest,
  type Validation
} from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers'
import {
  badRequest,
  serverError,
  noContent
} from '@/presentation/helpers'

const mockAddProductParams = (): AddProductParams => ({
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
  body: mockAddProductParams()
})

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  const validationStub = new ValidationStub()
  return validationStub
}

const mockAddProduct = (): AddProduct => {
  class AddProductStub implements AddProduct {
    async add (data: AddProductParams): Promise<void> {
      return await Promise.resolve()
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

const mockSut = (): SutTypes => {
  const addProductStub = mockAddProduct()
  const validationStub = mockValidation()
  const sut = new AddProductController(validationStub, addProductStub)
  return {
    sut,
    validationStub,
    addProductStub
  }
}

describe('Add Product Controller', () => {
  test('Should call Validation using correct values ', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call AddProduct usign correct values', async () => {
    const { sut, addProductStub } = mockSut()
    const addProductSpy = jest.spyOn(addProductStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addProductSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if AddProduct throws', async () => {
    const { sut, addProductStub } = mockSut()
    jest.spyOn(addProductStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut, addProductStub } = mockSut()
    jest.spyOn(addProductStub, 'add')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
