export type JWTDecoded = null | { [key: string]: string } | string;

export interface RootState {
  auth: { isAuthenticated: boolean; user: { username: string; id: number } };
}
