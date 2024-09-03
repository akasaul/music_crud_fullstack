import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  signInFailure,
  signInRequest,
  signInSuccess,
  signUpRequest,
} from "../../features/auth/authSlice";
import axios from "axios";
import { AuthResponse, AuthState } from "./types";
import { signInUser } from "../../../services/api/user.service";

function* workAuth() {
  try {
    const { inputEmail: email, inputPassword: password }: AuthState =
      yield select((state: { auth: AuthState }) => state.auth);

    const response: AuthResponse = yield call(() =>
      signInUser({ email, password }),
    );

    yield put(signInSuccess(response.user));
  } catch (err: any) {
    yield put(signInFailure(err.message));
  }
}

function* signInSaga() {
  yield takeEvery(signInRequest.type, workAuth);
}

export default signInSaga;
