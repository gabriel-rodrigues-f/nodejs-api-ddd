export class EmailInUse extends Error {
  constructor () {
    super('The received email is already in use')
    this.name = 'EmailInUse'
  }
}
