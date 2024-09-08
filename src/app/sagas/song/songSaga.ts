import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  searchSong,
  searchSongsFailure,
  searchSongsSuccess,
  addSongFailure,
  addSongRequest,
  addSongSuccess,
  deleteSongFailure,
  deleteSongSuccess,
  deleteSongReq,
  editSongFailure,
  editSongSuccess,
  editSongReq,
  getFavsRequest,
  getLibReq,
  getMySongsReq,
  setFavRequest,
  fetchRecentFailure,
  fetchRecentRequest,
  fetchRecentSuccess,
  getSongsByGenreFailure,
  getSongsByGenreSuccess,
  getSongsByGenreReq,
  getFavsSuccess,
  getLibFailure,
  getLibSuccess,
  getMySongsSuccess,
  getMySongsFailure,
  removeFavRequest,
  searchRequestForAddSuccess,
  searchRequestForAdd,
} from "../../features/song/songSlice";
import {
  addSongService,
  addSongToFav,
  deleteSong,
  editSongService,
  getFavSongs,
  getLibSongs,
  getMySongs,
  getRecentSongs,
  getSongsFromGenre,
  removeSongFromFav,
  searchSongs,
} from "../../../services/api/song.service";
import { Song } from "../../types/song";
import { RootState } from "../..";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Worker function
function* handleSearchSongs() {
  try {
    const { query } = yield select((state) => state.song);
    const { data: songs } = yield call(() => searchSongs(query));
    yield put(searchSongsSuccess(songs));
  } catch (err: any) {
    yield put(searchSongsFailure(err.message));
  }
}

function* handleAddSong() {
  try {
    const { addSongData } = yield select((state) => state.song);

    yield call(() => addSongService(addSongData));

    yield put(addSongSuccess());
  } catch (err: any) {
    yield put(addSongFailure(err.message));
  }
}

function* handleDeleteSong() {
  const { songs } = yield select((state) => state.song);

  const songsBeforeDeletion = songs;
  const { songId } = yield select((state: RootState) => state.song);

  try {
    yield call(() => deleteSong(songId));
    yield put(deleteSongSuccess());
    yield put(getLibReq());
  } catch (err) {
    yield put(deleteSongFailure(songsBeforeDeletion));
  }
}

function* handleEditSong() {
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

function* handleAddToFavorites() {
  try {
    const { favId } = yield select((state) => state.song);
    yield call(() => addSongToFav(favId));
    yield all([put(getLibReq()), put(getFavsRequest()), put(getMySongsReq())]);
  } catch (err: any) {}
}

function* handleFetchRecentSongs() {
  try {
    const { data: songs } = yield call(() => getRecentSongs());

    yield put(fetchRecentSuccess(songs));
  } catch (err: any) {
    yield put(fetchRecentFailure(err.message));
  }
}

function* handleGetSongsByGenre() {
  try {
    const { data: songs } = yield call(() => getSongsFromGenre("HipHop"));
    yield put(getSongsByGenreSuccess(songs));
  } catch (err: any) {
    yield put(getSongsByGenreFailure(err.message));
  }
}

function* handleGetFavoriteSongs() {
  try {
    const { data: songs } = yield call(() => getFavSongs());
    yield put(getFavsSuccess(songs));
  } catch (err: any) {
    // yield put(getAllFailure(err.message));
  }
}

function* handleGetLibSongs() {
  try {
    const { data: songs } = yield call(() => getLibSongs());
    yield put(getLibSuccess(songs));
  } catch (err: any) {
    yield put(getLibFailure(err.message));
  }
}

function* handleGetMySongs() {
  try {
    const { data: songs } = yield call(() => getMySongs());
    yield put(getMySongsSuccess(songs));
  } catch (err: any) {
    yield put(getMySongsFailure(err.message));
  }
}

function* handleRemoveFromFavorites() {
  try {
    const { favId } = yield select((state) => state.song);
    yield call(() => removeSongFromFav(favId));

    yield all([put(getLibReq()), put(getFavsRequest()), put(getMySongsReq())]);
  } catch (err: any) {}
}

function* handleSearchForAddSong() {
  try {
    const { query } = yield select((state: RootState) => state.song);

    const {
      VITE_X_RAPID_API_HOST,
      VITE_X_RAPID_API_URL,
      VITE_X_RAPID_API_KEY,
    } = import.meta.env;

    const options: AxiosRequestConfig = {
      method: "GET",
      url: VITE_X_RAPID_API_URL,
      params: { q: query },
      headers: {
        "X-RapidAPI-Key": VITE_X_RAPID_API_KEY,
        "X-RapidAPI-Host": VITE_X_RAPID_API_HOST,
      },
    };

    const res: AxiosResponse<any> = yield call(() => axios.request(options));

    let formattedResponse: Array<any> = []; // Adjust the type based on your expected data

    if (res.status === 200) {
      formattedResponse = res.data.data.filter(
        (item: any) => item.type === "track",
      );
      formattedResponse = formattedResponse.slice(0, 10);
      yield put(searchRequestForAddSuccess(formattedResponse));
    } else {
      throw new Error("Failed to fetch");
    }
  } catch (err: any) {
    // yield put(searchRequestFailure(err.message));
  }
}

function* songSaga() {
  yield takeEvery(searchSong.type, handleSearchSongs);
  yield takeEvery(addSongRequest.type, handleAddSong);
  yield takeEvery(deleteSongReq.type, handleDeleteSong);
  yield takeEvery(editSongReq.type, handleEditSong);
  yield takeEvery(setFavRequest.type, handleAddToFavorites);
  yield takeEvery(fetchRecentRequest.type, handleFetchRecentSongs);
  yield takeEvery(getSongsByGenreReq.type, handleGetSongsByGenre);
  yield takeEvery(getFavsRequest.type, handleGetFavoriteSongs);
  yield takeEvery(getLibReq.type, handleGetLibSongs);
  yield takeEvery(getMySongsReq.type, handleGetMySongs);
  yield takeEvery(removeFavRequest.type, handleRemoveFromFavorites);
  yield takeEvery(searchRequestForAdd.type, handleSearchForAddSong);
}

export default songSaga;
