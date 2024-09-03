import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  signInFailure,
  signInSuccess,
  signUpRequest,
} from "../../features/auth/authSlice";
import axios from "axios";
import { AuthResponse, AuthState } from "./types";

function* workAuth() {
  try {
    const { inputEmail, inputPassword }: AuthState = yield select(
      (state: { auth: AuthState }) => state.auth,
    );

    const response: AuthResponse = yield call(() =>
      axios
        .post("http://localhost:3000/auth/signin", {
          email: inputEmail,
          password: inputPassword,
        })
        .then((res) => res.data),
    );

    yield put(signInSuccess(response.user));
  } catch (err: any) {
    yield put(signInFailure(err.message));
  }
}

function* signInSaga() {
  yield takeEvery(signUpRequest.type, workAuth);
}

export default signInSaga;
