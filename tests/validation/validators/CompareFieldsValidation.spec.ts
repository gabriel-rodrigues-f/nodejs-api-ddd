import { InvalidParam } from '@/application/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const mockSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('Compare Fields validation', () => {
  test('Should return a InvalidParam if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_Value'
    })
    expect(error).toEqual(new InvalidParam('fieldToCompare'))
  })

  test('Should not return if validation success', () => {
    const sut = mockSut()
    const error = sut.validate({
      field: 'any_password',
      fieldToCompare:
        'any_password'
    })
    expect(error).toBeFalsy()
  })
})
