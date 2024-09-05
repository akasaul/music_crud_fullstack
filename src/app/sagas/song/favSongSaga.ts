import { call, put, select, takeEvery } from "redux-saga/effects";
// import { auth, db } from '../../../firebase/firebase';
// import { doc, updateDoc, arrayUnion, arrayRemove, collection, where, query, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import {
  setFavs,
  setFavsError,
  setFavsReq,
} from "../../features/user/userSlice";
import { addSongToFav } from "../../../services/api/song.service";
// import { PayloadAction } from "@reduxjs/toolkit";

// Define the state structure
interface UserState {
  favId: string | null;
  // Add other properties as needed
}

// Worker function
function* workFavSong() {
  const { favId }: UserState = yield select(
    (state: { user: UserState }) => state.user,
  );

  if (!favId) {
    return;
  }

  // Optimistic UI Update
  yield put(setFavs(favId));

  try {
    let id: string | undefined;
    let found = false;

    if (!id) {
      throw new Error("User document ID not found");
    }

    if (found) {
      yield call(() => {
        addSongToFav(id);
      });
    } else {
      yield call(
        () => {},
        // updateDoc(docRef, {
        //   favorites: arrayUnion(favId),
        // }),
      );
    }
  } catch (err) {
    console.error(err);
    yield put(setFavsError(favId));
  }
}

// Fav Song saga
function* favSong() {
  yield takeEvery(setFavsReq.type, workFavSong);
}

export default favSong;
