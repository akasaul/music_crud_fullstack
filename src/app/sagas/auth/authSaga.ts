import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  setIsAuth,
  signInFailure,
  signInRequest,
  signInSuccess,
  signOut,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "../../features/auth/authSlice";
import { AuthState } from "./types";
import { signInUser, signUpUser } from "../../../services/api/user.service";
import { setItem } from "../../../lib/localStorage";

function* handleSignIn() {
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

function* handleSignOut() {
  console.log("sign out saga");
  localStorage.removeItem("token");
  localStorage.removeItem("name");
}

function* handleSignUp() {
  try {
    const {
      inputName: name,
      inputPassword: password,
      inputEmail: email,
    }: AuthState = yield select((state: { auth: AuthState }) => state.auth);

    const { data } = yield call(() => signUpUser({ name, email, password }));

    yield put(signUpSuccess(data.user));
    setItem("token", data.access_token);
    setItem("name", data.user.name);
    yield put(setIsAuth());
  } catch (err: any) {
    yield put(signUpFailure(err.response.data.message));
  }
}

function* authSaga() {
  yield takeEvery(signInRequest.type, handleSignIn);
  yield takeEvery(signOut.type, handleSignOut);
  yield takeEvery(signUpRequest.type, handleSignUp);
}

export default authSaga;
