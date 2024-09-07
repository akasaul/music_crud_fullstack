import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongsPerGenre,
  getSongsPerGenreSuccess,
  getSongsPerGenreError,
} from "../../features/stats/statsSlice";
import { getSongPerGenreStats } from "../../../services/api/stats.service";

// Worker function
function* workUser() {
  try {
    const { data } = yield call(() => getSongPerGenreStats());
    yield put(getSongsPerGenreSuccess(data));
  } catch (err) {
    yield put(getSongsPerGenreError());
  }
}

function* getSongPerGenreSaga() {
  yield takeEvery(getSongsPerGenre.type, workUser);
}

export default getSongPerGenreSaga;
