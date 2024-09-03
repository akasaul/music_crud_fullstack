import { call, put, select, takeEvery } from "redux-saga/effects";
import { addSongFailure, addSongSuccess } from "../../features/song/songSlice";
// import { auth, db } from "../../../firebase/firebase";
// import { addDoc, collection, doc } from "firebase/firestore";
// import { serverTimestamp } from "firebase/firestore";

interface FormData {
  title: string;
  album: string;
  artist: string;
  duration: string;
  imageUrl: string;
}

interface SongState {
  formData: FormData;
}

interface RootState {
  song: {
    song: SongState;
  };
}

// Worker function
function* workAddSong() {
  try {
    const { song }: { song: SongState } = yield select(
      (state: RootState) => state.song,
    );

    const { title, album, artist, duration, imageUrl } = song.formData;

    if (!title || !album || !duration || !artist || !imageUrl) {
      throw new Error("Please include all required fields");
    }

    const res = yield call(
      () => {},
      // addDoc(collection(db, "songs"), {
      //   ...song.formData,
      //   playlists: [],
      //   timeStamp: serverTimestamp(),
      //   postedBy: doc(db, `/users/${auth.currentUser.uid}`),
      // }),
    );

    yield put(addSongSuccess());
  } catch (err: any) {
    yield put(addSongFailure(err.message));
  }
}

// Add Song saga
function* addSong() {
  yield takeEvery("song/addSongRequest", workAddSong);
}

export default addSong;
