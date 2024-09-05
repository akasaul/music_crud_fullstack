import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  getLibReq,
  getMySongsReq,
  removeFavRequest,
} from "../../features/song/songSlice";
import { removeSongFromFav } from "../../../services/api/song.service";

// Worker function
function* workAddToFav() {
  try {
    const { favId } = yield select((state) => state.song);
    yield call(() => removeSongFromFav(favId));

    yield all([put(getLibReq()), put(getMySongsReq())]);
  } catch (err: any) {}
}

function* removeFromFavRequestSaga() {
  yield takeEvery(removeFavRequest.type, workAddToFav);
}

export default removeFromFavRequestSaga;
