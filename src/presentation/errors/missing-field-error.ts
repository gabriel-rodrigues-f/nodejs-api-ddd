export class MissingFieldError extends Error {
  constructor (fields: string) {
    super(`At least one field is required ${fields}`)
    this.name = 'MissingFieldError'
  }
}
