import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  getLibReq,
  getMySongsReq,
  setFavRequest,
} from "../../features/song/songSlice";
import { addSongToFav } from "../../../services/api/song.service";

// Worker function
function* workAddToFav() {
  try {
    const { favId } = yield select((state) => state.song);
    yield call(() => addSongToFav(favId));
    yield all([put(getLibReq()), put(getMySongsReq())]);
  } catch (err: any) {}
}

function* addToFavSaga() {
  yield takeEvery(setFavRequest.type, workAddToFav);
}

export default addToFavSaga;
