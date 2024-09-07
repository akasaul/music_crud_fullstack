import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongsAlbumsPerArtist,
  getSongsAlbumsPerArtistSuccess,
  getSongsAlbumsPerArtistError,
} from "../../features/stats/statsSlice";
import { getSongsAlbumsPerArtistStats } from "../../../services/api/stats.service";

// Worker function
function* workSongAlbumPerArtist() {
  try {
    const { data } = yield call(() => getSongsAlbumsPerArtistStats());
    yield put(getSongsAlbumsPerArtistSuccess(data));
  } catch (err) {
    yield put(getSongsAlbumsPerArtistError());
  }
}

function* getSongsAlbumsPerArtistSaga() {
  yield takeEvery(getSongsAlbumsPerArtist.type, workSongAlbumPerArtist);
}

export default getSongsAlbumsPerArtistSaga;
