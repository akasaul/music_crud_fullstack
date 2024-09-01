import { call, takeEvery } from "redux-saga/effects";
import { incrementByAmount } from "../features/counter/counterSlice";

function* incrementSaga(action: ReturnType<typeof incrementByAmount>) {
  yield call(console.log, "Incremented by", action.payload);
}

export function* watchIncrement() {
  yield takeEvery(incrementByAmount.type, incrementSaga);
}
