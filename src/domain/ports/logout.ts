export interface Logout {
  logout: (email: string) => Promise<void>
}
