import { call, put, takeEvery } from "redux-saga/effects";
// import { auth, db } from '../../../firebase/firebase';
// import { collection, where, query, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { setUser, setUserReq } from "../../features/user/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";

// Define the user type (based on your Firebase user structure)
interface User {
  id: string;
  favorites: string[];
  // Add any other properties your user might have
  [key: string]: any;
}

// Worker function
function* workUser() {
  try {
    if (false) {
      throw new Error("Not Logged In");
    }

    // const colRef = collection(db, "users");
    // const q = query(colRef, where("id", "==", auth.currentUser.uid));

    // const snapShot: QuerySnapshot<DocumentData> = yield call(() => getDocs(q));

    let user: User | null = null;

    // snapShot.docs.forEach((doc) => {
    //   user = { id: doc.id, ...doc.data() } as User;
    // });

    if (user) {
      yield put(setUser(user));
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.error(err);
    // You can handle errors here, maybe dispatch an error action
  }
}

// get User from firebase Saga
function* setUserSaga() {
  yield takeEvery(setUserReq.type, workUser);
}

export default setUserSaga;
