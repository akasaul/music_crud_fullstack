import { call, put, takeEvery } from "redux-saga/effects";
import {
  getMySongsSuccess,
  getMySongsFailure,
  getMySongsReq,
} from "../../features/song/songSlice";
import { getMySongs } from "../../../services/api/song.service";

// Worker function
function* workGetAll() {
  try {
    const { data: songs } = yield call(() => getMySongs());
    yield put(getMySongsSuccess(songs));
  } catch (err: any) {
    yield put(getMySongsFailure(err.message));
  }
}

// Get All Songs saga
function* getMySongsSaga() {
  yield takeEvery(getMySongsReq.type, workGetAll);
}

export default getMySongsSaga;
