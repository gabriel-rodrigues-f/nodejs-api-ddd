export interface DeleteAccessTokenRepository {
  deleteAccessToken: (token: string) => Promise<void>
}
