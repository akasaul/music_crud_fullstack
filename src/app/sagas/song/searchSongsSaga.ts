import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  searchSong,
  searchSongsFailure,
  searchSongsSuccess,
} from "../../features/song/songSlice";
import { searchSongs } from "../../../services/api/song.service";

// Worker function
function* workGetAll() {
  try {
    const { query } = yield select((state) => state.song);
    const { data: songs } = yield call(() => searchSongs(query));
    yield put(searchSongsSuccess(songs));
  } catch (err: any) {
    yield put(searchSongsFailure(err.message));
  }
}

// Get All Songs saga
function* searchSongsSaga() {
  yield takeEvery(searchSong.type, workGetAll);
}

export default searchSongsSaga;
