import { put, takeEvery } from "redux-saga/effects";
import { setUser, setUserReq } from "../../features/user/userSlice";

interface User {
  id: string;
  favorites: string[];
  [key: string]: any;
}

// Worker function
function* workUser() {
  try {
    let user: User | null = null;

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
