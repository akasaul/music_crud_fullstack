import { call, put, takeEvery } from "redux-saga/effects";
import { getFavsRequest, getFavsSuccess } from "../../features/song/songSlice";
import { getFavSongs } from "../../../services/api/song.service";

// Worker function
function* workGetAll() {
  try {
    const { data: songs } = yield call(() => getFavSongs());
    yield put(getFavsSuccess(songs));
  } catch (err: any) {
    // yield put(getAllFailure(err.message));
  }
}

// Get All Songs saga
function* getFavsSaga() {
  yield takeEvery(getFavsRequest.type, workGetAll);
}

export default getFavsSaga;
