export interface IDeleteAccessTokenRepository {
  deleteAccessToken: (email: string) => Promise<void>
}
