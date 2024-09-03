import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "../../features/auth/authSlice";
import axios from "axios";
import { AuthState, AuthResponse } from "./types";

function* workAuth() {
  try {
    const { inputName, inputPassword, inputEmail }: AuthState = yield select(
      (state: { auth: AuthState }) => state.auth,
    );

    const response: AuthResponse = yield call(() =>
      axios
        .post("http://localhost:3000/auth/signup", {
          email: inputEmail,
          password: inputPassword,
          name: inputName,
        })
        .then((res) => res.data),
    );

    yield put(signUpSuccess(response.user));
  } catch (err: any) {
    // Dispatch failure action with the error message
    yield put(signUpFailure(err.message));
  }
}

// Authentication saga
function* signUpSaga() {
  yield takeEvery(signUpRequest.type, workAuth);
}

export default signUpSaga;
