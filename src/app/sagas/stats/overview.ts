import { call, put, takeEvery } from "redux-saga/effects";
import {
  getStatsOverview,
  getStatsOverviewError,
  getStatsOverviewSuccess,
} from "../../features/stats/statsSlice";
import { getStatisticssOverview } from "../../../services/api/stats.service";

// Worker function
function* workUser() {
  try {
    const { data } = yield call(() => getStatisticssOverview());
    yield put(getStatsOverviewSuccess(data));
  } catch (err) {
    yield put(getStatsOverviewError());
  }
}

function* getStatsOverviewSaga() {
  yield takeEvery(getStatsOverview.type, workUser);
}

export default getStatsOverviewSaga;
