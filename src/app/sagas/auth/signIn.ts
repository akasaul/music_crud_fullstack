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
import { setItem } from "../../../lib/localStorage";

function* workAuth() {
  try {
    const { inputEmail: email, inputPassword: password }: AuthState =
      yield select((state: { auth: AuthState }) => state.auth);

    const { data } = yield call(() => signInUser({ email, password }));

    console.log({ data }, "sign in response");

    yield put(signInSuccess(data.user));
    setItem("token", data.access_token);
    setItem("name", data.user.name);
  } catch (err: any) {
    yield put(signInFailure(err.response.data.message));
  }
}

function* signInSaga() {
  yield takeEvery(signInRequest.type, workAuth);
}

export default signInSaga;
