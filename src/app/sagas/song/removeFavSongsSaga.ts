import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  getFavsRequest,
  getLibReq,
  getMySongsReq,
  removeFavRequest,
} from "../../features/song/songSlice";
import { removeSongFromFav } from "../../../services/api/song.service";

// Worker function
function* workRemoveFromFav() {
  try {
    const { favId } = yield select((state) => state.song);
    yield call(() => removeSongFromFav(favId));

    yield all([put(getLibReq()), put(getFavsRequest()), put(getMySongsReq())]);
  } catch (err: any) {}
}

function* removeFromFavRequestSaga() {
  yield takeEvery(removeFavRequest.type, workRemoveFromFav);
}

export default removeFromFavRequestSaga;
