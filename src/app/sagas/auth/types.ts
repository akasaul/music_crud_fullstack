export interface AuthState {
  inputName: string;
  inputPassword: string;
  inputEmail: string;
}

export interface AuthResponse {
  error: boolean;
  message: string;
  access_token: string;
  user: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
}
