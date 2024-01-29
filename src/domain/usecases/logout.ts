export interface Logout {
  logout: (accessToken: string, email: string) => Promise<void>
}
