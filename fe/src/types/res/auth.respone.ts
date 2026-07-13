export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  username?: string;
  role: string;
  avaUrl?: string;
  isVerify: boolean;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  refreshToken: string;
}

export type PickResponeGetMe = Pick<
  AuthResponse,
  'name' | 'username' | 'avaUrl' | 'role' | 'email'
>;
