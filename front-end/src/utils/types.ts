export type JWTDecoded = null |{ [key: string]: any } | string;

export interface RootState { auth: { isAuthenticated: boolean, user: object}; }
