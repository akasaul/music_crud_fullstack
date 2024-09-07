import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  deleteSongFailure,
  deleteSongReq,
  deleteSongSuccess,
  getLibReq,
} from "../../features/song/songSlice";
import { RootState } from "../..";
import { deleteSong } from "../../../services/api/song.service";

// Worker function
function* workDeleteSong() {
  const { songs } = yield select((state) => state.song);

  // For Recovery in optimistic ui update
  const songsBeforeDeletion = songs;
  const { songId } = yield select((state: RootState) => state.song);

  try {
    yield call(() => deleteSong(songId));
    yield put(deleteSongSuccess());
    yield put(getLibReq());
  } catch (err) {
    yield put(deleteSongFailure(songsBeforeDeletion));
  }
}

// Delete Song saga
function* deleteSongSaga() {
  yield takeEvery(deleteSongReq.type, workDeleteSong);
}

export default deleteSongSaga;
