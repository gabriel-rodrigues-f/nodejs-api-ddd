import { type Validation, type HttpRequest } from '@/presentation/protocols'
import { type UpdateProductParams, type UpdateProduct } from '@/domain/ports'
import { UpdateProductController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

const mockUpdateProduct = (): UpdateProduct => {
  class UpdateProductStub implements UpdateProduct {
    async update (params: UpdateProductParams): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new UpdateProductStub()
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockRequest = (): HttpRequest => ({
  body: {
    category: 'other_category',
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    image: 'any_image'
  },
  params: {
    id: 'any_id'
  }
})

type SutTypes = {
  sut: UpdateProductController
  updateProductStub: UpdateProduct
  validationStub: Validation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const updateProductStub = mockUpdateProduct()
  const sut = new UpdateProductController(validationStub, updateProductStub)
  return {
    sut,
    updateProductStub,
    validationStub
  }
}

describe('UpdateProductContrller', () => {
  test('Should call UpdateProduct with correct values', async () => {
    const { sut, updateProductStub } = mockSut()
    const updateSpy = jest.spyOn(updateProductStub, 'update')
    await sut.handle(mockRequest())
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      body: {
        category: 'other_category',
        name: 'any_name',
        price: 'any_price',
        description: 'any_description',
        image: 'any_image'
      }
    })
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validationSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should return 500 if UpdateProduct throws', async () => {
    const { sut, updateProductStub } = mockSut()
    jest.spyOn(updateProductStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
