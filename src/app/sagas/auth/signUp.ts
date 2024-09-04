import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "../../features/auth/authSlice";
import { AuthState, AuthResponse } from "./types";
import { signUpUser } from "../../../services/api/user.service";
import { setItem } from "../../../lib/localStorage";

function* workAuth() {
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
  } catch (err: any) {
    // Dispatch failure action with the error message
    console.log({ err });
    yield put(signUpFailure(err.response.data.message));
  }
}

// Authentication saga
function* signUpSaga() {
  yield takeEvery(signUpRequest.type, workAuth);
}

export default signUpSaga;
