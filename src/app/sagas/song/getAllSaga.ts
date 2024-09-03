import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchRecentFailure,
  fetchRecentSuccess,
  getAllFailure,
  getAllSuccess,
} from "../../features/song/songSlice";
// import { db } from "../../../firebase/firebase";
// import {
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   QuerySnapshot,
//   DocumentData,
// } from "firebase/firestore";

// Define the structure of a Song
interface Song {
  id: string;
  title: string;
  album: string;
  artist: string;
  duration: number;
  genre: string;
  imageUrl: string;
  timeStamp: any;
  postedBy?: { id: string }; // Optional if not always present
}

// Worker function
function* workGetAll() {
  try {
    // const q = query(collection(db, "songs"), orderBy("timeStamp", "desc"));
    // const songsSnapshot: QuerySnapshot<DocumentData> = yield call(() =>
    //   getDocs(q),
    // );

    const songs: Song[] = [];

    // songsSnapshot.forEach((doc) => {
    //   const data = doc.data();
    //   songs.push({ id: doc.id, ...data, postedBy: data.postedBy?.id });
    // });

    yield put(getAllSuccess(songs));
  } catch (err: any) {
    yield put(getAllFailure(err.message));
  }
}

// Get All Songs saga
function* getAllSaga() {
  yield takeEvery("song/getAllReq", workGetAll);
}

export default getAllSaga;
