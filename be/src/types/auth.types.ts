export interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export interface PickRegister {
  name: string;
  email: string;
  password?: string;
}

export interface PickLogin {
  email: string;
  password?: string;
}
