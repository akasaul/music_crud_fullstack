import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchRecentFailure,
  fetchRecentSuccess,
} from "../../features/song/songSlice";
import { Song } from "../../types/song";
import { getRecentSongs } from "../../../services/api/song.service";

// Worker function
function* workFetchRecent() {
  try {
    const { data: songs } = yield call(() => getRecentSongs());

    yield put(fetchRecentSuccess(songs));
  } catch (err: any) {
    yield put(fetchRecentFailure(err.message));
  }
}

// Fetch Recent Songs saga
function* fetchRecentSaga() {
  yield takeEvery("song/fetchRecentRequest", workFetchRecent);
}

export default fetchRecentSaga;

