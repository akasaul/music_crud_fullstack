import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  editSongFailure,
  editSongSuccess,
} from "../../features/song/songSlice";
import { editSongService } from "../../../services/api/song.service";
import { Song } from "../../types/song";

// Worker function
function* workEditSong() {
  try {
    const {
      updateSongData: { song, id },
    } = yield select((state) => state.song);

    const res: Song = yield call(() => editSongService(song, id));

    yield put(editSongSuccess(res));
  } catch (err: any) {
    yield put(editSongFailure(err.message));
  }
}

// Edit Song saga
function* editSong() {
  yield takeEvery("song/editSongReq", workEditSong);
}

export default editSong;
