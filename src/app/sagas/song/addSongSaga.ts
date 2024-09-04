import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  addSongFailure,
  addSongRequest,
  addSongSuccess,
} from "../../features/song/songSlice";
import { addSongService } from "../../../services/api/song.service";

// Worker function
function* workAddSong() {
  try {
    const { addSongData } = yield select((state) => state.song);

    yield call(() => addSongService(addSongData));

    yield put(addSongSuccess());
  } catch (err: any) {
    yield put(addSongFailure(err.message));
  }
}

// Add Song saga
function* addSong() {
  yield takeEvery(addSongRequest.type, workAddSong);
}

export default addSong;
