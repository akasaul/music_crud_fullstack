import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllFailure,
  getAllSuccess,
  getSongsByGenreFailure,
  getSongsByGenreSuccess,
} from "../../features/song/songSlice";
import { getSongsFromGenre } from "../../../services/api/song.service";

// Worker function
function* workGetAll() {
  try {
    const { data: songs } = yield call(() => getSongsFromGenre("HipHop"));
    yield put(getSongsByGenreSuccess(songs));
  } catch (err: any) {
    yield put(getSongsByGenreFailure(err.message));
  }
}

// Get All Songs saga
function* getByGenreSaga() {
  yield takeEvery("song/getSongsByGenreReq", workGetAll);
}

export default getByGenreSaga;
