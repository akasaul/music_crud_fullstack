import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchRecentFailure,
  fetchRecentRequest,
  fetchRecentSuccess,
} from "../../features/song/songSlice";
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
  yield takeEvery(fetchRecentRequest.type, workFetchRecent);
}

export default fetchRecentSaga;
