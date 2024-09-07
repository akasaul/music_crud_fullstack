import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  setIsAuth,
  signInFailure,
  signInRequest,
  signInSuccess,
} from "../../features/auth/authSlice";
import { AuthState } from "./types";
import { signInUser } from "../../../services/api/user.service";
import { setItem } from "../../../lib/localStorage";

function* workAuth() {
  try {
    const { inputEmail: email, inputPassword: password }: AuthState =
      yield select((state: { auth: AuthState }) => state.auth);

    const { data } = yield call(() => signInUser({ email, password }));

    yield put(signInSuccess(data.user));
    setItem("token", data.access_token);
    setItem("name", data.user.name);
    yield put(setIsAuth());
  } catch (err: any) {
    yield put(signInFailure(err.response.data.message));
  }
}

function* signInSaga() {
  yield takeEvery(signInRequest.type, workAuth);
}

export default signInSaga;
