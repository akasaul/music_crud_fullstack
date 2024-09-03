import { call, put, select, takeEvery } from "redux-saga/effects";
// import { auth, db } from '../../../firebase/firebase';
// import { doc, updateDoc, arrayUnion, arrayRemove, collection, where, query, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import {
  setFavs,
  setFavsError,
  setFavsReq,
} from "../../features/user/userSlice";
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
    // const colRef = collection(db, "users");
    // const q = query(colRef, where("id", "==", auth.currentUser?.uid));

    // const snapShot: QuerySnapshot<DocumentData> = yield call(() => getDocs(q));

    let id: string | undefined;
    let found = false;

    // snapShot.docs.forEach((doc) => {
    //   id = doc.id;
    //   if (doc.data().favorites.includes(favId)) {
    //     found = true;
    //   }
    // });

    if (!id) {
      throw new Error("User document ID not found");
    }

    // const docRef = doc(db, "users", id);

    // Check if the favorite exists in the favs array
    if (found) {
      yield call(
        () => {},
        // updateDoc(docRef, {
        //   favorites: arrayRemove(favId),
        // }),
      );
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

