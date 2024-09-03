import { all } from "redux-saga/effects";
import signUpSaga from "./auth/signUp";
import signInSaga from "./auth/signIn";
import addSong from "./song/addSongSaga";
import deleteSong from "./song/deleteSongSaga";

export default function* rootSaga() {
  yield all([addSong(), deleteSong(), signUpSaga(), signInSaga()]);
}
