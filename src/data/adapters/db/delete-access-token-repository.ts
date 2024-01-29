export interface DeleteAccessTokenRepository {
  deleteAccessToken: (email: string) => Promise<void>
}
