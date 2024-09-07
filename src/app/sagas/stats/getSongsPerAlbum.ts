import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongsPerAlbum,
  getSongsPerAlbumSuccess,
  getSongsPerAlbumError,
} from "../../features/stats/statsSlice";
import { getSongsPerAlbumStats } from "../../../services/api/stats.service";

// Worker function
function* workSongPerAlbum() {
  try {
    const { data } = yield call(() => getSongsPerAlbumStats());
    yield put(getSongsPerAlbumSuccess(data));
  } catch (err) {
    yield put(getSongsPerAlbumError());
  }
}

function* getSongsPerAlbumSaga() {
  yield takeEvery(getSongsPerAlbum.type, workSongPerAlbum);
}

export default getSongsPerAlbumSaga;
