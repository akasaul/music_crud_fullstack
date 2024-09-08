import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongPerGenreStats,
  getSongsAlbumsPerArtistStats,
  getSongsPerAlbumStats,
  getStatisticssOverview,
} from "../../../services/api/stats.service";
import {
  getSongsAlbumsPerArtist,
  getSongsAlbumsPerArtistError,
  getSongsAlbumsPerArtistSuccess,
  getSongsPerAlbum,
  getSongsPerAlbumError,
  getSongsPerAlbumSuccess,
  getSongsPerGenre,
  getSongsPerGenreError,
  getSongsPerGenreSuccess,
  getStatsOverview,
  getStatsOverviewError,
  getStatsOverviewSuccess,
} from "../../features/stats/statsSlice";

function* handleSongAlbumPerArtist() {
  try {
    const { data } = yield call(() => getSongsAlbumsPerArtistStats());
    yield put(getSongsAlbumsPerArtistSuccess(data));
  } catch (err) {
    yield put(getSongsAlbumsPerArtistError());
  }
}

function* handleGetSongsPerAlbum() {
  try {
    const { data } = yield call(() => getSongsPerAlbumStats());
    yield put(getSongsPerAlbumSuccess(data));
  } catch (err) {
    yield put(getSongsPerAlbumError());
  }
}

function* handleGetStatisticsOverview() {
  try {
    const { data } = yield call(() => getStatisticssOverview());
    yield put(getStatsOverviewSuccess(data));
  } catch (err) {
    yield put(getStatsOverviewError());
  }
}

function* handleGetSongsPerGenreStats() {
  try {
    const { data } = yield call(() => getSongPerGenreStats());
    yield put(getSongsPerGenreSuccess(data));
  } catch (err) {
    yield put(getSongsPerGenreError());
  }
}

function* statsSaga() {
  yield takeEvery(getSongsAlbumsPerArtist.type, handleSongAlbumPerArtist);
  yield takeEvery(getSongsPerGenre.type, handleGetSongsPerGenreStats);
  yield takeEvery(getSongsPerAlbum.type, handleGetSongsPerAlbum);
  yield takeEvery(getStatsOverview.type, handleGetStatisticsOverview);
  yield takeEvery(getSongsPerGenre.type, handleGetSongsPerGenreStats);
}
export default statsSaga;
