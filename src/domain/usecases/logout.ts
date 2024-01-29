export interface Logout {
  logout: (accessToken: string) => Promise<void>
}
