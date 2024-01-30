import { InvalidParam } from '@/application/presentation/errors'
import { CPFValidation } from '@/validation/validators'

const mockSut = (): CPFValidation => new CPFValidation('cpf')

describe('CPF IValidation', () => {
  test('Should return a InvalidParam if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate('wrong_cpf')
    expect(error).toEqual(new InvalidParam('cpf'))
  })

  test('Should not return if a valid cpf is provided', () => {
    const sut = mockSut()
    const error = sut.validate({
      cpf: '123.456.789-09'
    })
    expect(error).toBeFalsy()
  })
})
