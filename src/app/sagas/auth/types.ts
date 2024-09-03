export interface AuthState {
  inputName: string;
  inputPassword: string;
  inputEmail: string;
}

export interface AuthResponse {
  user: {
    uid: string;
    displayName: string;
  };
}
