export interface DeleteAccessTokenRepository {
  deleteAccessToken: (id: string) => Promise<void>
}
