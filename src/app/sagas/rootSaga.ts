import { all } from "redux-saga/effects";
import signUpSaga from "./auth/signUp";
import signInSaga from "./auth/signIn";
import statsSaga from "./stats/statsSaga";
import songSaga from "./song/songSaga";

export default function* rootSaga() {
  yield all([signUpSaga(), signInSaga(), statsSaga(), songSaga()]);
}
