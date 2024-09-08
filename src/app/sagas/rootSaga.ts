import { all } from "redux-saga/effects";
import statsSaga from "./stats/statsSaga";
import songSaga from "./song/songSaga";
import authSaga from "./auth/authSaga";

export default function* rootSaga() {
  yield all([authSaga(), statsSaga(), songSaga()]);
}
