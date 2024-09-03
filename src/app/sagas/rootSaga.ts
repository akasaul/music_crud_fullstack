import { all } from "redux-saga/effects";
import signUpSaga from "./auth/signUp";
import signInSaga from "./auth/signIn";
import addSong from "./song/addSongSaga";
import deleteSong from "./song/deleteSongSaga";
import setUserSaga from "./user/setUser";
import editSong from "./song/editSongSaga";
import favSong from "./song/favSongSaga";
import fetchRecentSaga from "./song/fetchRecentSaga";
import getAllSaga from "./song/getAllSaga";
import searchSaga from "./song/searchSaga";

export default function* rootSaga() {
  yield all([
    setUserSaga(),
    addSong(),
    deleteSong(),
    signUpSaga(),
    signInSaga(),
    editSong(),
    favSong(),
    fetchRecentSaga(),
    getAllSaga(),
    searchSaga(),
  ]);
}
