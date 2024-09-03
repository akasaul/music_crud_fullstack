import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  editSongFailure,
  editSongSuccess,
} from "../../features/song/songSlice";
// import { auth, db } from '../../../firebase/firebase';
// import { doc, updateDoc } from 'firebase/firestore';
// import { serverTimestamp } from 'firebase/firestore';

// Define the shape of formData
interface FormData {
  title: string;
  album: string;
  artist: string;
  duration: string;
  genre: string;
  imageUrl: string;
}

// Define the shape of the song state
interface SongState {
  id: string;
  formData: FormData;
  // other fields if any
}

// Define the shape of the root state
interface RootState {
  song: {
    song: SongState;
    // other fields if any
  };
}

// Worker function
function* workEditSong() {
  try {
    const { song }: { song: SongState } = yield select(
      (state: RootState) => state.song,
    );

    // const docRef = doc(db, "songs", song.id);

    const { title, album, artist, duration, genre, imageUrl } = song.formData;

    if (!title || !album || !artist || !duration || !imageUrl) {
      throw new Error("Please provide the required fields");
    }

    const res = yield call(
      () => {},
      // updateDoc(docRef, {
      //   album,
      //   artist,
      //   duration,
      //   genre,
      //   imageUrl,
      //   title,
      // }),
    );

    yield put(editSongSuccess());
  } catch (err: any) {
    yield put(editSongFailure(err.message));
  }
}

// Edit Song saga
function* editSong() {
  yield takeEvery("song/editSongReq", workEditSong);
}

export default editSong;
