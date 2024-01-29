export interface ILogout {
  logout: (email: string) => Promise<void>
}
