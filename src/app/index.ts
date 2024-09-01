import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watchIncrement } from "./sagas/counter";
import counterReducer from "./features/counter/counterSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchIncrement);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
