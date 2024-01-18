import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldsValidation } from '@/validation/validators'

const mockSut = (): RequiredFieldsValidation => new RequiredFieldsValidation('any_field')

describe('Required Fields validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation success', () => {
    const sut = mockSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
