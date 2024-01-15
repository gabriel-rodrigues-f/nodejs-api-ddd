export type AuthenticationModel = {
  email: string
  password: string
}

export type Authentication = {
  auth (authentication: AuthenticationModel): Promise<string>
}
