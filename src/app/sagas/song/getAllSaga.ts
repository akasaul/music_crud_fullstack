import { call, put, takeEvery } from "redux-saga/effects";
import { getAllFailure, getAllSuccess } from "../../features/song/songSlice";
import {
  getRecentSongs,
  getSongsFromGenre,
} from "../../../services/api/song.service";

// Worker function
function* workGetAll() {
  try {
    const { data: songs } = yield call(() => getRecentSongs());
    yield put(getAllSuccess(songs));
  } catch (err: any) {
    yield put(getAllFailure(err.message));
  }
}

// Get All Songs saga
function* getAllSaga() {
  yield takeEvery("song/getAllReq", workGetAll);
}

export default getAllSaga;
