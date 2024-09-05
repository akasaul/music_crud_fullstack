import { call, put, takeEvery } from "redux-saga/effects";
import {
  getLibFailure,
  getLibReq,
  getLibSuccess,
} from "../../features/song/songSlice";
import { getLibSongs } from "../../../services/api/song.service";

// Worker function
function* workGetAll() {
  try {
    const { data: songs } = yield call(() => getLibSongs());
    yield put(getLibSuccess(songs));
  } catch (err: any) {
    yield put(getLibFailure(err.message));
  }
}

// Get All Songs saga
function* getLibSongsSaga() {
  yield takeEvery(getLibReq.type, workGetAll);
}

export default getLibSongsSaga;
