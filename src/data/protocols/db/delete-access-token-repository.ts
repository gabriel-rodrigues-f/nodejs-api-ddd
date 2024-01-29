export interface DeleteAccessTokenRepository {
  deleteAccessToken: (token: string, email: string) => Promise<void>
}
