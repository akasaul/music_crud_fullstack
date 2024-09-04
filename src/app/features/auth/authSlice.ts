import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  auth: object | null;
  inputEmail: string;
  inputPassword: string;
  inputName: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  token: string | null;
}

interface UserDataPayload {
  email: string;
  password: string;
  name: string;
}

interface AuthPayload {
  [key: string]: any;
}

const initialState: AuthState = {
  auth: null,
  inputEmail: "",
  inputPassword: "",
  inputName: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sign up reducers
    signUpRequest: (state) => {
      state.isLoading = true;
    },

    signUpSuccess: (state, action: PayloadAction<AuthPayload>) => {
      state.auth = action.payload;
      state.isLoading = false;
      state.errorMsg = "";
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMsg = action.payload;
    },

    // Set user data from form
    setUserData: (state, action: PayloadAction<UserDataPayload>) => {
      state.inputEmail = action.payload.email;
      state.inputPassword = action.payload.password;
      state.inputName = action.payload.name;
    },

    // Sign in reducers
    signInRequest: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<AuthPayload>) => {
      state.auth = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.isError = true;
      state.isLoading = false;
      state.errorMsg = action.payload;
    },

    // Sign out
    signOut: (state) => {
      state.auth = null;
    },

    // Reset all states
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMsg = "";
    },
  },
});

export const {
  signUpFailure,
  signUpRequest,
  signUpSuccess,
  setUserData,
  signInFailure,
  signInRequest,
  signInSuccess,
  signOut,
  reset,
} = authSlice.actions;

export default authSlice.reducer;
