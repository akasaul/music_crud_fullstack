import { takeEvery } from "redux-saga/effects";
import { signOut } from "../../features/auth/authSlice";

function* workAuth() {
  console.log("sign out saga");
  localStorage.removeItem("token");
  localStorage.removeItem("name");
}

// Authentication saga
function* signOutSaga() {
  yield takeEvery(signOut.type, workAuth);
}

export default signOutSaga;
